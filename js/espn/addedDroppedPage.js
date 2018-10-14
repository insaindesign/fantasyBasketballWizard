/*
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports

    playersPage.js
*/

/* ---------------------------------------------------------------------
                            Global Variables  
--------------------------------------------------------------------- */

var localGamesDataDict = {};

/* ---------------------------------------------------------------------
                            Helper Functions 
--------------------------------------------------------------------- */

/*
    buildTeamsRequestString - 
*/
function buildTeamsRequestString()
{
    console.log( "buildTeamsRequestString()" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    for( var i = 0; i < listOfElements.length; i++ )
    {
        if( !( listOfElements[ i ].innerHTML in localGamesDataDict ) )
        {
            teamsRequestString += listOfElements[ i ].innerHTML + ",";
        }
    }
    return teamsRequestString;
}

/*
    sleep - provides a delay
*/
function sleep( ms )
{
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

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
    getFormattedTodaysDate - 
*/
function getFormattedTodaysDate()
{
    var todaysDate = new Date();
    // Getting today's date before regular season starts
    if( ( todaysDate.getTime() <= new Date("2018-10-16").getTime() ) ) 
    {
        return "2018-10-16";
    }
    else
    {
        return todaysDate.getFullYear() + "-" + ( todaysDate.getMonth() + 1 ) + "-" + todaysDate.getDate();
    }
}

/*
    removeGamesDataColumn - removes the game remaining cells
*/
function removeGamesDataColumn()
{
    console.log( "removeGamesDataColumn()" );
    var elements = document.getElementsByClassName( "fbw-new-element" );

    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}

/* ---------------------------------------------------------------------
                            Main Functions 
--------------------------------------------------------------------- */

/*
    addGamesWeekHeaders - adds the 'GR/G' header to the HTML of the page.
*/
function addWeekGamesHeaders( data )
{
    console.log( "addWeekGamesHeaders()" );
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
    addGamesDataToLocalDictionary - gets the games remaining data
    from the server and adds it to a local dictionary
*/
function addGamesDataToLocalDictionary( data, teamsRequestString )
{
    // Don't need to erase the local games info because the date doesn't change for free agents, can build onto
    // The data structure as I use it
    // localGamesDataDict = {};
    console.log( "addDataToLocalDictionary()" );
    var teamsRequestStringConcise = teamsRequestString.substring( 6, teamsRequestString.length-1 );
    var teamsList = teamsRequestStringConcise.split( "," );
    for( var i = 0; i < data.length; i++ )
    {
        localGamesDataDict[teamsList[i]] = data[i];
    }
    // console.log( localGamesDataDict );
}

/*
    addGamesForPlayers - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesForPlayers()
{
    console.log( "addGamesForPlayers()" );

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
                    newGamesTd.style.backgroundColor = getBackgroundColor( 0 );
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
    requestWeekNumberFromServer - requests the week number from the
    server and calls a function to add that data to the headers
*/
function requestWeekNumberFromServer()
{
    console.log( "requestWeekNumberFromServer()" );
    // Sleep before getting the date string to allow the selected date some time to be changed
    var dateRequestString = getFormattedTodaysDate();
    var url = "http://www.fantasywizard.site/getweek/?pageName=espnAddedDropped&format=json&date=" + dateRequestString;

    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }
        response.json().then(function(data) {
            var weekNum = data.weekNum;
            addWeekGamesHeaders( data );
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
/*
    requestDataFromServer - requests the game data from the server and
    calls functions to handle the data after it gets received
*/
async function requestDataFromServer()
{
    console.log( "requestDataFromServer()" );
    var teamsRequestString = buildTeamsRequestString(); 

    // Code did not find any new teams to request from the server
    if( teamsRequestString == "teams=" )
    {
        sleep( 4000 );
        addGamesForPlayers();
    }
    else
    {
        var dateRequestString = getFormattedTodaysDate();
        var url = "https://www.fantasywizard.site/gamesremaining/?pageName=espnAddedDropped&" + teamsRequestString + "&format=json&date=" + dateRequestString;
        console.log( url );

        fetch( url )
            .then( function( response )
            {
                if ( response.status !== 200 )
                {
                    console.log('Called to backend failed: ' + response.status );
                    return;
                }
                response.json().then( function( data )
                {
                    addGamesDataToLocalDictionary( data, teamsRequestString );
                    sleep( 4000 );
                    addGamesForPlayers();
                });
            }).catch( function( err )
            {
                console.log('Fetch Error :-S', err);
            });
    }
}


/* ---------------------------------------------------------------------
                            HTML Object Clicks 
--------------------------------------------------------------------- */

/*
    Changing pages
*/
$( 'body' ).on( 'click', 'label.control--radio', function() 
    var className = this.className;

    if( className.indexOf( "checked" ) == -1 )
    {
        removeGamesDataColumn();
        setTimeout( requestDataFromServer, 3000 );
    }
});

/* ---------------------------------------------------------------------
                            Document Ready 
--------------------------------------------------------------------- */
$( document ).ready( function()
{
    setTimeout( function(){
        requestWeekNumberFromServer();
        requestDataFromServer();
    }, 5000 );
});   