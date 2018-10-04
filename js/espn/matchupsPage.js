/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    matchupsPage.js 
*/

/* ----------------------------------------------
                Global Variables  
---------------------------------------------- */
var acronymEspnToYahoo = {};
var localGamesDataDict = {};

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
    buildTeamsRequestString - creates part of the url 
    for the teams to request game data for.
*/
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

function buildDateRequestString()
{
    console.log( "buildDateRequestString()" );
    var dateElements = document.getElementsByClassName( "dropdown__select" );
    var dateElement = dateElements[0];
    var selectedDate = dateElement[dateElement.selectedIndex].text;
    var selectedDateSplit = selectedDate.split( " " );
    var month = selectedDateSplit[0];
    var date = selectedDateSplit[1];
    console.log( "selectedDate=" + selectedDate + ", month=" + month + ", date=" + date );

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
    addGamesDataToLocalDictionary - 
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
        if( localGamesDataDict[teamsList[i]] == "" )
        {
            localGamesDataDict[teamsList[i]] = data[i];
        }
    }
    console.log( localGamesDataDict );
}

/*
    requestGameDataFromServer
*/
function requestGameDataFromServer()
{
    console.log( "requestGameDataFromServer()" );

    var teamsRequestString = buildTeamsRequestString();
    var dateRequestString = buildDateRequestString();
    var leagueIdRequestString = buildLeagueIdRequestString();
    console.log( "teamsRequestString=" + teamsRequestString );
    console.log( "dateRequestString=" + dateRequestString );
    console.log( "leagueIdRequestString=" + leagueIdRequestString );
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
            addGamesDataToLocalDictionary( data, teamsRequestString );
            addGamesForPlayers();
        });
    }).catch( function( err ) {
        console.log( 'Fetch Error :-S', err );
    });
}

/*
    addGamesForPlayers - 
*/
function addGamesForPlayers()
{
    console.log( "addGamesForPlayers()" );
}

$( 'body' ).on( 'click', 'select.dropdown__select', function() 
{
    // console.log( $(".dropdown__select option:selected").text() );
    console.log( "option clicked" );
    // getDate();
    requestGameDataFromServer();
});

$( document ).ready( function()
{
    setTimeout( function()
    {
        buildDateRequestString();
        // var documentReadyDate = $(".dropdown__select option:selected").text();
        // console.log( "documentReadyDate=" + documentReadyDate );
        requestGameDataFromServer();
    }, 5000 );
});

