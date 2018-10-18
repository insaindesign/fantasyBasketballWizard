/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    espn.js

    Written by: JL
*/

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Global Variables
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

const DAILY_LEAGUE = "Daily";
const PAGE_TYPE_ADDED_DROPPED = "Added Dropped";
const PAGE_TYPE_BOXSCORE = "Boxscore";
const PAGE_TYPE_FANTASY_CAST = "Fantasy Cast";
const PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES = "Fantasy Cast Most Categories";
const PAGE_TYPE_FANTASY_CAST_POINTS = "Fantasy Cast Points";
const PAGE_TYPE_PLAYERS = "Players";
const PAGE_TYPE_TEAM = "Team";
const PAGE_TYPE_TEAM_NEWS = "News";
const PAGE_TYPE_TEAM_RESEARCH = "Research";
const PAGE_TYPE_TEAM_SCHEDULE = "Schedule";
const PAGE_TYPE_TEAM_STATS = "Stats";
const PAGE_TYPE_TEAM_SWITCH_DATES = "Switch Dates";
const PAGE_TYPE_UNDEFINED = "Undefined";
const WEEKLY_LEAGUE = "Weekly";

var currentPageType = "";
var dailyOrWeekly = "";             // Value of daily or weekly league
var localGamesDataDict = {};        // Holds the game remaining data
var updateHeaders = false;          // Flag to update headers

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Helper Functions
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */


/*
    buildSelectDateRequestString - creates a date request string for the
    the parameter for the server request for either daily or weekly leagues
*/
function buildSelectDateRequestString()
{
    // console.log( "buildSelectDateRequestString" );
    var currentElements = document.getElementsByClassName( "is-current" );
    var resultDateRequestString = "date=";
    // console.log( dailyOrWeekly );
    if( dailyOrWeekly == DAILY_LEAGUE )
    {
        var currentDateDiv = currentElements[0];
        var currentDateChildren = currentDateDiv.children[0];
        var currentMonthDate = currentDateChildren.innerHTML;
        var currentMonthDateSplit = currentMonthDate.split( " " );
        var selectedMonth = currentMonthDateSplit[0];
        var selectedDate = currentMonthDateSplit[1];

        resultDateRequestString = resultDateRequestString.concat( formatDateString( selectedMonth, selectedDate ) );
    }
    else if( dailyOrWeekly == WEEKLY_LEAGUE )
    {
        var currentDateDiv = currentElements[0];
        var currentDateChildren = currentDateDiv.children[1];
        var currentMonthDate = currentDateChildren.innerHTML;
        var currentMonthDateSplit = currentMonthDate.split( " " );
        var dateString = "";
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
            dateString = formattedDateLowerRange;
            resultDateRequestString = resultDateRequestString.concat( dateString );
        }
        // Today's date in between the week ranges then use today's date to get the accurate date
        else if( ( todaysDate.getTime() > new Date( formattedDateLowerRange ).getTime() ) && 
                 ( todaysDate.getTime() < new Date( formattedDateEndRange ).getTime() ) )
        {
            dateString = formatDateString( todaysDate.getMonth()+1, todaysDate.getDate() );
            resultDateRequestString = resultDateRequestString.concat( dateString );
        }
        else if( ( todaysDate.getTime() > new Date( formattedDateEndRange ).getTime() ) )
        {
            dateString = formattedDateEndRange;
            resultDateRequestString = resultDateRequestString.concat( dateString );
        }
        else
        {
        }
    }
    // console.log( "resultDateRequestString=" + resultDateRequestString );
    return resultDateRequestString;
}

/*
    buildTodayDateRequestString - 
*/
function buildTodayDateRequestString()
{
    // console.log( "buildTodayDateRequestString" );
    var resultDateRequestString = "date="
    var todaysDate = new Date();
    var firstDayOfSeason = new Date( "2018-10-16" );
    // Getting today's date before regular season starts
    if( todaysDate <= firstDayOfSeason ) 
    {
        resultDateRequestString = resultDateRequestString.concat( "2018-10-16" );
    }
    else
    {
        resultDateRequestString = resultDateRequestString.concat( todaysDate.getFullYear() + "-" + ( todaysDate.getMonth() + 1 ) + "-" + todaysDate.getDate() );
    }
    // console.log( "resultDateRequestString=" + resultDateRequestString );
    return resultDateRequestString;
}

