/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    teamPage.js 
*/

/* ----------------------------------------------
                Global Variables  
---------------------------------------------- */
var acronymEspnToYahoo = {};        // Dictionary to convert acronyms from ESPN to Yahoo
var addGamesElements = true;           // Flag to tell if it is a complete render - ** change to updateGames
// var addGamesElements = true;
var localGamesDataDict = {};        // Holds the game remaining data
var updateHeaders = false;          // Flag to update headers

acronymEspnToYahoo["Atl"]  =  "Atl";
acronymEspnToYahoo["Bos"]  =  "Bos";
acronymEspnToYahoo["Bkn"]  =  "Bkn";
acronymEspnToYahoo["Cha"]  =  "Cha";
acronymEspnToYahoo["Chi"]  =  "Chi";
acronymEspnToYahoo["Cle"]  =  "Cle";
acronymEspnToYahoo["Dal"]  =  "Dal";
acronymEspnToYahoo["Den"]  =  "Den";
acronymEspnToYahoo["Det"]  =  "Det";
acronymEspnToYahoo["GS"]   =  "GS";
acronymEspnToYahoo["Hou"]  =  "Hou";
acronymEspnToYahoo["Ind"]  =  "Ind";
acronymEspnToYahoo["LAC"]  =  "LAC";
acronymEspnToYahoo["LAL"]  =  "LAL";
acronymEspnToYahoo["Mem"]  =  "Mem";
acronymEspnToYahoo["Mia"]  =  "Mia";
acronymEspnToYahoo["Mil"]  =  "Mil";
acronymEspnToYahoo["Min"]  =  "Min";
acronymEspnToYahoo["No"]   =  "NO";
acronymEspnToYahoo["NY"]   =  "NY";
acronymEspnToYahoo["OKC"]  =  "OKC";
acronymEspnToYahoo["Orl"]  =  "Orl";
acronymEspnToYahoo["Phi"]  =  "Phi";
acronymEspnToYahoo["Phx"]  =  "Pho";
acronymEspnToYahoo["Por"]  =  "Por";
acronymEspnToYahoo["Sac"]  =  "Sac";
acronymEspnToYahoo["SA"]   =  "SA";
acronymEspnToYahoo["Tor"]  =  "Tor";
acronymEspnToYahoo["Utah"] =  "Uta";
acronymEspnToYahoo["Wsh"]  =  "Was";


/* ----------------------------------------------
                Helper Functions  
---------------------------------------------- */


/*
    buildTeamsRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildTeamsRequestString()
{
    // console.log( "buildTeamsRequestString()" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    for( var i = 0; i < listOfElements.length; i++ )
    {
        teamsRequestString += acronymEspnToYahoo[listOfElements[i].innerHTML] + ",";
    }
    // console.log( teamsRequestString );
    return teamsRequestString;
}


/*
    buildDateRequestString - 
*/
function buildDateRequestString()
{
    // console.log( "buildDateRequestString()" );
    var currentElements = document.getElementsByClassName( "is-current" );
    var currentDateDiv = currentElements[0];
    var currentDateChildren = currentDateDiv.children[0];
    var currentMonthDate = currentDateChildren.innerHTML;
    var currentMonthDateSplit = currentMonthDate.split( " " );
    var month = currentMonthDateSplit[0];
    var date = currentMonthDateSplit[1];

    if( month == "Oct" )
    {
        return ( "2018-10-" + date );
    }
    else if( month == "Nov" )
    {
        return ( "2018-11-" + date );
    }
    else if( month == "Dec" )
    {
        return ( "2018-12-" + date );
    }
    else if( month == "Jan" )
    {
        return ( "2019-01-" + date );
    }
    else if( month == "Feb" )
    {
        return ( "2019-02-" + date );
    }
    else if( month == "Mar" )
    {
        return ( "2019-03-" + date );
    }
    else if( month == "Apr" )
    {
        return ( "2019-04-" + date );
    }
}

