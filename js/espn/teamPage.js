/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    teamPage.js 
*/

/*
    Global Variables  
*/
var acronymEspnToYahoo = {};        // Dictionary to convert acronyms from ESPN to Yahoo
var initialRender = true;           // Flag to tell if it is a complete render
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

/* 
    getBackgroundColor - returns the background color
    associated with the number of games.

    games - The number of games
*/
getBackgroundColor = function( games )
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

/* 
    getTodaysDate - returns today's date by returning a new Date object.
*/
getTodaysDate = function()
{
    var todaysDate = new Date();
    return todaysDate;
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
    requestWeekNumberFromServer - 
*/
async function requestWeekNumberFromServer()
{
    console.log( "requestWeekNumberFromServer()" );
    // Sleep before getting the date string to allow the selected date some time to be changed
    await sleep( 200 );
    var dateRequestString = buildDateRequestString();
    var url = "http://www.fantasywizard.site/getweek/?pageName=eTeamsPage&format=json&date=" + dateRequestString;

    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            console.log( typeof data.weekNum );
            var weekNum = data.weekNum;
            addWeekGamesHeaders( data );
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

/*
    addGamesWeekHeaders - adds the 'GAMES' and 'WEEK' headers to the HTML of the page.
*/
function addWeekGamesHeaders( data )
{
    console.log( "addWeekGamesHeaders()" );

    var weekNum = data.weekNum;

    if( updateHeaders == false )
    {
        var listOfElements = document.getElementsByClassName( "Table2__header-row" );

        for( var i = 0; i < listOfElements.length; i++ )
        {
            if( listOfElements[i].innerHTML.indexOf( "STARTERS" ) != -1 )
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
    else
    {
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
}

/*

*/
async function requestDataFromServer()
{
    // console.log( "requestDataFromServer()" );

    var teamsRequestString = buildTeamsRequestString();
    // Sleep before getting the date string to allow the selected date some time to be changed
    await sleep( 200 );     
    var dateRequestString = buildDateRequestString();
    // var url = 'https://bilalsattar24.pythonanywhere.com/gamesremaining/?'+teamsRequestString+'&format=json&date='+dateString;
    var url = "https://www.fantasywizard.site/gamesremaining/?pageName=eTeamsPage&" + teamsRequestString + "&format=json&date=" + dateRequestString;
    console.log( url );

    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            addGamesDataToLocalDictionary( data, teamsRequestString );
            // addGamesForPlayers( data );
            addGamesForPlayers();
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function addGamesDataToLocalDictionary( data, teamsRequestString )
{
    localGamesDataDict = {};
    console.log( "addDataToLocalDictionary()" );
    var teamsRequestStringConcise = teamsRequestString.substring( 6, teamsRequestString.length-1 );
    var teamsList = teamsRequestStringConcise.split( "," );
    for( var i = 0; i < data.length; i++ )
    {
        if( !( teamsList[i] in localGamesDataDict ) )
        {
            // console.log( "OG team - " + teamsList[i]);
            localGamesDataDict[teamsList[i]] = data[i];
        }
        // else
        // {
        //     console.log( "Duplicate team - " + teamsList[i]);
        // }
    }
    console.log( localGamesDataDict );
}

/*

*/
function addGamesForPlayers()
{
    console.log( "addGamesForPlayers()" );

    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    var totalGamesRemaining = 0;
    var totalGamesForWeek = 0;

    var listOfTeamNameElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var listOfTeamNameElementsIndex = 0;

    if( initialRender == true )
    {
        // var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
        var index = 0;


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
        }
        initialRender = false;
    }
    // Not initial render, do not create new elements, update them, 
    // For moving players around
    else
    {
        var listOfGamesTd = document.getElementsByClassName( "fbw-games-remaining-td" );
        var listOfGamesDiv = document.getElementsByClassName( "fbw-games-remaining-div" );
        var listOfGamesIndex = 0;
        var backendIndex = 0;

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
                        // listOfGamesDiv[listOfGamesIndex].innerHTML = data[backendIndex];
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
}

/*

*/
// Add an empty '-/-' cell for the EMPTY row created when a starter's 'MOVE'
// button is pressed.
function moveButtonStarterPressed()
{
    console.log( "moveButtonStarterPressed()" );
    
    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    for( var i = listOfElements.length-1; i > 0; i-- )
    {
        var listOfElementsTr = listOfElements[i];
        if( listOfElementsTr.children.length == 5 )
        {
            var newGamesTd = document.createElement( "td" );
            var newGamesDiv = document.createElement( "div" );
            newGamesTd.className = "Table2__td Table2__td--fixed-width fbw-games-remaining-td";
            newGamesDiv.className = "jsx-2810852873 table--cell fbw-games-remaining-div";
            newGamesDiv.innerHTML = "-/-";
            newGamesTd.appendChild( newGamesDiv );
            listOfElementsTr.appendChild( newGamesTd );
            break;
        }
    }
}

/*

*/
// Adjusting the roster by moving players around
// Requires a call to render to load the correct games
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
        requestDataFromServer();
    }
});

/*
    removeColumn - removes the games data column to allow new data to be filled
*/
function removeColumn()
{
    var elements = document.getElementsByClassName( "fbw-games-remaining-td" );

    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}

/*
    For showing the features after switching dates
*/
$( 'body' ).on( 'click', 'div.custom--day', function() 
{
    var className = this.className;
    // Render games for new dates
    // Date other than the current one selected
    if( className.indexOf( "is-current" ) == -1 )
    {
        initialRender = true;
        updateHeaders = true;
        removeColumn();
        requestWeekNumberFromServer();  
        requestDataFromServer();
        // renderGames( "Switch Dates" );
    }
});

/*
    For showing the features after switching tab menus
*/
$( 'body' ).on( 'click', 'li.tabs__list__item', function() 
{
    console.log( $( this ).text() );
    // Be able to tell if switching from active
    var className = this.className;
    var menuSelected = $( this ).text();
    // console.log( "className= " + className );
    if( className.indexOf( "tabs__list__item--active" ) == -1 )
    {
        // Update by page
        if( menuSelected == "Stats" )
        {
            renderGames( "Stats" );
        }
        else
        {
            renderGames( "Other Menus" );
        }
    }
    else
    {
        console.log( "Do nothing, same menu" );
    }
});


/*
    renderGames - 
*/
function renderGames( type )
{
    console.log( "renderGames - type=" + type );

    if( type == "Document Ready" )
    {
        requestWeekNumberFromServer();
        requestDataFromServer();
    }
    else if( type == "Other Menus" )
    {
        initialRender = true;
        requestWeekNumberFromServer();
        requestDataFromServer();
    }
    else if( type == "Stats" )
    {
        initialRender = true;
        requestWeekNumberFromServer();
        requestDataFromServer();
    }
    else if( type = "Switched Dates" )
    {
        initialRender = true;
        updateHeaders = true;
        removeColumn();
        requestWeekNumberFromServer();  
        requestDataFromServer();
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
    }, 3000 );
});
