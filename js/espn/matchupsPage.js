/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    matchupsPage.js 
*/

/* ---------------------------------------------------------------------
                            Global Variables  
--------------------------------------------------------------------- */

var localGamesDataDict = {};

/* ---------------------------------------------------------------------
                            Helper Functions 
--------------------------------------------------------------------- */

/*
    buildLeagueIdRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildLeagueIdRequestString()
{
    console.log( "buildLeagueIdRequestString()" );
    var entireUrl = window.location.href;
    var url = new URL( entireUrl );
    var leagueId = url.searchParams.get( "leagueId" );
    var leagueIdRequestString = "leagueID=" + leagueId;
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
        teamsRequestString += listOfElements[ i ].innerHTML + ",";
    }
    return teamsRequestString;
}

/*
    buildDateRequestString - creates part of the url 
    for the teams to request game data for.
*/
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


/* ---------------------------------------------------------------------
                            Main Functions 
--------------------------------------------------------------------- */

/*
    addGamesDataToLocalDictionary - 
*/
function addGamesDataToLocalDictionary( data, teamsRequestString )
{
    console.log( "addDataToLocalDictionary()" );
    localGamesDataDict = {};
    var teamsRequestStringConcise = teamsRequestString.substring( 6, teamsRequestString.length-1 );
    var teamsList = teamsRequestStringConcise.split( "," );
    for( var i = 0; i < data.length; i++ )
    {
        localGamesDataDict[teamsList[i]] = data[i];
    }
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
    var url = "https://www.fantasywizard.site/gamesremaining/?pageName=espnMatchups&" + teamsRequestString + "&format=json&date=" + dateRequestString + "&" + leagueIdRequestString;
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

            if( leftTotalGamesRemaining > rightTotalGamesRemaining )
            {
                newLeftGamesDiv.style.color = "#acd888";
            }
            else if( rightTotalGamesRemaining > leftTotalGamesRemaining )
            {
                newRightGamesDiv.style.color = "#acd888";
            }
            else if( leftTotalGamesRemaining == rightTotalGamesRemaining ){}
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

$( 'body' ).on( 'change', 'select.dropdown__select', function() 
{
    removeEntireColumn();
    requestGameDataFromServer();
});

$( 'body' ).on( 'click', 'li.carousel__slide', function() 
{
    var className = this.className;
    if( className.indexOf( "selected" ) == -1 )
    {
        removeEntireColumn();
        setTimeout( requestGameDataFromServer, 1000 );
    }
});

$( document ).ready( function()
{
    setTimeout( function()
    {
        // var documentReadyDate = $(".dropdown__select option:selected").text();
        // console.log( "documentReadyDate=" + documentReadyDate );
        requestGameDataFromServer();
    }, 5000 );
});