/*
    buildLeagueIdRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildLeagueIdRequestString()
{
    console.log( "buildLeagueIdRequestString()" );
    var entireUrl = window.location.href;
    // console.log( url );
    var url = new URL( entireUrl );
    var leagueId = url.searchParams.get( "leagueId" );
    console.log( leagueId );
    var leagueIdRequestString = "leagueID="+leagueId;
    console.log( leagueIdRequestString );
    return leagueIdRequestString;
}

/*
    buildTeamsRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildTeamsRequestString()
{
    // console.log( "buildTeamsRequestString()" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    for( var i = 0; i < listOfElements.length; i++ )
    {
        teamsRequestString += acronymEspnToYahoo[listOfElements[i].innerHTML] + ",";
    }
    // console.log( teamsRequestString );
    return teamsRequestString;
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
    getActiveMenu - 
*/
function getActiveMenu()
{
    console.log( "getActiveMenu" );
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
    if( games > 3 )
    {
        return "#adebad";
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
        return "#ffe1ba";
    }
    else if( games == 0 )
    {
        return "#ffd6cc";
    }
}

/* ----------------------------------------------
                Main Functions  
---------------------------------------------- */
/*
    requestHeaderFromServer - 
*/
async function requestHeaderFromServer( addOrUpdate )
{
    console.log( "requestHeaderFromServer()" );
    // Sleep before getting the date string to allow the selected date some time to be changed
    await sleep( 200 );
    var dateRequestString = buildDateRequestString();
    var leagueIdRequestString = buildLeagueIdRequestString();
    var url = "http://www.fantasywizard.site/getweek/?pageName=eTeamsPage&format=json&date=" + dateRequestString + "&" + leagueIdRequestString;

    fetch( url )
        .then( function( response ){
        if ( response.status !== 200 )
        {
            console.log( 'Called to backend failed: ' + response.status );
            return;
        }
        response.json().then( function( data )
        {
            var weekNum = data.weekNum;
            if( addOrUpdate == "Add" )
            {
                addWeekGamesHeaders( data );
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
            console.log(listOfElements[i]);
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
    updateWeekNumberHeader - updates the 'GAMES' and 'WEEK' headers
*/
function updateWeekNumberHeader()
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
    requestGameDataFromServer
*/
async function requestGameDataFromServer( addOrUpdate )
{
    console.log( "requestGameDataFromServer()" );

    var teamsRequestString = buildTeamsRequestString();
    // Sleep before getting the date string to allow the selected date some time to be changed
    await sleep( 200 );     
    var dateRequestString = buildDateRequestString();
    var leagueIdRequestString = buildLeagueIdRequestString();
    // var url = 'https://bilalsattar24.pythonanywhere.com/gamesremaining/?'+teamsRequestString+'&format=json&date='+dateString;
    var url = "https://www.fantasywizard.site/gamesremaining/?pageName=eTeamsPage&" + teamsRequestString + "&format=json&date=" + dateRequestString + "&" + leagueIdRequestString;
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
                addGamesForPlayers();
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

function addGamesDataToLocalDictionary( data, teamsRequestString )
{
    console.log( "addDataToLocalDictionary()" );
    localGamesDataDict = {};
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
        console.log( "listOfElementsTr.children.length=" + listOfElementsTr.children.length );

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
                    var teamName = acronymEspnToYahoo[ listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML ];
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newGamesTd.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                    newGamesTd.style.backgroundColor = getBackgroundColor( 0 );
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
                    var teamName = acronymEspnToYahoo[ listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML ];
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newGamesTd.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                    newGamesTd.style.backgroundColor = getBackgroundColor( 0 );
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
            console.log( listOfElementsTr );

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
                    var teamName = acronymEspnToYahoo[ listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML ];
                    newGamesDiv.innerHTML = localGamesDataDict[teamName];
                    var splitDataIndex = localGamesDataDict[teamName].split( "/" );
                    totalGamesRemaining += parseInt( splitDataIndex[0] );
                    totalGamesForWeek += parseInt( splitDataIndex[1] );
                    newCell.style.backgroundColor = getBackgroundColor( splitDataIndex[0] );
                }
                else
                {
                    newGamesDiv.innerHTML = "-/-";
                    newCell.style.backgroundColor = getBackgroundColor( 0 );
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
    updateGameData - update the game data when the dates have been switched
*/
function updateGameData()
{
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

        if( listOfElementsTr.children.length == 6 )
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
                    var teamName = acronymEspnToYahoo[ listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML ];
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
                    listOfGamesTd[listOfGamesIndex].style.backgroundColor = getBackgroundColor( 0 );
                }
                backendIndex++;
                listOfTeamNameElementsIndex++;
            }
            // Empty player
            else
            {
                listOfGamesDiv[listOfGamesIndex].innerHTML = "-/-";
                listOfGamesTd[listOfGamesIndex].style.backgroundColor = getBackgroundColor( 0 );
            }
            listOfGamesIndex++;
        }
    }
}

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
        console.log( "listOfElementsTr.children.length= " + listOfElementsTr.children.length );
        if( listOfElementsTr.children.length == 5 || listOfElementsTr.children.length == 12 )
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
    }
}



/*
    removeGamesColumn - removes the games data column to allow new data to be filled
*/
function removeGamesColumn()
{
    console.log( "removeGamesColumn" );
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
    console.log( "removeEntireColumn" );
    var elements = document.getElementsByClassName( "fbw-new-element" );

    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
        console.log( "deleted an element" );
    }
}

/* ----------------------------------------------
            HTML Object Clicks  
---------------------------------------------- */

/*
    Adjusting the roster by moving players around
*/
$( 'body' ).on( 'click', 'a.move-action-btn', function() 
{
    var closestTd = $( this ).closest( "td" )[0];
    var slotTd = $( closestTd ).siblings( "td" )[0];
    var slotTdInnerDiv = slotTd.getElementsByClassName( "table--cell" )[0];
    var benchOrStarter = slotTdInnerDiv.innerHTML;

    if( $( this ).text() == "MOVE" )
    {
        // A Starter Player's 'MOVE' button has been pressed
        if( benchOrStarter != "BE" )
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
        requestGameDataFromServer( "Update" );
    }
});

/*
    For showing the features after switching dates
*/
$( 'body' ).on( 'click', 'div.custom--day', function() 
{
    var className = this.className;
    if( className.indexOf( "is-current" ) == -1 )
    {
        renderGames( "Switch Dates" );
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
        if( menuSelected == "Stats" )
        {
            renderGames( menuSelected );
        }
        else if( menuSelected == "Research" )
        {
            renderGames( menuSelected );
        }
        else if( menuSelected == "Schedule" )
        {
            renderGames( menuSelected );
        }
        else if( menuSelected == "News" )
        {
            renderGames( menuSelected );
        }
    }
    else // Do nothing, same menu
    {}
});

/* ----------------------------------------------
            Render Games by Type  
---------------------------------------------- */
/*
    renderGames - 
*/
function renderGames( type )
{
    console.log( "renderGames - type=" + type );

    if( type == "Document Ready" )
    {
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == "News" )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == "Research" )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == "Schedule" )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type == "Stats" )
    {
        removeEntireColumn();
        requestHeaderFromServer( "Add" );
        requestGameDataFromServer( "Add" );
    }
    else if( type = "Switched Dates" )
    {
        removeGamesColumn();
        requestHeaderFromServer( "Update" );  
        requestGameDataFromServer( "Add" );
    }
}
/*
    Main load of calling render games when the document is ready.
    Note: Have to wait a few seconds to load this dynamic page, otherwise it will not find any elements. 
*/
$( document ).ready( function()
{
    setTimeout( function()
    {
        renderGames( "Document Ready" );
    }, 5000 );
});
