//Fantasy Basketball Wizard
//espn.js
//--------------------------------Schedule-------------------------------------

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
acronymEspnToYahoo["Nor"]  =  "NO";
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
        return "#ffd6cc";
    }
    // Injured players
    else if( games == 0 )
    {
        return "#ff7777";
    }
}

/* 
    getSelectedDate - returns the date that is currently selected.
    Returns either 'Today' or a date with ( Month (abbreviated) Day ) format.
*/
getSelectedDate = function()
{
    var selectedDate = document.getElementsByClassName( "date-on" );
    var selectedDateContent = selectedDate[0].innerText;
    return selectedDateContent;
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
    setYourLineUpDateFormat - returns a Date object with the month and date as inputs.

    pMonth - Month as a string
    pDate - Date as a string
*/
setYourLineUpDateFormat = function( pMonth, pDate )
{
    if( pMonth == "Oct" ){ return new Date( 2017, 9, pDate ); }
    else if( pMonth == "Nov" ){ return new Date( 2017, 10, pDate ); }
    else if( pMonth == "Dec" ){ return new Date( 2017, 11, pDate ); }
    else if( pMonth == "Jan" ){ return new Date( 2018, 0, pDate ); }
    else if( pMonth == "Feb" ){ return new Date( 2018, 1, pDate ); }
    else if( pMonth == "Mar" ){ return new Date( 2018, 2, pDate ); }
    else if( pMonth == "Apr" ){ return new Date( 2018, 3, pDate ); }
}

/*
    addGamesWeekHeaders - adds the 'GAMES' and 'WEEK' headers to the HTML of the page.
*/
function addGamesWeekHeaders()
{
    console.log( "addGamesWeekHeaders()" );
    // Maybe loop through these elements and if innerHTML contains STATUS then append
    var listOfElements = document.getElementsByClassName( "Table2__header-row" );

    for( var i = 0; i < listOfElements.length; i++ )
    {
        if( listOfElements[i].innerHTML.indexOf( "STARTERS" ) != -1 )
        {
            var newGamesHeader = document.createElement( "th" );
            newGamesHeader.title = "GAMES";
            newGamesHeader.colSpan = "1";
            newGamesHeader.className = "tc bg-clr-white Table2__th";
            newGamesHeader.innerHTML = "GAMES";
            listOfElements[i].appendChild( newGamesHeader );
        }
        else if( listOfElements[i].innerHTML.indexOf( "STATUS" ) != -1 )
        {
            var newGamesHeader = document.createElement( "th" );
            newGamesHeader.title = "WEEK";
            newGamesHeader.colSpan = "1";
            newGamesHeader.className = "tc bg-clr-white Table2__th";
            newGamesHeader.innerHTML = "WEEK";
            listOfElements[i].appendChild( newGamesHeader );
        }
    }
}

// function wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }
    // wait( 1000 );




var localGamesDataDict = {};

function buildTeamsRequestString()
{
    console.log( "buildTeamsRequestString()" );

    var listOfElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var teamsRequestString = "teams=";
    for( var i = 0; i < listOfElements.length; i++ )
    {
        teamsRequestString += acronymEspnToYahoo[listOfElements[i].innerHTML] + ",";
    }
    // console.log( teamsRequestString );
    return teamsRequestString;
}

function getSelectedDate()
{
    console.log( "getSelectedDate()" ); 
    var currentElements = document.getElementsByClassName( "is-current" );
    console.log( currentElements[0] );
    var currentDateDiv = currentElements[0];
    var currentDate = currentDateDiv.children[0];
    console.log( "currentDate.innerHTML=" + currentDate.innerHTML );
}



function requestDataFromServer()
{
    console.log( "requestDataFromServer()" );

    var teamsRequestString = buildTeamsRequestString();
    console.log( "teamsRequestString=" + teamsRequestString );
    var dateString = "2018-10-16";
    // var url = 'https://bilalsattar24.pythonanywhere.com/gamesremaining/?'+teamsRequestString+'&format=json&date='+dateString;
    var url = "http://www.fantasywizard.site/gamesremaining/?" + teamsRequestString + "&format=json&date=" + dateString;
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
    console.log( "addDataToLocalDictionary()" );
    // console.log( data );
    // console.log( teamsRequestString );
    var teamsRequestStringConcise = teamsRequestString.substring( 6, teamsRequestString.length-1 );
    var teamsList = teamsRequestStringConcise.split( "," );
    // console.log( teamsList );
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

var initialRender = false;

function addGamesForPlayers( )
{
    console.log( "addGamesForPlayers()" );

    var listOfElements = document.getElementsByClassName( "Table2__tr--lg" );
    var totalGamesRemaining = 0;
    var totalGamesForWeek = 0;

    var listOfTeamNameElements = document.getElementsByClassName( "playerinfo__playerteam" );
    var listOfTeamNameElementsIndex = 0;

    if( initialRender == false )
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

                var isInjured = false;
                // 'O'ut, injured player
                if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
                {
                    isInjured = true;
                }
                // TOTALS row
                if( listOfElementsTr.innerHTML.indexOf( ">TOTALS</div>" ) != -1 )
                {
                    // console.log( "WORKING ON TOTALS" );
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
                        // console.log( "adding games/games" );
                        // newGamesDiv.innerHTML = data[index];
                        var teamName = acronymEspnToYahoo[ listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML ];
                        // console.log( "localGamesDataDict[listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML]=" + localGamesDataDict[teamName] );
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
                    // index++;
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
        initialRender = true;
    }
    // Not initial render, do not create new elements, update them
    else
    {
        var listOfGamesTd = document.getElementsByClassName( "fbw-games-remaining-td" );
        var listOfGamesDiv = document.getElementsByClassName( "fbw-games-remaining-div" );
        var listOfGamesIndex = 0;
        var backendIndex = 0;
        console.log( "listOfGamesDiv.length=" + listOfGamesDiv.length );


        for( var i = 0; i < listOfElements.length; i++ )
        {
            var listOfElementsTr = listOfElements[i];

            if( listOfElementsTr.children.length == 6 )
            {
                console.log( "in the 6 with my woes" );

                // See if the cell is empty
                // If the cell is total
                // if injured player


                var isInjured = false;
                // 'O'ut, injured player
                if( listOfElementsTr.innerHTML.indexOf( "injury-status_medium\">O" ) != -1 )
                {
                    // console.log( "found injured" );
                    isInjured = true;
                }
                // TOTALS row
                if( listOfElementsTr.innerHTML.indexOf( ">TOTALS</div>" ) != -1 )
                {
                    // console.log( "TOTALSZZZZZ" );
                    var totalGamesString = totalGamesRemaining.toString() + "/" + totalGamesForWeek.toString();
                    listOfGamesDiv[listOfGamesIndex].innerHTML = totalGamesString;
                }
                // // Normal player
                else if( listOfElementsTr.innerHTML.indexOf( "player-column__empty" ) == -1 )
                {
                    // console.log( "healthy player" );
                    
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
                    // console.log( "injured player" );
                    listOfGamesDiv[listOfGamesIndex].innerHTML = "-/-";
                    listOfGamesTd[listOfGamesIndex].style.backgroundColor = getBackgroundColor( 0 );
                }
                listOfGamesIndex++;
            }
        }
    }
}

// Adjusting the roster by moving players around
// Requires a call to render to load the correct games
$( 'body' ).on( 'click', 'a.move-action-btn', function() 
{
    // event.stopPropagation();
    // var thisText = $( this ).text();
    // console.log( "Move button pressed@@@@" );
    // console.log( $( this ).text() );

    if( $( this ).text() == "HERE" )
    {
        requestDataFromServer();
    }
    // if( pageType == "Roster" &&
    //     thisText != "Last 7" &&
    //     thisText != "Last 15" &&
    //     thisText != "Last 30" &&
    //     thisText != "2018 Season" &&
    //     thisText != "2017" &&
    //     thisText != "2018 Projections"
    //   )
    // {
    //     dateRanges = true;
    //     setTimeout( () => {
    //         renderGames();
    //     }, refreshSleepTime );
    // }
});





/*
    myTeamRoster - Calls other functions to add the 'GAMES' header, 'TOTAL'
    subheader, and the number of games for players. 
*/
myTeamRoster = function()
{
    // Date on = for Set your line up - for switching b/t Today and 'Dec 23'
    var newDateOn = document.getElementsByClassName( "date-on" );
    var newDateOnHtml = newDateOn[0].innerHTML;
    
    // Conditionals to allow renderGames to run on the correct situations
    if( ( previousDateOnHtml != newDateOnHtml ) || initialLoad || dateRanges )
    {
        initialLoad = false;
        // Counter for the total number of games for the entire team for that week
        
        addGamesHeader();
        
        addTotalSubheader();
        
        addGamesForPlayers();

        dateRanges = false;
    }
    previousDateOnHtml = newDateOnHtml;
}

//if( pageType == "Roster")
//{
//    var previousDateOn = document.getElementsByClassName( "date-on" );
//    var previousDateOnHtml = previousDateOn[0].innerHTML;
//    var initialLoad = true;
//    var dateRanges = false;
//    var dailyLockLeague = false;
//}

/*
    renderGames - the main function containing the logic to add:
    1) 'GAMES' header
    2) 'TOTAL' subheader
    3) The number of games per week for a player
        i) '--' for empty player row or free agents
    4) Total number of games for the entire team for the week
*/
renderGames = function()
{
    console.log("Fantasy Wizard rendering...");

    // if( pageType == "Roster" )
    // {
    //     myTeamRoster();
    // }
    addGamesWeekHeaders();
    requestDataFromServer();
}

var refreshSleepTime = 700;

/*
    Event listener for when a date in the top navigation bar with the 
    black background is clicked - Today, Weekday, Month Date
*/
//if( pageType == "Roster" )
//{
//    document.getElementsByClassName( "games-dates-mod" )[0].addEventListener( "click" , function() {
//        setTimeout( () => {
//            renderGames();
//        }, refreshSleepTime );
//    });
//}

/*
    Event listener for navigating between 'Month Date', 'Last 7',
    'Last 15', 'Last 30', '2018 Season', '2017', '2018 Projections'
*/
$('div' ).on( 'click', ' .playertablefiltersmenucontainer', function( event ) {
    event.stopPropagation();
    var thisText = $( this ).text();
    if( pageType == "Roster" &&
        thisText != "Last 7" &&
        thisText != "Last 15" &&
        thisText != "Last 30" &&
        thisText != "2018 Season" &&
        thisText != "2017" &&
        thisText != "2018 Projections"
      )
    {
        dateRanges = true;
        setTimeout( () => {
            renderGames();
        }, refreshSleepTime );
    }
});


/*
    Main load of calling render games when the document is ready.
    Note: Have to wait a few seconds to load this dynamic page, otherwise it will not find any elements. 
*/
$( document ).ready( function(){
    // renderGames();
    console.log( "TEST" );
    console.log('before');
    setTimeout(function(){
        console.log('after');
        renderGames();
    },5000);
    
});
