/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    teamPage.js 
*/

/* ---------------------------------------------------------------------
                            Global Variables  
--------------------------------------------------------------------- */

const PAGE_TYPE_ADDED_DROPPED = "Added Dropped";
const PAGE_TYPE_PLAYERS = "Players";
const PAGE_TYPE_TEAM = "Team";
const PAGE_TYPE_TEAM_NEWS = "News";
const PAGE_TYPE_TEAM_RESEARCH = "Research";
const PAGE_TYPE_TEAM_SCHEDULE = "Schedule";
const PAGE_TYPE_TEAM_STATS = "Stats";
const PAGE_TYPE_TEAM_SWITCH_DATES = "Switch Dates";
const PAGE_TYPE_TEAM_WEEKLY = "Weekly";
const PAGE_TYPE_UNDEFINED = "Undefined";

var currentPageType = "";
var dailyOrWeekly = "";             // Value of daily or weekly league
var localGamesDataDict = {};        // Holds the game remaining data
var updateHeaders = false;          // Flag to update headers

/* ---------------------------------------------------------------------
                            Helper Functions 
--------------------------------------------------------------------- */

/*
    buildTeamsRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildTeamsRequestString()
{
    console.log( "buildTeamsRequestString()" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    console.log( "currentPageType=" + currentPageType );
    for( var i = 0; i < listOfElements.length; i++ )
    {
        if( currentPageType == "Players" )
        {
            if( !( listOfElements[ i ].innerHTML in localGamesDataDict ) && ( listOfElements[ i ].innerHTML != "FA" ) )
            {
                teamsRequestString += listOfElements[i].innerHTML + ",";
            }
        }
        else if( currentPageType == "Team" )
        {
            if( listOfElements[ i ].innerHTML != "FA" )
            {
                teamsRequestString += listOfElements[i].innerHTML + ",";
            }
        }
    }
    console.log( teamsRequestString );
    return teamsRequestString;
}

/*
    formatDateString - formats a date string in YYYY-MM-DD
*/
function formatDateString( month, date )
{
    var dateString = "";

    if( month == "Oct" )
    {
        dateString = ( "2018-10-" + date );
    }
    else if( month == "Nov" )
    {
        dateString = ( "2018-11-" + date );
    }
    else if( month == "Dec" )
    {
        dateString = ( "2018-12-" + date );
    }
    else if( month == "Jan" )
    {
        dateString = ( "2019-01-" + date );
    }
    else if( month == "Feb" )
    {
        dateString = ( "2019-02-" + date );
    }
    else if( month == "Mar" )
    {
        dateString = ( "2019-03-" + date );
    }
    else if( month == "Apr" )
    {
        dateString = ( "2019-04-" + date );
    }

    return dateString;
}

/*
    buildDateRequestStringPlayers - 
*/
function buildDateRequestStringPlayers()
{
    var resultDateRequestString = "date="
    var todaysDate = new Date();
    // Getting today's date before regular season starts
    if( ( todaysDate.getTime() <= new Date("2018-10-16").getTime() ) ) 
    {
        
        resultDateRequestString += "2018-10-16";
        return resultDateRequestString;
    }
    else
    {
        resultDateRequestString += ( todaysDate.getFullYear() + "-" + ( todaysDate.getMonth() + 1 ) + "-" + todaysDate.getDate() );
        return resultDateRequestString;
    }
}

