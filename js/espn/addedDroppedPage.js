/*
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports

    playersPage.js
*/

/* ---------------------------------------------------------------------
                            Global Variables  
--------------------------------------------------------------------- */
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
        if( !( acronymEspnToYahoo[ listOfElements[ i ].innerHTML ] in localGamesDataDict ) )
        {
            localGamesDataDict[ acronymEspnToYahoo[ listOfElements[ i ].innerHTML ] ] = "";
            teamsRequestString += acronymEspnToYahoo[ listOfElements[ i ].innerHTML ] + ",";
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
        console.log( listOfElements[i] );

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
                    addGamesForPlayers();
                });
            }).catch( function( err )
            {
                console.log('Fetch Error :-S', err);
            });
    }
}

/* ---------------------------------------------------------------------
                            Document Ready 
--------------------------------------------------------------------- */
$( document ).ready( function()
{
    setTimeout( function(){
        requestWeekNumberFromServer();
        // requestDataFromServer();
    }, 5000 );
});   