/*
    buildDateRequestStringFantasyCast - creates part of the url 
    for the teams to request game data for.
*/
function buildDateRequestStringFantasyCast()
{
    // console.log( "buildDateRequestStringFantasyCast" );
    var dateElements = document.getElementsByClassName( "dropdown__select" );
    var dateElement = dateElements[0];
    var selectedDate = dateElement[dateElement.selectedIndex].text;
    var selectedDateSplit = selectedDate.split( " " );
    var month = selectedDateSplit[0];
    var date = selectedDateSplit[1];
    var resultDateRequestString = "date=";
    // console.log( "selectedDate=" + selectedDate + ", month=" + month + ", date=" + date );

    if( month == "Oct" )
    {
        resultDateRequestString += ( "2018-10-" + date );
    }
    else if( month == "Nov" )
    {
        resultDateRequestString += ( "2018-11-" + date );
    }
    else if( month == "Dec" )
    {
        resultDateRequestString += ( "2018-12-" + date );
    }
    else if( month == "Jan" )
    {
        resultDateRequestString += ( "2019-01-" + date );
    }
    else if( month == "Feb" )
    {
        resultDateRequestString += ( "2019-02-" + date );
    }
    else if( month == "Mar" )
    {
        resultDateRequestString += ( "2019-03-" + date );
    }
    else if( month == "Apr" )
    {
        resultDateRequestString += ( "2019-04-" + date );
    }
    return resultDateRequestString;
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
    buildTeamsRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildTeamsRequestString()
{
    // console.log( "buildTeamsRequestString" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    // console.log( localGamesDataDict );
    // console.log( "currentPageType=" + currentPageType );
    for( var i = 0; i < listOfElements.length; i++ )
    {
        if( currentPageType == PAGE_TYPE_PLAYERS
        || currentPageType == PAGE_TYPE_ADDED_DROPPED 
        || currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS
        || currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES )
        {
            if( !( listOfElements[ i ].innerHTML in localGamesDataDict ) && ( listOfElements[ i ].innerHTML != "FA" ) )
            {
                teamsRequestString += listOfElements[i].innerHTML + ",";
            }
        }
        // else if( currentPageType == PAGE_TYPE_ADDED_DROPPED )
        // {
        //     if( !( listOfElements[ i ].innerHTML in localGamesDataDict ) && listOfElements[ i ].innerHTML != "FA" )
        //     {
        //         teamsRequestString += listOfElements[ i ].innerHTML + ",";
        //     }
        // }
        else
        {
            if( listOfElements[ i ].innerHTML != "FA" )
            {
                teamsRequestString += listOfElements[i].innerHTML + ",";
            }
        }
    }
    // console.log( teamsRequestString );
    return teamsRequestString;
}

/*
    buildPageNameRequestString -
*/
function buildPageNameRequestString()
{
    // console.log( "buildPageNameRequestString" );
    var pageNameResult = "pageName=";

    if( currentPageType == PAGE_TYPE_TEAM )
    {
        pageNameResult += "espnTeamStats";
    }
    else if( currentPageType == PAGE_TYPE_PLAYERS )
    {
        pageNameResult += "espnPlayers";
    }
    else if( currentPageType == PAGE_TYPE_TEAM_RESEARCH )
    {
        pageNameResult += "espnTeamResearch";
    }
    else if( currentPageType == PAGE_TYPE_TEAM_SCHEDULE )
    {
        pageNameResult += "espnTeamSchedule";
    }
    else if( currentPageType == PAGE_TYPE_TEAM_NEWS )
    {
        pageNameResult += "espnTeamNews";
    }
    else if( currentPageType == PAGE_TYPE_ADDED_DROPPED )
    {
        pageNameResult += "espnAddedDropped";
    }
    else if( currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS )
    {
        pageNameResult += "espnFantasyCastPoints";
    }
    else if( currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES )
    {
        pageNameResult += "espnFantasyCastMostCats";
    }
    else if( currentPageType == PAGE_TYPE_BOXSCORE )
    {
        pageNameResult += "espnBoxscore";
    }

    // console.log( pageNameResult );
    return pageNameResult;
}

/*
    formatDateString - formats a date string in YYYY-MM-DD
*/
function formatDateString( month, date )
{
    // console.log( "formatDateString - month=" + month + ", date=" + date );
    var dateString = "";

    if( month == "Oct" || month == "10" )
    {
        dateString = ( "2018-10-" + date );
    }
    else if( month == "Nov" || month == "11" )
    {
        dateString = ( "2018-11-" + date );
    }
    else if( month == "Dec" || month == "12" )
    {
        dateString = ( "2018-12-" + date );
    }
    else if( month == "Jan" || month == "1" || month == "01" )
    {
        dateString = ( "2019-01-" + date );
    }
    else if( month == "Feb" || month == "2" )
    {
        dateString = ( "2019-02-" + date );
    }
    else if( month == "Mar" || month == "3" )
    {
        dateString = ( "2019-03-" + date );
    }
    else if( month == "Apr" || month == "4" )
    {
        dateString = ( "2019-04-" + date );
    }
    // console.log( "dateString=" + dateString );
    return dateString;
}


/* 
    getActiveMenu - returns the active menu
*/
function getActiveMenu()
{
    // console.log( "getActiveMenu" );
    var entireUrl = window.location.href;
    var url = new URL( entireUrl );
    var view = url.searchParams.get( "view" );

    // if nothing, then it is at Stats
    if( view != null )
    {
        return view.charAt( 0 ).toUpperCase() + view.slice( 1 );
    }
    else
    {
        // console.log( "view is null" );
        return PAGE_TYPE_TEAM_STATS;
    }

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
    // console.log( window.location.href );
    return window.location.href;
}

function getPageTypeFromUrl( url )
{
    // console.log( "getPageTypeFromUrl" );
    if( url.indexOf( "basketball/team" ) != -1 )
    {
        var activeMenu = getActiveMenu();
        // console.log( "activeMenu=" + activeMenu );
        isLeagueDailyOrWeekly();
        if( dailyOrWeekly == WEEKLY_LEAGUE )
        {
            currentPageType = WEEKLY_LEAGUE;
        }
        else if( activeMenu == PAGE_TYPE_TEAM_SCHEDULE )
        {
            currentPageType = PAGE_TYPE_TEAM_SCHEDULE;
        }
        else if( activeMenu == PAGE_TYPE_TEAM_NEWS )
        {
            currentPageType = PAGE_TYPE_TEAM_NEWS;
        }
        else if( activeMenu == PAGE_TYPE_TEAM_RESEARCH )
        {
            currentPageType = PAGE_TYPE_TEAM_RESEARCH;
        }
        else if( activeMenu == PAGE_TYPE_TEAM_STATS )
        {
            currentPageType = PAGE_TYPE_TEAM;
        }
    }
    else if( url.indexOf( "basketball/players/add" ) != -1 )
    {
        currentPageType = PAGE_TYPE_PLAYERS;
    }
    else if( url.indexOf( "basketball/addeddropped" ) != -1 )
    {
        currentPageType = PAGE_TYPE_ADDED_DROPPED;
    }
    else if( url.indexOf( "fantasycast" ) != -1 )
    {
        currentPageType = PAGE_TYPE_FANTASY_CAST;
    }
    else if( url.indexOf( "boxscore" ) != -1 )
    {
        currentPageType = PAGE_TYPE_BOXSCORE;
    }
    else
    {
        return PAGE_TYPE_UNDEFINED;
    }
    console.log( "currentPageType=" + currentPageType );
    return currentPageType;
}


/*
    isLeagueDailyOrWeekly - returns whether the league is daily or weekly
*/
function isLeagueDailyOrWeekly()
{
    // console.log( "isLeagueDailyOrWeekly" );
    var dateElements = document.getElementsByClassName( "is-current" );

    if( dateElements.length > 0 )
    {
        if( dateElements[0].innerHTML.indexOf( "day" ) != -1 )
        {
            dailyOrWeekly = DAILY_LEAGUE;
            return DAILY_LEAGUE;
        }
        else if( dateElements[0].innerHTML.indexOf( "week" ) != -1 )
        {
            dailyOrWeekly = WEEKLY_LEAGUE;
            return WEEKLY_LEAGUE;
        }
    }
}

/*
    isFantasyCastMostCatsOrPoints - returns whether the fantasy cast page
    is most categories or points
*/
function isFantasyCastMostCatsOrPoints()
{
    // console.log( "isFantasyCastMostCatsOrPoints" );
    var teamScoreElements = document.getElementsByClassName( "team-score" );
    // console.log( "teamScoreElements.length=" +teamScoreElements.length );
    if( teamScoreElements.length == 2 )
    {
        currentPageType = PAGE_TYPE_FANTASY_CAST_POINTS;
    }
    else if( teamScoreElements.length == 6 )
    {
        currentPageType = PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES;
    }
}

/*
    sleep - to create a delay in some functions to help the dynamic ESPN
    page load and change different settings
*/
function sleep( ms )
{
  return new Promise( resolve => setTimeout( resolve, ms ) );
}


/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        WEEK - GAMES HEADERS
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    addWeekGamesHeaders - adds the 'WEEK #' and 'GR/G' headers to the HTML of the page
*/
function addWeekGamesHeaders( data )
{
    // console.log( "addWeekGamesHeaders" );

    var activeMenu = getActiveMenu();
    var listOfElements = document.getElementsByClassName( "Table2__header-row" );
    var weekNum = data.weekNum; 

    if( activeMenu == PAGE_TYPE_TEAM_NEWS )
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
            // console.log(listOfElements[i].innerHTML);
            if( listOfElements[i].innerHTML.indexOf( "STARTERS" ) != -1 || listOfElements[i].innerHTML.indexOf( "BENCH" ) != -1  )
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
    addWeekGamesHeadersPlayers - adds the 'WEEK #' and 'GR/G' headers
    to the HTML of the page for Players page
*/
function addWeekGamesHeadersPlayers( data )
{
    // console.log( "addWeekGamesHeaders" );
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
    addWeekGamesHeadersAddedDroppedPage - adds the 'GR/G' header to the HTML of the page.
*/
function addWeekGamesHeadersAddedDroppedPage( data )
{
    // console.log( "addWeekGamesHeadersAddedDroppedPage" );
    var weekNum = data.weekNum;
    var listOfElements = document.getElementsByClassName( "Table2__header-row" );

    for( var i = 0; i < listOfElements.length; i++ )
    {
        var newHeaderTh = document.createElement( "th" );
        var newHeaderSpan = document.createElement( "span" );
        newHeaderTh.title = "Games Remaining / Games This Week";
        newHeaderTh.colSpan = "1";
        newHeaderTh.className = "jsx-2810852873 table--cell poc tar header";
        newHeaderSpan.innerHTML = "GR/G";
        newHeaderTh.appendChild( newHeaderSpan );
        listOfElements[i].appendChild( newHeaderTh );
    }
}

/*
    addWeekGamesHeadersBoxscorePage - adds the 'GR/G' header to the HTML of the page.
*/
function addWeekGamesHeadersBoxscorePage( data )
{
    console.log( "addWeekGamesHeadersBoxscorePage" );
    var weekNum = data.weekNum;
    var listOfElements = document.getElementsByClassName( "Table2__header-row" );

    for( var i = 0; i < listOfElements.length; i++ )
    {
        console.log( listOfElements[i] );
        if( listOfElements[i].innerHTML.indexOf( "STARTERS" ) != -1 || listOfElements[i].innerHTML.indexOf( "BENCH" ) != -1  )
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
    // console.log( "requestHeaderFromServer" );
    // Sleep before getting the date string to allow the selected date some time to be changed
    await sleep( 4000 );
    var dateRequestString = "";
    // console.log( "currentPageType=" + currentPageType );
    if( currentPageType == PAGE_TYPE_PLAYERS || currentPageType == PAGE_TYPE_ADDED_DROPPED || currentPageType == PAGE_TYPE_BOXSCORE )
    {
        dateRequestString = buildTodayDateRequestString();
    }
    else
    {
        dateRequestString = buildSelectDateRequestString();
    }

    // console.log( "dateRequestString - " + dateRequestString );
    // console.log( typeof dateRequestString );
    var leagueIdRequestString = buildLeagueIdRequestString();

    var pageNameRequestString = buildPageNameRequestString();

    if( ( dateRequestString != "date=" ) && ( typeof dateRequestString !== 'undefined' ) )
    {
        var url = "http://www.fantasywizard.site/getweek/?" + pageNameRequestString + "&format=json&" + dateRequestString + "&" + leagueIdRequestString;
        fetch( url )
            .then( function( response ){
            if ( response.status !== 200 )
            {
                console.log( 'Called to backend failed: ' + response.status );
                return;
            }
            response.json().then( function( data )
            {
                // console.log( "requestHeaderFromServer - addOrUpdate: " + addOrUpdate + ", currentPageType: " + currentPageType );
                var weekNum = data.weekNum;
                if( addOrUpdate == "Add" )
                {
                    if( currentPageType == PAGE_TYPE_PLAYERS )
                    {
                        addWeekGamesHeadersPlayers( data );
                    }
                    else if( currentPageType == PAGE_TYPE_ADDED_DROPPED )
                    {
                        addWeekGamesHeadersAddedDroppedPage( data );
                    }
                    else if( currentPageType == PAGE_TYPE_BOXSCORE )
                    {
                        addWeekGamesHeadersBoxscorePage( data );
                    }
                    else
                    {
                        addWeekGamesHeaders( data );
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

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        GAMES DATA
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    addGamesDataToLocalDictionary - 
*/
function addGamesDataToLocalDictionary( data, teamsRequestString )
{
    // console.log( "addDataToLocalDictionary" );
    // console.log( teamsRequestString );
    if( teamsRequestString != "teams=" )
    {
        // if( currentPageType != PAGE_TYPE_PLAYERS && currentPageType != PAGE_TYPE_ADDED_DROPPED )
        if( currentPageType == PAGE_TYPE_TEAM_NEWS
        || currentPageType == PAGE_TYPE_TEAM
        || currentPageType == PAGE_TYPE_TEAM_STATS
        || currentPageType == PAGE_TYPE_TEAM_RESEARCH
        || currentPageType == PAGE_TYPE_TEAM_SCHEDULE
        || currentPageType == WEEKLY_LEAGUE )
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
        // console.log( localGamesDataDict );
    }
}

/*
    requestGameDataFromServer
*/
async function requestGameDataFromServer( addOrUpdate )
{
    // console.log( "requestGameDataFromServer" );
    await sleep( 4000 );    

    var teamsRequestString = buildTeamsRequestString();
    if( currentPageType == PAGE_TYPE_PLAYERS && teamsRequestString == "teams=" )
    {
        addGamesPlayersPage();
    }
    else if( currentPageType == PAGE_TYPE_ADDED_DROPPED && teamsRequestString == "teams=" )
    {
        addGamesAddedDroppedPage();
    }
    else
    {
        var dateRequestString = "";
        if( currentPageType == PAGE_TYPE_PLAYERS || currentPageType == PAGE_TYPE_ADDED_DROPPED )
        {
            dateRequestString = buildTodayDateRequestString();
        }
        else if( currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS || currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES )
        {
            dateRequestString = buildDateRequestStringFantasyCast();
        }
        else
        {
            dateRequestString = buildSelectDateRequestString();
        }

        var leagueIdRequestString = buildLeagueIdRequestString();
        var pageNameRequestString = buildPageNameRequestString();
        if( ( dateRequestString != "date=" ) && (teamsRequestString != "teams=" ) && ( typeof dateRequestString !== 'undefined' ) )
        {
            var url = "https://www.fantasywizard.site/gamesremaining/?" + pageNameRequestString + "&" + teamsRequestString + "&format=json&" + dateRequestString + "&" + leagueIdRequestString;
            // console.log( url );

            fetch( url )
                .then( function( response ){
                if ( response.status !== 200 )
                {
                    console.log( 'Called to backend failed: ' + response.status );
                    return;
                }
                response.json().then( function( data )
                {
                    addGamesDataToLocalDictionary( data, teamsRequestString );
                    if( addOrUpdate == "Add" )
                    {
                        // console.log( "currentPageType=" + currentPageType );
                        if( currentPageType == PAGE_TYPE_PLAYERS )
                        {
                            addGamesPlayersPage();
                        }
                        else if( currentPageType == PAGE_TYPE_ADDED_DROPPED )
                        {
                            addGamesAddedDroppedPage();
                        }
                        else if( currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS )
                        {
                            addGamesFantasyCastPagePoints();
                        }
                        else
                        {
                            addGamesTeamPage(); 
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
    addGamesTeamPage - add the games remaining data to the HTML
    of the page
*/
function addGamesTeamPage()
{
    // console.log( "addGamesTeamPage" );

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
    addGamesFantasyCastPagePoints - 
*/
function addGamesFantasyCastPagePoints()
{
    // console.log( "addGamesFantasyCastPagePoints" );

    var listOfElements = document.getElementsByClassName( "Table2__tr" );
    var leftTotalGamesRemaining = 0;
    var leftTotalGamesForWeek = 0;
    var rightTotalGamesRemaining = 0;
    var rightTotalGamesForWeek = 0;

    for( var i = 0; i < listOfElements.length; i++ )
    {
        var listOfElementsChildren = listOfElements[i].children;
        var playerColumnLeft = listOfElementsChildren[0];
        var playerColumnLeftScore = listOfElementsChildren[1];
        var playerColumnRight = listOfElementsChildren[4];
        var playerColumnRightScore = listOfElementsChildren[3];
        var newLeftGamesDiv = document.createElement( "div" );
        var newRightGamesDiv = document.createElement( "div" );
        newLeftGamesDiv.className = "jsx-2810852873 table--cell points-column fbw-new-element";
        newRightGamesDiv.className = "jsx-2810852873 table--cell points-column reverse fbw-new-element";

        // Total Row
        if( listOfElements[i].className.indexOf( "total-row" ) != -1 )
        {
            var leftTotalGamesString = leftTotalGamesRemaining.toString() + "/" + leftTotalGamesForWeek.toString();
            var rightTotalGamesString = rightTotalGamesRemaining.toString() + "/" + rightTotalGamesForWeek.toString();
            newLeftGamesDiv.className += " fbw-left-total";
            newRightGamesDiv.className += " fbw-right-total";
            newLeftGamesDiv.innerHTML = leftTotalGamesString;
            newRightGamesDiv.innerHTML = rightTotalGamesString;
        }
        // Player Row
        else
        {
            // Check if the player is injured
            var isLeftInjured = false;
            var isRightInjured = false;
            var leftInjuredElements = playerColumnLeft.getElementsByClassName( "injury-status_medium" );
            var rightInjuredElements = playerColumnRight.getElementsByClassName( "injury-status_medium" );

            if( leftInjuredElements.length > 0 )
            {
                if( leftInjuredElements[0].innerHTML == "O" )
                {
                    isLeftInjured = true;
                }
            }

            if( rightInjuredElements.length > 0 )
            {
                if( rightInjuredElements[0].innerHTML == "O" )
                {
                    isRightInjured = true;
                }
            }

            // Empty Left Player
            if( playerColumnLeft.innerHTML.indexOf( "</div>Empty</div>" ) != -1 )
            {
                newLeftGamesDiv.innerHTML = "-/-";
            }
            // Normal Left Player
            else
            {
                if( !isLeftInjured )
                {
                    var teamNameElements = playerColumnLeft.getElementsByClassName( "playerinfo__playerteam" );
                    var teamName = teamNameElements[0].innerHTML;
                    newLeftGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    leftTotalGamesRemaining += parseInt( splitDataIndex[0] );
                    leftTotalGamesForWeek += parseInt( splitDataIndex[1] );
                    newLeftGamesDiv.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newLeftGamesDiv.innerHTML = "-/-";
                }
            }
            // Empty Right Player
            if( playerColumnRight.innerHTML.indexOf( "</div>Empty</div>" ) != -1 )
            {
                newRightGamesDiv.innerHTML = "-/-";
            }
            // Normal Right Player
            else
            {
                if( !isRightInjured )
                {
                    var teamNameElements = playerColumnRight.getElementsByClassName( "playerinfo__playerteam" );
                    var teamName = teamNameElements[0].innerHTML;
                    // console.log( "team:" + teamName );
                    // console.log( localGamesDataDict[teamName] );
                    newRightGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    rightTotalGamesRemaining += parseInt( splitDataIndex[0] );
                    rightTotalGamesForWeek += parseInt( splitDataIndex[1] );
                    newRightGamesDiv.style.backgroundColor = getBackgroundColor( splitDataIndex[0] ); 
                }
                else
                {
                    newRightGamesDiv.innerHTML = "-/-";
                }
            }
        }
        playerColumnLeftScore.appendChild( newLeftGamesDiv );
        playerColumnRightScore.appendChild( newRightGamesDiv );
    }

    // Update total games
    var leftTotalElements = document.getElementsByClassName( "fbw-left-total" );
    var rightTotalElements = document.getElementsByClassName( "fbw-right-total" );

    if( leftTotalElements.length > 0 )
    {
        var leftTotalGamesString = leftTotalGamesRemaining.toString() + "/" + leftTotalGamesForWeek.toString();
        var rightTotalGamesString = rightTotalGamesRemaining.toString() + "/" + rightTotalGamesForWeek.toString();
        leftTotalElements[0].innerHTML = leftTotalGamesString;
        rightTotalElements[0].innerHTML = rightTotalGamesString;
    }
    // Make the greater number of total games font color green
    // console.log( "leftTotalGamesRemaining=" + leftTotalGamesRemaining + ", rightTotalGamesRemaining=" + rightTotalGamesRemaining );
    if( leftTotalGamesRemaining > rightTotalGamesRemaining )
    {
        leftTotalElements[0].style.color = "#acd888";
    }
    else if( rightTotalGamesRemaining > leftTotalGamesRemaining )
    {
        rightTotalElements[0].style.color = "#acd888";
    }
    else if( leftTotalGamesRemaining == rightTotalGamesRemaining )
    { 
        // Do nothing in a tie 
    }
}

/*
    addGamesTeamPage - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesPlayersPage()
{
    // console.log( "addGamesPlayersPage" );

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
                    // console.log( "teamName=" + teamName );
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    // console.log( localGamesDataDict[teamName] );
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
    addGamesAddedDroppedPage - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesAddedDroppedPage()
{
    // console.log( "addGamesAddedDroppedPage" );

    var listOfElements = document.getElementsByClassName( "Table2__tr--sm" );
    var totalGamesRemaining = 0;
    var totalGamesForWeek = 0;

    var listOfTeamNameElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var listOfTeamNameElementsIndex = 0;

    for( var i = 0; i < listOfElements.length; i++ )
    {
        var listOfElementsTr = listOfElements[i];

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
    // console.log( "updateGameData" );
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

        // console.log( "listOfElementsTr.children.length= " + listOfElementsTr.children.length );
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


/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        HTML Modifying Helper Functions 
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    moveButtonStarterPressed - Add an empty '-/-' cell for the
    EMPTY row created when a starter's 'MOVE' button is pressed.
*/
function moveButtonStarterPressed()
{
    // console.log( "moveButtonStarterPressed" );
    
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

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Team - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */
/*
    Adjusting the roster by moving players around
*/
$( 'body' ).on( 'click', 'a.move-action-btn', function() 
{
    if( currentPageType == PAGE_TYPE_TEAM || currentPageType == PAGE_TYPE_TEAM_RESEARCH || currentPageType == PAGE_TYPE_TEAM_NEWS || currentPageType == PAGE_TYPE_TEAM_SCHEDULE || currentPageType == PAGE_TYPE_TEAM_STATS )
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
    }
});

/*
    For showing the features after switching dates for daily leagues
*/
$( 'body' ).on( 'click', 'div.custom--day', function() 
{
    if( currentPageType == PAGE_TYPE_TEAM || currentPageType == PAGE_TYPE_TEAM_RESEARCH || currentPageType == PAGE_TYPE_TEAM_NEWS || currentPageType == PAGE_TYPE_TEAM_SCHEDULE || currentPageType == PAGE_TYPE_TEAM_STATS )
    {
        var className = this.className;
        if( className.indexOf( "is-current" ) == -1 )
        {
            renderGamesNoSleep( PAGE_TYPE_TEAM_SWITCH_DATES );
        }
    }
});

/*
    For showing the features after switching dates for weekly leagues
*/
$( 'body' ).on( 'click', 'div.custom--week', function() 
{
    if( currentPageType == PAGE_TYPE_TEAM || currentPageType == PAGE_TYPE_TEAM_RESEARCH || currentPageType == PAGE_TYPE_TEAM_NEWS || currentPageType == PAGE_TYPE_TEAM_SCHEDULE || currentPageType == PAGE_TYPE_TEAM_STATS )
    {
        var className = this.className;
        if( className.indexOf( "is-current" ) == -1 )
        {
            renderGamesNoSleep( PAGE_TYPE_TEAM_SWITCH_DATES );
        }
    }
});

/*
    For showing the features after switching tab menus
*/
$( 'body' ).on( 'click', 'li.tabs__list__item', function() 
{
    if( currentPageType == PAGE_TYPE_TEAM || currentPageType == PAGE_TYPE_TEAM_RESEARCH || currentPageType == PAGE_TYPE_TEAM_NEWS || currentPageType == PAGE_TYPE_TEAM_SCHEDULE || currentPageType == PAGE_TYPE_TEAM_STATS )
    {
        var className = this.className;
        var menuSelected = $( this ).text();
        if( className.indexOf( "tabs__list__item--active" ) == -1 )
        {
            if( menuSelected == PAGE_TYPE_TEAM_STATS )
            {
                currentPageType = PAGE_TYPE_TEAM;
                renderGamesNoSleep( menuSelected );
            }
            else if( menuSelected == PAGE_TYPE_TEAM_RESEARCH )
            {
                currentPageType = PAGE_TYPE_TEAM_RESEARCH;
                renderGamesNoSleep( menuSelected );
            }
            else if( menuSelected == PAGE_TYPE_TEAM_SCHEDULE )
            {
                currentPageType = PAGE_TYPE_TEAM_SCHEDULE;
                renderGamesNoSleep( menuSelected );
            }
            else if( menuSelected == PAGE_TYPE_TEAM_NEWS )
            {
                currentPageType = PAGE_TYPE_TEAM_NEWS;
                renderGamesNoSleep( menuSelected );
            }
        }
        else // Do nothing, same menu
        {}
    }
});

/*
    Current button that returns to the current date
*/
$( 'body' ).on( 'click', 'a.scoring--period-today', function() 
{
    if( currentPageType == PAGE_TYPE_TEAM || currentPageType == PAGE_TYPE_TEAM_RESEARCH || currentPageType == PAGE_TYPE_TEAM_NEWS || currentPageType == PAGE_TYPE_TEAM_SCHEDULE || currentPageType == PAGE_TYPE_TEAM_STATS )
    {
        var className = this.className;
        if( className.indexOf( "is-current" ) == -1 )
        {
            renderGamesNoSleep( PAGE_TYPE_TEAM_SWITCH_DATES );
        }
    }
});

/*
    Changing dates with the calendar
*/
$( 'body' ).on( 'click', 'li.monthContainer__day--noEvent', function() 
{
    if( currentPageType == PAGE_TYPE_TEAM || currentPageType == PAGE_TYPE_TEAM_RESEARCH || currentPageType == PAGE_TYPE_TEAM_NEWS || currentPageType == PAGE_TYPE_TEAM_SCHEDULE || currentPageType == PAGE_TYPE_TEAM_STATS )
    {
        var className = this.className;
        if( ( className.indexOf( "monthContainer__day--disabled" ) == -1 ) && ( ( className.indexOf( "monthContainer__day--selected" ) == -1 ) ) )
        {
            renderGamesNoSleep( PAGE_TYPE_TEAM_SWITCH_DATES );
        }
    }
});


/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Players - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    Changing pages
*/
$( 'body' ).on( 'click', 'li.PaginationNav__list__item', function() 
{
    if( currentPageType == PAGE_TYPE_PLAYERS )
    {
        // console.log( $( this ).text() );
        var className = this.className;

        if( className.indexOf( "PaginationNav__list__item--active" ) == -1 )
        {
            removeGamesColumn();
            requestGameDataFromServer( "Add" )
        }
    }
});

/*
    Changing positions of available free agents
*/
$( 'body' ).on( 'click', 'label.picker-option', function() 
{
    if( currentPageType == PAGE_TYPE_PLAYERS )
    {
        // console.log( $( this ).text() );
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
    if( currentPageType == PAGE_TYPE_PLAYERS )
    {
        removeGamesColumn();
        setTimeout( requestGameDataFromServer( "Add" ), 2000 );
    }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Added Dropped - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    Changing pages
*/
$( 'body' ).on( 'click', 'label.control--radio', function() 
{
    if( currentPageType == PAGE_TYPE_ADDED_DROPPED )
    {
        var className = this.className;

        if( className.indexOf( "checked" ) == -1 )
        {
            removeGamesColumn();
            setTimeout( requestGameDataFromServer( "Add" ), 3000 );
        }
    }
});


/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                    Fantasy Cast Points - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */


$( 'body' ).on( 'change', 'select.dropdown__select', function() 
{
    if( currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS )
    {
        removeEntireColumn();
        localGamesDataDict = {};
        requestGameDataFromServer( "Add" );
    }

});

$( 'body' ).on( 'click', 'li.carousel__slide', function() 
{
    if( currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS )
    {
        // console.log( "change menu" );
        var className = this.className;
        if( className.indexOf( "selected" ) == -1 )
        {
            removeEntireColumn();
            setTimeout( requestGameDataFromServer( "Add" ), 1000 );
        }
    }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Page Handlers 
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */
 
/*
    renderGamesSleep - 
*/
async function renderGamesSleep( type )
{
    // console.log( "renderGamesSleep - type=" + type );
    // console.log( "renderGamesSleep - typeof type=" + typeof type );
    await sleep( 6000 );
    if( type == PAGE_TYPE_UNDEFINED || typeof type == 'undefined' )
    {
        return;
    }
    if( type == PAGE_TYPE_TEAM )
    {
        isLeagueDailyOrWeekly();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_PLAYERS )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_ADDED_DROPPED )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_BOXSCORE )
    {
        requestHeaderFromServer( "Add" );
        // requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_FANTASY_CAST )
    {
        isFantasyCastMostCatsOrPoints();
        requestGameDataFromServer( "Add" );    
    }
    else if( type == PAGE_TYPE_TEAM_NEWS )
    {
        isLeagueDailyOrWeekly();
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_RESEARCH )
    {
        isLeagueDailyOrWeekly();
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_SCHEDULE )
    {
        isLeagueDailyOrWeekly();
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_STATS )
    {
        isLeagueDailyOrWeekly();
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
    else if( type == WEEKLY_LEAGUE )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
}

/*
    renderGamesNoSleep - 
*/
async function renderGamesNoSleep( type )
{
    // console.log( "renderGamesNoSleep - type=" + type );
    // console.log( "renderGamesNoSleep - typeof type=" + typeof type );
    await sleep( 4000 );
    if( type == PAGE_TYPE_UNDEFINED || typeof type == 'undefined' )
    {
        return;
    }
    if( type == PAGE_TYPE_TEAM )
    {
        isLeagueDailyOrWeekly();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_PLAYERS )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_ADDED_DROPPED )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_BOXSCORE )
    {
        requestHeaderFromServer( "Add" );
        // requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_FANTASY_CAST )
    {
        isFantasyCastMostCatsOrPoints();
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_NEWS )
    {
        isLeagueDailyOrWeekly();
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_RESEARCH )
    {
        isLeagueDailyOrWeekly();
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_SCHEDULE )
    {
        isLeagueDailyOrWeekly();
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == PAGE_TYPE_TEAM_STATS )
    {
        isLeagueDailyOrWeekly();
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
    else if( type == WEEKLY_LEAGUE )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
}


// var observer = new MutationObserver( callLater );
var observer = new MutationObserver( function ( mutations )
{
    var currentUrl = getCurrentUrl();
    // console.log( currentUrl );
    // console.log( getPageTypeFromUrl( currentUrl ) );
    var pageType = getPageTypeFromUrl( currentUrl );
    localGamesDataDict = {};
    renderGamesNoSleep( pageType );
});


var observerConfig =
{
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
            // console.log( currentUrl );
            // console.log( getPageTypeFromUrl( currentUrl ) );
            var pageType = getPageTypeFromUrl( currentUrl );
            renderGamesSleep( pageType );
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