/*
    buildDateRequestString - creates a date request string for the
    the parameter for the server request for either daily or weekly leagues
*/
function buildDateRequestString()
{
    // console.log( "buildDateRequestString()" );
    var currentElements = document.getElementsByClassName( "is-current" );
    var resultDateRequestString = "date="
    if( dailyOrWeekly == "Daily" )
    {
        var currentDateDiv = currentElements[0];
        var currentDateChildren = currentDateDiv.children[0];
        var currentMonthDate = currentDateChildren.innerHTML;
        var currentMonthDateSplit = currentMonthDate.split( " " );
        var selectedMonth = currentMonthDateSplit[0];
        var selectedDate = currentMonthDateSplit[1];

        // return formatDateString( selectedMonth, selectedDate );
        resultDateRequestString += formatDateString( selectedMonth, selectedDate );
        return resultDateRequestString;
    }
    else if( dailyOrWeekly == "Weekly" )
    {
        var currentDateDiv = currentElements[0];
        var currentDateChildren = currentDateDiv.children[1];
        var currentMonthDate = currentDateChildren.innerHTML;
        var currentMonthDateSplit = currentMonthDate.split( " " );
        var selectedMonth = currentMonthDateSplit[0];
        var selectedDateLowerRange = currentMonthDateSplit[1];
        var selectedDateEndRange = currentMonthDateSplit[3];
        var formattedDateLowerRange = formatDateString( selectedMonth, selectedDateLowerRange );
        var formattedDateEndRange = formatDateString( selectedMonth, selectedDateEndRange );
        var todaysDate = new Date();
        // Compare today's date with the lower range, if its less than then use the
        // lower range date to get the full amount of games
        if( ( todaysDate.getTime() <= new Date( formattedDateLowerRange ).getTime() ) ) 
        {
            resultDateRequestString += formattedDateLowerRange;
            return resultDateRequestString;
        }
        // Today's date in between the week ranges then use today's date to get the accurate date
        else if( ( todaysDate.getTime() > new Date( formattedDateLowerRange ).getTime() ) && 
                 ( todaysDate.getTime() < new Date( formattedDateEndRange ).getTime() ) )
        {
            resultDateRequestString += formatDateString( todaysDate.getMonth()+1, todaysDate.getDate() )
            return resultDateRequestString;
        }
        else if( ( todaysDate.getTime() > new Date( formattedDateEndRange ).getTime() ) )
        {
            resultDateRequestString += formattedDateEndRange;
            return resultDateRequestString;
        }
    }
}

