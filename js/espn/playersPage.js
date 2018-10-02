/*
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports

    playersPage.js
*/

var acronymEspnToYahoo = {};
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

var localGamesDataDict = {};

function sleep( ms )
{
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

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

function requestWeekNumberFromServer()
{
    console.log( "requestWeekNumberFromServer()" );
    // Sleep before getting the date string to allow the selected date some time to be changed
    var dateRequestString = getFormattedTodaysDate();
    var url = "http://www.fantasywizard.site/getweek/?&format=json&date=" + dateRequestString;

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
    addGamesWeekHeaders - adds the 'GAMES' and 'WEEK' headers to the HTML of the page.
*/
function addWeekGamesHeaders( data )
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

function buildTeamsRequestString()
{
    console.log( "buildTeamsRequestString()" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    for( var i = 0; i < listOfElements.length; i++ )
    {
        if( !( acronymEspnToYahoo[ listOfElements[ i ].innerHTML ] in localGamesDataDict ) )
        {
            localGamesDataDict[ acronymEspnToYahoo[ listOfElements[ i ].innerHTML ] ] = "";
            teamsRequestString += acronymEspnToYahoo[ listOfElements[ i ].innerHTML ] + ",";
        }
    }
    return teamsRequestString;
}


function addGamesForPlayers()
{
    console.log( "addGamesForPlayers()" );

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
                    var teamName = acronymEspnToYahoo[ listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML ];
                    // console.log( "teamName=" + teamName );
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
        if( localGamesDataDict[teamsList[i]] == "" )
        {
            localGamesDataDict[teamsList[i]] = data[i];
        }
    }
    console.log( localGamesDataDict );
}

async function requestDataFromServer()
{
    console.log( "requestDataFromServer()" );
    await sleep( 3000 );
    var teamsRequestString = buildTeamsRequestString(); 

    // Code did not find any new teams to request from the server
    if( teamsRequestString == "teams=" )
    {
        addGamesForPlayers();
    }
    else
    {
        var dateRequestString = getFormattedTodaysDate();
        var url = "https://www.fantasywizard.site/gamesremaining/?pageName=ePlayersPage&" + teamsRequestString + "&format=json&date=" + dateRequestString;
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
                    addGamesForPlayers();
                });
            }).catch( function( err )
            {
                console.log('Fetch Error :-S', err);
            });
    }
}

function removeColumn()
{
    console.log( "removeColumn()" );
    var elements = document.getElementsByClassName( "fbw-games-remaining-td" );

    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}

renderGames = function()
{
    console.log("Fantasy Wizard rendering...");

    requestWeekNumberFromServer();
    requestDataFromServer();
}



$( 'body' ).on( 'click', 'li.PaginationNav__list__item', function() 
{
    console.log( $( this ).text() ) ;
    var className = this.className;

    if( className.indexOf( "PaginationNav__list__item--active" ) == -1 )
    {
        removeColumn();
        requestDataFromServer();
    }
});

$( document ).ready( function()
{
    setTimeout(function(){
        renderGames();
    },5000);
});   