/*
    buildLeagueIdRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildLeagueIdRequestString()
{
    // console.log( "buildLeagueIdRequestString()" );
    var entireUrl = window.location.href;
    // console.log( url );
    var url = new URL( entireUrl );
    var leagueId = url.searchParams.get( "leagueId" );
    var leagueIdRequestString = "leagueID="+leagueId;

    return leagueIdRequestString;
}

/*
    sleep - to create a delay in some functions to help the dynamic ESPN
    page load and change different settings
*/
function sleep( ms )
{
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

/* 
    getActiveMenu - returns the active menu
*/
function getActiveMenu()
{
    // console.log( "getActiveMenu" );
    var activeMenuElements = document.getElementsByClassName( "tabs__list__item--active" );
    var activeMenuElement = activeMenuElements[0].getElementsByClassName( "tabs__link w-100" );
    var activeMenu = activeMenuElement[0].innerHTML;
    return activeMenu;
}

/* 
    getBackgroundColor - returns the background color
    associated with the number of games.

    games - The number of games
*/
function getBackgroundColor( games )
{
    if( games >= 4 )
    {
        return "#a5d394";
    }
    else if( games == 3 )
    {
        return "#d8ffcc";
    }
    else if( games == 2 )
    {
        return "#ffffcc";
    }
    else if( games == 1 )
    {
        return "#ffd6cc";
    }
    else if( games == 0 )
    {
        return "#ff7770";
    }
}

/*
    getCurrentUrl - returns the current browser url
*/
function getCurrentUrl()
{
    console.log( window.location.href );
    return window.location.href;
}

function getPageTypeFromUrl( url )
{
    if( url.indexOf( "basketball/team" ) != -1 )
    {
        currentPageType = "Team";
        return PAGE_TYPE_TEAM;
    }
    else if( url.indexOf( "basketball/players/add" ) != -1 )
    {
        currentPageType = "Players";
        return PAGE_TYPE_PLAYERS;
    }
    else if( url.indexOf( "basketball/addeddropped" ) != -1 )
    {
        currentPageType = "Added Dropped";
        return PAGE_TYPE_ADDED_DROPPED;
    }
    else
    {
        return PAGE_TYPE_UNDEFINED;
    }
}

/*
    isLeagueDailyOrWeekly - returns whether the league is daily or weekly
*/
function isLeagueDailyOrWeekly()
{
    console.log( "isLeagueDailyOrWeekly()" );
    var dateElements = document.getElementsByClassName( "is-current" );

    if( dateElements.length > 0 )
    {
        if( dateElements[0].innerHTML.indexOf( "day" ) != -1 )
        {
            dailyOrWeekly = "Daily";
        }
        else if( dateElements[0].innerHTML.indexOf( "week" ) != -1 )
        {
            dailyOrWeekly = "Weekly";
        }
    }
}


/* ---------------------------------------------------------------------
                            Adding header to HTML  
--------------------------------------------------------------------- */

/*
    addGamesWeekHeaders - adds the 'GAMES' and 'WEEK' headers to the HTML of the page.
*/
function addWeekGamesHeaders( data )
{
    console.log( "addWeekGamesHeaders()" );

    var activeMenu = getActiveMenu();
    var listOfElements = document.getElementsByClassName( "Table2__header-row" );
    var weekNum = data.weekNum; 

    if( activeMenu == "News" )
    {
        
        for( var i = 0; i < listOfElements.length; i++ )
        {
            if( i % 2 == 0 )
            {
                var newCell = listOfElements[i].insertCell( 2 );
                newCell.outerHTML = "<th title=\"Week number " + weekNum.toString() + " of fantasy basketball " + "\" class=\"tc bg-clr-white Table2__th fbw-header fbw-new-element\">WEEK " + weekNum.toString() + "</th>";
            }
            else
            {
                var newCell = listOfElements[i].insertCell( 5 );
                newCell.outerHTML = "<th title=\"Games Remaining / Games This Week\" class=\"tc bg-clr-white Table2__th fbw-header fbw-new-element\">GR/G</th>";;
            }
        }

    }
    else
    {
        for( var i = 0; i < listOfElements.length; i++ )
        {
            // console.log(listOfElements[i]);
            if( listOfElements[i].innerHTML.indexOf( "STARTERS" ) != -1 )
            {
                var newGamesHeader = document.createElement( "th" );
                newGamesHeader.title = "Week number " + weekNum.toString() + " of fantasy basketball";
                newGamesHeader.colSpan = "1";
                newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header fbw-new-element";
                newGamesHeader.innerHTML = "WEEK" + weekNum.toString();
                listOfElements[i].appendChild( newGamesHeader );
                // listOfElements[i].insertAdjacentElement( 'beforeend', newGamesHeader );
            }
            else if( listOfElements[i].innerHTML.indexOf( "STATUS" ) != -1 )
            {
                var newGamesHeader = document.createElement( "th" );
                newGamesHeader.title = "Games Remaining / Games This Week";
                newGamesHeader.colSpan = "1";
                newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header fbw-new-element";
                newGamesHeader.innerHTML = "GR/G";
                listOfElements[i].appendChild( newGamesHeader );
                // listOfElements[i].insertAdjacentElement( 'beforeend', newGamesHeader );
            }
        }
    }
}

/*
    addGamesWeekHeaders - adds the 'WEEK #' and 'GR/G' headers
    to the HTML of the page.
*/
function addWeekGamesHeadersPlayers( data )
{
    console.log( "addWeekGamesHeaders()" );
    var weekNum = data.weekNum;
    var listOfElements = document.getElementsByClassName( "Table2__header-row" );

    for( var i = 0; i < listOfElements.length; i++ )
    {
        if( listOfElements[i].innerHTML.indexOf( "All Players" ) != -1 )
        {
            var newGamesHeader = document.createElement( "th" );
            newGamesHeader.title = "Week number " + weekNum.toString() + " of fantasy basketball";
            newGamesHeader.colSpan = "1";
            newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header";
            newGamesHeader.innerHTML = "WEEK" + weekNum.toString();
            listOfElements[i].appendChild( newGamesHeader );
        }
        else if( listOfElements[i].innerHTML.indexOf( "STATUS" ) != -1 )
        {
            var newGamesHeader = document.createElement( "th" );
            newGamesHeader.title = "Games Remaining / Games This Week";
            newGamesHeader.colSpan = "1";
            newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header";
            newGamesHeader.innerHTML = "GR/G";
            listOfElements[i].appendChild( newGamesHeader );
        }
    }
}


/*
    updateWeekNumberHeader - updates the 'GAMES' and 'WEEK' headers
*/
function updateWeekNumberHeader( data )
{
    var weekNum = data.weekNum;
    var listOfHeaders = document.getElementsByClassName( "fbw-header" );
    for( var i = 0; i < listOfHeaders.length; i++ )
    {
        if( i % 2 == 0 )
        {
            listOfHeaders[i].title = "Week number " + weekNum.toString() + " of fantasy basketball";
            listOfHeaders[i].innerHTML = "WEEK" + weekNum.toString();
        }
    }
}

/*
    requestHeaderFromServer - 
*/
async function requestHeaderFromServer( addOrUpdate )
{
    console.log( "requestHeaderFromServer()" );
    // Sleep before getting the date string to allow the selected date some time to be changed
    await sleep( 200 );
    var dateRequestString = "";
    if( currentPageType == "Team" )
    {
        dateRequestString = buildDateRequestString();
    }
    else if( currentPageType == "Players" )
    {
        dateRequestString = buildDateRequestStringPlayers();
    }

    console.log( "dateRequestString - " + dateRequestString );
    console.log( typeof dateRequestString );
    var leagueIdRequestString = buildLeagueIdRequestString();

    if( ( dateRequestString != "date=" ) && ( typeof dateRequestString !== 'undefined' ) )
    {
        var url = "http://www.fantasywizard.site/getweek/?pageName=eTeamsPage&format=json&" + dateRequestString + "&" + leagueIdRequestString;
        fetch( url )
            .then( function( response ){
            if ( response.status !== 200 )
            {
                console.log( 'Called to backend failed: ' + response.status );
                return;
            }
            response.json().then( function( data )
            {
                console.log( "addOrUpdate: " + addOrUpdate + ", currentPageType: " + currentPageType );
                var weekNum = data.weekNum;
                if( addOrUpdate == "Add" )
                {
                    if( currentPageType == "Team" )
                    {
                        addWeekGamesHeaders( data );
                    }
                    else if( currentPageType == "Players" )
                    {
                        addWeekGamesHeadersPlayers( data );
                    }

                }
                else if( addOrUpdate == "Update" )
                {
                    updateWeekNumberHeader( data );
                }

            });
        }).catch( function( err ) {
            console.log( 'Fetch Error :-S', err );
        });
    }
}


/* ---------------------------------------------------------------------
                        Adding games data to HTML  
--------------------------------------------------------------------- */

/*
    addGamesDataToLocalDictionary - 
*/
function addGamesDataToLocalDictionary( data, teamsRequestString )
{
    // console.log( "addDataToLocalDictionary()" );
    if( teamsRequestString != "teams=" )
    {
        if( currentPageType == "Team" )
        {
            localGamesDataDict = {};
        }
        var teamsRequestStringConcise = teamsRequestString.substring( 6, teamsRequestString.length-1 );
        var teamsList = teamsRequestStringConcise.split( "," );
        for( var i = 0; i < data.length; i++ )
        {
            if( !( teamsList[i] in localGamesDataDict ) )
            {
                localGamesDataDict[teamsList[i]] = data[i];
            }
        }
        console.log( localGamesDataDict );
    }
}

/*
    requestGameDataFromServer
*/
async function requestGameDataFromServer( addOrUpdate )
{
    console.log( "requestGameDataFromServer()" );
    await sleep( 2000 );    

    var teamsRequestString = buildTeamsRequestString();
    if( currentPageType == "Players" && teamsRequestString == "teams=" )
    {
        addGamesForPlayersPage();
    }
    else
    {
        var dateRequestString = "";
        if( currentPageType == "Team" )
        {
            dateRequestString = buildDateRequestString();
        }
        else if( currentPageType == "Players" )
        {
            dateRequestString = buildDateRequestStringPlayers();
        }
        var leagueIdRequestString = buildLeagueIdRequestString();
        console.log( dateRequestString );
        console.log( leagueIdRequestString );
        console.log( teamsRequestString );
        if( ( dateRequestString != "date=" ) && (teamsRequestString != "teams=" ) && ( typeof dateRequestString !== 'undefined' ) )
        {
            var url = "https://www.fantasywizard.site/gamesremaining/?pageName=eTeamsPage&" + teamsRequestString + "&format=json&" + dateRequestString + "&" + leagueIdRequestString;
            console.log( url );

            fetch( url )
                .then( function( response ){
                if ( response.status !== 200 )
                {
                    console.log( 'Called to backend failed: ' + response.status );
                    return;
                }
                response.json().then( function( data )
                {
                    if( addOrUpdate == "Add" )
                    {
                        addGamesDataToLocalDictionary( data, teamsRequestString );
                        console.log( "currentPageType=" + currentPageType );
                        if( currentPageType == "Team" )
                        {
                            addGamesForPlayers(); 
                        }
                        else if( currentPageType == "Players" )
                        {
                            addGamesForPlayersPage();
                        }
                    }
                    else if( addOrUpdate == "Update" )
                    {
                        updateGameData();
                    }

                });
            }).catch( function( err ) {
                console.log( 'Fetch Error :-S', err );
            }); 
        }

    }

}

/*
    addGamesForPlayers - add the games remaining data to the HTML
    of the page
*/
function addGamesForPlayers()
{
    console.log( "addGamesForPlayers()" );

    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    var listOfTeamNameElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var listOfTeamNameElementsIndex = 0;
    var totalGamesRemaining = 0;
    var totalGamesForWeek = 0;

    for( var i = 0; i < listOfElements.length; i++ )
    {
        var listOfElementsTr = listOfElements[i];
        // console.log( "listOfElementsTr.children.length=" + listOfElementsTr.children.length );

        // Initial render for Stats menu
        if( listOfElementsTr.children.length == 5 )
        {
            var newGamesTd = document.createElement( "td" );
            var newGamesDiv = document.createElement( "div" );
            newGamesTd.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
            newGamesDiv.style.textAlign = "center";

            var isInjured = false;
            // 'O'ut, injured player
            if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
            {
                isInjured = true;
            }
            // TOTALS row
            if( listOfElementsTr.innerHTML.indexOf( ">TOTALS</div>" ) != -1 )
            {
                var totalGamesString = totalGamesRemaining.toString() + "/" + totalGamesForWeek.toString();
                newGamesDiv.innerHTML = totalGamesString;
                newGamesTd.className += " bg-clr-gray-08";
                newGamesDiv.className += " bg-clr-gray-08";
            }
            // Normal player
            else if( listOfElementsTr.innerHTML.indexOf( "player-column__empty" ) == -1 )
            {
                if( !isInjured )
                {
                    var teamName = listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newGamesTd.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                }
                listOfTeamNameElementsIndex++;
            }
            // Empty player
            else
            {
                newGamesDiv.innerHTML = "-/-";    
            }
            newGamesTd.appendChild( newGamesDiv );
            listOfElementsTr.appendChild( newGamesTd );
        }
        // Research & Schedule Menu
        else if( listOfElementsTr.children.length == 13 || listOfElementsTr.children.length == 12 )
        {
            var newGamesTd = document.createElement( "td" );
            var newGamesDiv = document.createElement( "div" );
            newGamesTd.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
            newGamesDiv.style.textAlign = "center";

            var isInjured = false;
            // 'O'ut, injured player
            if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
            {
                isInjured = true;
            }
            // Normal player
            if( listOfElementsTr.innerHTML.indexOf( "player-column__empty" ) == -1 )
            {
                if( !isInjured )
                {
                    var teamName = listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newGamesTd.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                }
                listOfTeamNameElementsIndex++;
            }
            // Empty player
            else
            {
                newGamesDiv.innerHTML = "-/-";    
            }
            newGamesTd.appendChild( newGamesDiv );
            listOfElementsTr.appendChild( newGamesTd );
        }
        // News Menu
        else if( listOfElementsTr.children.length == 6 )
        {
            var newCell = listOfElementsTr.insertCell( 5 );
            // var newGamesTd = document.createElement( "td" );
            var newGamesDiv = document.createElement( "div" );
            newCell.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
            newGamesDiv.style.textAlign = "center";
            // newGamesTd.appendChild( newGamesDiv );
            var isInjured = false;
            // 'O'ut, injured player
            if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
            {
                isInjured = true;
            }
            // Normal player
            if( listOfElementsTr.innerHTML.indexOf( "player-column__empty" ) == -1 )
            {
                if( !isInjured )
                {
                    var teamName = listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newCell.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                }
                listOfTeamNameElementsIndex++;
            }
            // Empty player
            else
            {
                newGamesDiv.innerHTML = "-/-";    
            }

            newCell.appendChild( newGamesDiv );
        }
    }
}

/*
    addGamesForPlayers - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesForPlayersPage()
{
    console.log( "addGamesForPlayersPage()" );

    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    var totalGamesRemaining = 0;
    var totalGamesForWeek = 0;

    var listOfTeamNameElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var listOfTeamNameElementsIndex = 0;

    for( var i = 0; i < listOfElements.length; i++ )
    {
        var listOfElementsTr = listOfElements[i];
        // console.log( "listOfElementsTr.children.length=" + listOfElementsTr.children.length );

        if( listOfElementsTr.children.length == 5 )
        {
            var newGamesTd = document.createElement( "td" );
            var newGamesDiv = document.createElement( "div" );
            newGamesTd.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div";
            newGamesDiv.style.textAlign = "center";

            var isInjured = false;
            // 'O'ut, injured player
            if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
            {
                isInjured = true;
            }
            // Normal player
            if( listOfElementsTr.innerHTML.indexOf( "player-column__empty" ) == -1 )
            {
                if( !isInjured )
                {
                    var teamName = listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
                    console.log( "teamName=" + teamName );
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    console.log( localGamesDataDict[teamName] );
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newGamesTd.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                }
            }
            // Don't have empty players in Free Agents, only for Team page    
            listOfTeamNameElementsIndex++;
            newGamesTd.appendChild( newGamesDiv );
            listOfElementsTr.appendChild( newGamesTd );
        }
    }
}

/*
    updateGameData - update the game data when the dates have been switched
*/
function updateGameData()
{
    console.log( "updateGameData" );
    var backendIndex = 0;   
    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    var listOfGamesDiv = document.getElementsByClassName( "fbw-games-remaining-div" );
    var listOfGamesTd = document.getElementsByClassName( "fbw-games-remaining-td" );
    var listOfTeamNameElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var listOfTeamNameElementsIndex = 0;
    var listOfGamesIndex = 0;
    var totalGamesForWeek = 0;
    var totalGamesRemaining = 0;

    for( var i = 0; i < listOfElements.length; i++ )
    {
        var listOfElementsTr = listOfElements[i];

        console.log( "listOfElementsTr.children.length= " + listOfElementsTr.children.length );
        if( listOfElementsTr.children.length == 6 || listOfElementsTr.children.length == 7 || listOfElementsTr.children.length == 13 || listOfElementsTr.children.length == 14 )
        {
            var isInjured = false;
            // 'O'ut, injured player
            if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
            {
                isInjured = true;
            }
            // TOTALS row
            if( listOfElementsTr.innerHTML.indexOf( ">TOTALS</div>" ) != -1 )
            {
                var totalGamesString = totalGamesRemaining.toString() + "/" + totalGamesForWeek.toString();
                listOfGamesDiv[listOfGamesIndex].innerHTML = totalGamesString;
            }
            // // Normal player
            else if( listOfElementsTr.innerHTML.indexOf( "player-column__empty" ) == -1 )
            {
                // Healthy player 
                if( !isInjured )
                {
                    var teamName = listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
                    listOfGamesDiv[listOfGamesIndex].innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    listOfGamesTd[listOfGamesIndex].style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                // Injured player
                else
                {
                    listOfGamesDiv[listOfGamesIndex].innerHTML = "-/-";
                    listOfGamesTd[listOfGamesIndex].style.backgroundColor = "";
                }
                backendIndex++;
                listOfTeamNameElementsIndex++;
            }
            // Empty player
            else
            {
                listOfGamesDiv[listOfGamesIndex].innerHTML = "-/-";
                listOfGamesTd[listOfGamesIndex].style.backgroundColor = "";
            }
            listOfGamesIndex++;
        }
    }
}


/* ---------------------------------------------------------------------
                        HTML modifying functions  
--------------------------------------------------------------------- */

/*
    moveButtonStarterPressed - Add an empty '-/-' cell for the
    EMPTY row created when a starter's 'MOVE' button is pressed.
*/
function moveButtonStarterPressed()
{
    console.log( "moveButtonStarterPressed()" );
    
    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    for( var i = listOfElements.length-1; i > 0; i-- )
    {
        var listOfElementsTr = listOfElements[i];
        if( listOfElementsTr.children.length == 5 || listOfElementsTr.children.length == 12
        ||( listOfElementsTr.children.length == 13 && getActiveMenu() != "Schedule" ) )
        {
            var newGamesTd = document.createElement( "td" );
            var newGamesDiv = document.createElement( "div" );
            newGamesTd.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
            newGamesDiv.innerHTML = "-/-";
            newGamesDiv.style.textAlign = "center";
            newGamesTd.appendChild( newGamesDiv );
            listOfElementsTr.appendChild( newGamesTd );
            break;
        }
        else if( listOfElementsTr.children.length == 6 && getActiveMenu() != "Stats" )
        {
            var newCell = listOfElementsTr.insertCell( 5 );
            var newGamesDiv = document.createElement( "div" );
            newCell.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
            newGamesDiv.style.textAlign = "center";
            newGamesDiv.innerHTML = "-/-";
            newCell.appendChild( newGamesDiv );
            break;
        }
    }
}

/*
    removeGamesColumn - removes the games data column to allow new data to be filled
*/
function removeGamesColumn()
{
    // console.log( "removeGamesColumn" );
    var elements = document.getElementsByClassName( "fbw-games-remaining-td" );

    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}

/*
    removeEntireColumn - removes the games data column to allow new data to be filled
*/
function removeEntireColumn()
{
    // console.log( "removeEntireColumn" );
    var elements = document.getElementsByClassName( "fbw-new-element" );

    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}

/* ---------------------------------------------------------------------
                            HTML Object Clicks 
--------------------------------------------------------------------- */
/*
    Adjusting the roster by moving players around
*/
$( 'body' ).on( 'click', 'a.move-action-btn', function() 
{
    var className = this.className;
    var closestTd = $( this ).closest( "td" )[0];
    var slotTd = $( closestTd ).siblings( "td" )[0];
    var slotTdInnerDiv = slotTd.getElementsByClassName( "table--cell" )[0];
    var benchOrStarter = slotTdInnerDiv.innerHTML;

    if( $( this ).text() == "MOVE" )
    {
        // A Starter Player's 'MOVE' button has been pressed
        if( benchOrStarter != "BE" && className.indexOf( "isActive" ) == -1 )
        {
            // Need a small delay for the new EMPTY bench spot to be created dynamically
            setTimeout( moveButtonStarterPressed, 200 );
        }
        // A Bench Player's 'MOVE' button has been pressed
        else
        {
        }
    }

    if( $( this ).text() == "HERE" )
    {
        // removeGamesColumn();
        requestGameDataFromServer( "Update" );
    }
});

/*
    For showing the features after switching dates for daily leagues
*/
$( 'body' ).on( 'click', 'div.custom--day', function() 
{
    var className = this.className;
    if( className.indexOf( "is-current" ) == -1 )
    {
        renderGames( PAGE_TYPE_TEAM_SWITCH_DATES );
    }
});

/*
    For showing the features after switching dates for weekly leagues
*/
$( 'body' ).on( 'click', 'div.custom--week', function() 
{
    var className = this.className;
    if( className.indexOf( "is-current" ) == -1 )
    {
        renderGames( PAGE_TYPE_TEAM_SWITCH_DATES );
    }
});

/*
    For showing the features after switching tab menus
*/
$( 'body' ).on( 'click', 'li.tabs__list__item', function() 
{
    var className = this.className;
    var menuSelected = $( this ).text();
    if( className.indexOf( "tabs__list__item--active" ) == -1 )
    {
        if( menuSelected == PAGE_TYPE_TEAM_STATS )
        {
            renderGames( menuSelected );
        }
        else if( menuSelected == PAGE_TYPE_TEAM_RESEARCH )
        {
            renderGames( menuSelected );
        }
        else if( menuSelected == PAGE_TYPE_TEAM_SCHEDULE )
        {
            renderGames( menuSelected );
        }
        else if( menuSelected == PAGE_TYPE_TEAM_NEWS )
        {
            renderGames( menuSelected );
        }
    }
    else // Do nothing, same menu
    {}
});

/*
    Current button that returns to the current date
*/
$( 'body' ).on( 'click', 'a.scoring--period-today', function() 
{
    var className = this.className;
    if( className.indexOf( "is-current" ) == -1 )
    {
        renderGames( PAGE_TYPE_TEAM_SWITCH_DATES );
    }
});

/*
    Changing dates with the calendar
*/
$( 'body' ).on( 'click', 'li.monthContainer__day--noEvent', function() 
{
    var className = this.className;
    if( ( className.indexOf( "monthContainer__day--disabled" ) == -1 ) && ( ( className.indexOf( "monthContainer__day--selected" ) == -1 ) ) )
    {
        renderGames( PAGE_TYPE_TEAM_SWITCH_DATES );
    }
});


/* ---------------------------------------------------------------------
                            Players - Object Changes 
--------------------------------------------------------------------- */

/*
    Changing pages
*/
$( 'body' ).on( 'click', 'li.PaginationNav__list__item', function() 
{
    console.log( $( this ).text() );
    var className = this.className;

    if( className.indexOf( "PaginationNav__list__item--active" ) == -1 )
    {
        removeGamesColumn();
        requestGameDataFromServer( "Add" )
    }
});

/*
    Changing positions of available free agents
*/
$( 'body' ).on( 'click', 'label.picker-option', function() 
{
    if( currentPageType == "Players" )
    {
        console.log( $( this ).text() );
        var className = this.className;

        if( className.indexOf( "checked" ) == -1 )
        {
            removeGamesColumn();
            setTimeout( requestGameDataFromServer( "Add" ), 2000 );
        }
    }
});

/*
    Filters
*/
$( 'body' ).on( 'change', 'select.dropdown__select', function() 
{
    removeGamesColumn();
    setTimeout( requestGameDataFromServer( "Add" ), 2000 );
});



/* ---------------------------------------------------------------------
                    Render Games by Page Type 
--------------------------------------------------------------------- */
 
/*
    renderGames - 
*/
async function renderGames( type )
{
    console.log( "renderGames - type=" + type );
    console.log( "renderGames - typeof type=" + typeof type );
    if( type == PAGE_TYPE_UNDEFINED || typeof type == 'undefined' )
    {
        return;
    }
    if( type == PAGE_TYPE_TEAM )
    {
        console.log( "before  sleep" );
        await sleep( 6000 );
        console.log( "after sleep" );
        isLeagueDailyOrWeekly();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_PLAYERS )
    {
        await sleep( 6000 );
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_ADDED_DROPPED )
    {

    }
    else if( type == PAGE_TYPE_TEAM_NEWS )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_RESEARCH )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_SCHEDULE )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_STATS )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type = PAGE_TYPE_TEAM_SWITCH_DATES )
    {
        removeGamesColumn();
        requestHeaderFromServer( "Update" );  
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_WEEKLY )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
}


// var observer = new MutationObserver( callLater );
var observer = new MutationObserver(function(mutations)
{
    var currentUrl = getCurrentUrl();
    console.log( currentUrl );
    console.log( getPageTypeFromUrl( currentUrl ) );
    var pageType = getPageTypeFromUrl( currentUrl );
    renderGames( pageType );
});


var observerConfig = {
    attributes: true, 
    characterData: true,
    childList: true
};

var targetNode = document.getElementById( "__next" );

function waitForAddedNode( params )
{
    new MutationObserver( function( mutations )
    {
        var element = document.getElementById( params.id );
        if ( element ) {
            var currentUrl = getCurrentUrl();
            console.log( currentUrl );
            console.log( getPageTypeFromUrl( currentUrl ) );
            var pageType = getPageTypeFromUrl( currentUrl );
            renderGames( pageType );
            this.disconnect();
            params.done( element );
        }
    }).observe( params.parent || document, {
        subtree: !!params.recursive,
        childList: true
    });
}

waitForAddedNode(
{
    id: '__next',
    parent: document.body,
    recursive: false,
    done: function( el )
    {
        observer.observe( targetNode, observerConfig );
    }
});