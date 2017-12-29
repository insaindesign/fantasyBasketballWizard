//Fantasy Basketball Wizard
//espn.js
//--------------------------------Schedule-------------------------------------
var Schedule = {};
//                       0                   1             *     2
//                       0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4
AtlantaHawks =          [3,4,3,3,3,4,2,4,3,4,3,3,3,3,4,4,4,3,4,3,3,4,3,4,1];
BostonCeltics =         [3,3,4,4,3,4,3,4,4,4,4,3,1,3,3,4,4,3,3,3,3,3,3,4,2];
BrooklynNets =          [3,4,2,4,3,3,3,3,4,3,4,3,4,4,3,4,3,3,4,3,3,4,3,3,2];
CharlotteHornets =      [2,4,4,2,3,4,2,4,4,4,3,2,3,3,4,4,4,4,4,3,3,4,4,3,1];
ChicagoBulls =          [2,3,3,3,3,4,3,4,3,4,4,4,3,3,4,2,3,4,3,4,3,4,4,3,2];
ClevelandCavaliers =    [3,4,3,3,3,3,4,4,4,2,3,3,3,3,3,3,4,4,3,4,3,4,4,3,2];
DallasMavericks =       [3,4,4,3,3,3,3,4,3,4,4,3,3,2,4,3,4,3,4,3,3,3,4,4,1];
DenverNuggets =         [2,4,4,3,3,3,3,4,3,4,3,3,4,3,3,4,3,4,3,4,3,3,4,3,2];
DetroitPistons =        [3,4,3,3,3,2,4,4,4,2,3,3,3,4,3,3,4,4,4,3,3,4,4,3,2];
GoldenStateWarriors =   [3,4,3,3,4,3,4,3,2,4,4,3,4,3,3,3,3,4,3,4,3,3,4,4,1];
HoustonRockets =        [3,4,4,3,3,2,3,2,4,3,4,3,3,3,4,3,4,4,3,4,4,4,3,3,2];
IndianaPacers =         [3,3,4,4,3,3,3,4,3,3,4,2,4,4,3,4,4,2,4,4,3,3,3,4,1];
LosAngelesClippers =    [2,3,4,3,3,3,4,2,4,4,3,3,4,3,4,2,3,4,4,3,4,4,4,3,2];
LosAngelesLakers =      [3,3,4,3,4,2,4,2,2,4,4,4,3,4,3,3,3,4,3,4,3,3,4,4,2];
MemphisGrizzlies =      [2,4,4,2,3,4,3,4,4,3,4,2,2,4,3,4,3,3,4,4,3,4,4,3,2];
MiamiHeat =             [2,3,4,4,3,3,4,2,4,4,3,3,3,4,3,4,3,4,3,4,3,4,3,3,2];
MilwaukeeBucks =        [3,3,3,3,3,3,3,4,3,3,3,4,4,3,3,4,3,4,4,3,3,4,4,3,2];
MinnesotaTimberwolves = [3,3,4,2,4,4,4,3,3,3,4,4,4,3,4,4,3,4,3,2,3,3,4,2,2];
NewOrleansPelicans =    [3,3,4,3,3,4,3,4,3,3,3,2,4,3,4,3,4,4,3,4,4,3,3,3,2];
NewYorkKnicks =         [2,3,4,3,3,4,3,4,3,3,4,4,3,4,3,4,3,4,3,3,3,4,3,3,2];
OklahomaCityThunder =   [3,3,3,4,2,4,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,3,3,2,2];
OrlandoMagic =          [3,3,4,3,3,4,4,4,3,3,3,3,3,3,2,3,4,4,4,4,3,3,3,4,2];
Philadelphia76ers =     [3,3,3,3,3,3,4,4,2,4,4,2,1,3,4,4,3,5,4,3,3,4,4,4,2];
PhoenixSuns =           [3,3,4,4,4,3,3,4,3,4,3,4,2,2,4,4,3,4,4,3,3,3,4,3,1];
PortlandTrailBlazers =  [3,3,4,2,4,4,3,2,4,4,2,4,4,3,3,4,4,3,3,3,4,3,4,3,2];
SacramentoKings =       [3,3,3,3,4,3,4,3,3,3,4,2,4,3,4,3,3,4,5,3,4,3,4,2,2];
SanAntonioSpurs =       [2,4,4,3,3,3,4,4,3,4,3,4,3,4,4,3,2,4,2,3,4,4,3,3,2];
TorontoRaptors =        [2,3,4,3,4,3,2,3,4,3,3,3,4,4,3,4,3,3,4,4,4,4,2,4,2];
UtahJazz =              [3,3,4,3,4,3,3,4,3,4,3,3,2,4,3,3,4,4,3,4,3,4,3,3,2];
WashingtonWizards =     [2,4,3,3,4,3,3,4,4,3,4,3,3,3,3,3,4,4,4,3,3,3,4,3,2];

Schedule["Atl"]  =  AtlantaHawks;
Schedule["Bos"]  =  BostonCeltics;
Schedule["Bkn"]  =  BrooklynNets;
Schedule["Cha"]  =  CharlotteHornets;
Schedule["Chi"]  =  ChicagoBulls;
Schedule["Cle"]  =  ClevelandCavaliers;
Schedule["Dal"]  =  DallasMavericks;
Schedule["Den"]  =  DenverNuggets;
Schedule["Det"]  =  DetroitPistons;
Schedule["GS"]   =  GoldenStateWarriors;
Schedule["Hou"]  =  HoustonRockets;
Schedule["Ind"]  =  IndianaPacers;
Schedule["LAC"]  =  LosAngelesClippers;
Schedule["LAL"]  =  LosAngelesLakers;
Schedule["Mem"]  =  MemphisGrizzlies;
Schedule["Mia"]  =  MiamiHeat;
Schedule["Mil"]  =  MilwaukeeBucks;
Schedule["Min"]  =  MinnesotaTimberwolves;
Schedule["Nor"]  =  NewOrleansPelicans;
Schedule["NY"]   =  NewYorkKnicks;
Schedule["OKC"]  =  OklahomaCityThunder;
Schedule["Orl"]  =  OrlandoMagic;
Schedule["Phi"]  =  Philadelphia76ers;
Schedule["Pho"]  =  PhoenixSuns;
Schedule["Por"]  =  PortlandTrailBlazers;
Schedule["Sac"]  =  SacramentoKings;
Schedule["SA"]   =  SanAntonioSpurs;
Schedule["Tor"]  =  TorontoRaptors;
Schedule["Utah"] =  UtahJazz;
Schedule["Wsh"]  =  WashingtonWizards;

getBackgroundColor = function( games ){
    if (games > 3){
        return "#adebad";
    } else if (games == 3){
        return "#d8ffcc";
    } else if (games == 2){
        return "#ffffcc";
    } else if (games == 1){
        return "#ffd6cc";
    } else {
        return "white";
    }
}

// getSelectedDate() - returns the date that is currently selected
// Returns either 'Today' or a date with ( Month (abbreviated) Day ) format
getSelectedDate = function()
{
    var selectedDate = document.getElementsByClassName( "date-on" );
    var selectedDateContent = selectedDate[0].innerText;
    return selectedDateContent;
}

getTodaysDate = function()
{
    var todaysDate = new Date();
    return todaysDate;
}

// Note: Month is 0-based. January = 0, December = 11.
getNbaWeek = function( pDate )
{
    if( ( pDate >= new Date( 2017, 9, 16 ) ) && ( pDate < new Date( 2017, 9, 23 ) ) ){ return 1; }
    else if( ( pDate >= new Date( 2017, 9, 23 ) ) && ( pDate < new Date( 2017, 9, 30 ) ) ){ return 2; }
    else if( ( pDate >= new Date( 2017, 9, 30 ) ) && ( pDate < new Date( 2017, 10, 6 ) ) ){ return 3; }
    else if( ( pDate >= new Date( 2017, 10, 6 ) ) && ( pDate < new Date( 2017, 10, 13 ) ) ){ return 4; }
    else if( ( pDate >= new Date( 2017, 10, 13 ) ) && ( pDate < new Date( 2017, 10, 20 ) ) ){ return 5; }
    else if( ( pDate >= new Date( 2017, 10, 20 ) ) && ( pDate < new Date( 2017, 10, 27 ) ) ){ return 6; }
    else if( ( pDate >= new Date( 2017, 10, 27 ) ) && ( pDate < new Date( 2017, 11, 4 ) ) ){ return 7; }
    else if( ( pDate >= new Date( 2017, 11, 4 ) ) && ( pDate < new Date( 2017, 11, 11 ) ) ){ return 8; }
    else if( ( pDate >= new Date( 2017, 11, 11 ) ) && ( pDate < new Date( 2017, 11, 18 ) ) ){ return 9; }
    else if( ( pDate >= new Date( 2017, 11, 18 ) ) && ( pDate < new Date( 2017, 11, 25 ) ) ){ return 10; }
    else if( ( pDate >= new Date( 2017, 11, 25 ) ) && ( pDate < new Date( 2018, 0, 1 ) ) ){ return 11; }
    else if( ( pDate >= new Date( 2018, 0, 1 ) ) && ( pDate < new Date( 2018, 0, 8 ) ) ){ return 12; }
    else if( ( pDate >= new Date( 2018, 0, 8 ) ) && ( pDate < new Date( 2018, 0, 15 ) ) ){ return 13; }
    else if( ( pDate >= new Date( 2018, 0, 15 ) ) && ( pDate < new Date( 2018, 0, 22 ) ) ){ return 14; }
    else if( ( pDate >= new Date( 2018, 0, 22 ) ) && ( pDate < new Date( 2018, 0, 29 ) ) ){ return 15; }
    else if( ( pDate >= new Date( 2018, 0, 29 ) ) && ( pDate < new Date( 2018, 1, 5 ) ) ){ return 16; }
    else if( ( pDate >= new Date( 2018, 1, 5 ) ) && ( pDate < new Date( 2018, 1, 12 ) ) ){ return 17; }
    else if( ( pDate >= new Date( 2018, 1, 12 ) ) && ( pDate < new Date( 2018, 1, 26 ) ) ){ return 18; }
    else if( ( pDate >= new Date( 2018, 1, 26 ) ) && ( pDate < new Date( 2018, 2, 5 ) ) ){ return 19; }
    else if( ( pDate >= new Date( 2018, 2, 5 ) ) && ( pDate < new Date( 2018, 2, 12 ) ) ){ return 20; }
    else if( ( pDate >= new Date( 2018, 2, 12 ) ) && ( pDate < new Date( 2018, 2, 19 ) ) ){ return 21; }
    else if( ( pDate >= new Date( 2018, 2, 19 ) ) && ( pDate < new Date( 2018, 2, 26 ) ) ){ return 22; }
    else if( ( pDate >= new Date( 2018, 2, 26 ) ) && ( pDate < new Date( 2018, 3, 2 ) ) ){ return 23; }
    else if( ( pDate >= new Date( 2018, 3, 2 ) ) && ( pDate < new Date( 2018, 3, 9 ) ) ){ return 24; }
    else if( ( pDate >= new Date( 2018, 3, 9 ) ) && ( pDate < new Date( 2018, 3, 16 ) ) ){ return 25; }
}

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

var currentUrl = window.location.href;
var espnMyTeamRegex = /http:\/\/?games[.]espn[.]com\/fba\/clubhouse\?leagueId=\d{1,10}&teamId=\d{1,2}&seasonId=\d{4}/;
var teamUrlMatch = currentUrl.match( espnMyTeamRegex );
var previousDateOn = document.getElementsByClassName( "date-on" );
var previousDateOnHtml = previousDateOn[0].innerHTML;
var initialLoad = true;
var dateRanges = false;

renderGames = function()
{
    console.log("Fantasy Wizard rendering...");
    
    // Date on = for Set your line up - for switching b/t Today and 'Dec 23'
    var newDateOn = document.getElementsByClassName( "date-on" );
    var newDateOnHtml = newDateOn[0].innerHTML;
    
    // Conditionals to allow renderGames to run on the correct situations
    if( ( previousDateOnHtml != newDateOnHtml ) || initialLoad || dateRanges )
    {
        initialLoad = false;
        
        // Counter for the total number of games for the entire team for that week
        var totalGames = 0;
        
        // 'GAMES' header
        var getPlayerTableSectionHeader = document.getElementsByClassName( "playertableSectionHeader" );
        for( var i = 0; i < getPlayerTableSectionHeader.length; i++ )
        {
            var newHeader = document.createElement( "th" );
            var newSectionLeadingSpacer = document.createElement( "td" );
            newHeader.innerHTML = "GAMES";
            newHeader.colSpan = 1;
            newSectionLeadingSpacer.className = "sectionLeadingSpacer";

            getPlayerTableSectionHeader[i].appendChild( newSectionLeadingSpacer );
            getPlayerTableSectionHeader[i].appendChild( newHeader );
        }
        // End of 'GAMES' header
        
        
        // 'TOTAL' subheader
        var getPlayerTableBgRowSubhead = document.getElementsByClassName( "playerTableBgRowSubhead" );
        for( var i = 0; i < getPlayerTableBgRowSubhead.length; i++ )
        {
            var newSubHeader = document.createElement( "td" );
            var newSectionLeadingSpacer = document.createElement( "td" );
            newSubHeader.className = "playertableData";
            newSubHeader.title = "Number of games for this week";
            newSubHeader.innerHTML = "TOTAL";
            newSectionLeadingSpacer.className = "sectionLeadingSpacer";
            getPlayerTableBgRowSubhead[i].appendChild( newSectionLeadingSpacer );
            getPlayerTableBgRowSubhead[i].appendChild( newSubHeader );
        }
        // End of 'TOTAL' subheader
        
        
        // Players with background 0
        // Creates an entry in the table for the number of games played by the player
        // for the respective week or a '--' for an empty row
        var playerTableBgRow0Items = document.getElementsByClassName( "playerTableBgRow0" );
        for( var i = 0; i < playerTableBgRow0Items.length; i++ )
        {
            var numberOfGames = document.createElement( "td" );
            var newSectionLeadingSpacer = document.createElement( "td" );
            numberOfGames.className = "playertableStat";
            newSectionLeadingSpacer.className = "sectionLeadingSpacer";

            // The HTML of the current player
            var dataHtml = playerTableBgRow0Items[i].innerHTML;

            if( dataHtml.indexOf( "<td>&nbsp;</td>" ) != -1 ) // Conditional - Empty row
            {
                numberOfGames.innerText = "--";
            }
            else if( dataHtml.indexOf( "</a>" ) != -1 ) // Conditional - Contains a link, so a player exists in the row
            {
                var splitPlayerTableBgRow0Items = dataHtml.split( "," );
                var teamName = splitPlayerTableBgRow0Items[1].substring( 1, splitPlayerTableBgRow0Items[1].indexOf( "&" ) );
                var selectedDate = getSelectedDate();
                
                if( selectedDate.indexOf( "Today" ) != -1 )
                {
                    var todaysDate = getTodaysDate();
                    var nbaWeek = getNbaWeek( todaysDate );
                    var games = Schedule[teamName][nbaWeek-1]; 
                    totalGames += games;
                    numberOfGames.style.backgroundColor = getBackgroundColor( games );
                    numberOfGames.innerHTML = games;
                }
                else
                {
                    var splitSelectedDate = selectedDate.split( ' ' );
                    var selectedMonth = splitSelectedDate[1];
                    var selectedDate = splitSelectedDate[2];
                    var date = setYourLineUpDateFormat( selectedMonth, selectedDate );
                    // Subtract 1 from nbaWeek because NBA weeks start counting at 1, where arrays are 0-based
                    var nbaWeek = getNbaWeek( date );
                    var games = Schedule[teamName][nbaWeek-1];
                    totalGames += games;
                    numberOfGames.style.backgroundColor = getBackgroundColor( games );
                    numberOfGames.innerHTML = games;
                }
            }
            playerTableBgRow0Items[i].appendChild( newSectionLeadingSpacer );
            playerTableBgRow0Items[i].appendChild( numberOfGames );
        }
        // End of players with background 0
        
        
        // Players with background 1
        // Creates an entry in the table for the number of games played by the player
        // for the respective week or a '--' for an empty row
        var playerTableBgRow1Items = document.getElementsByClassName( "playerTableBgRow1" );
        for( var i = 0; i < playerTableBgRow1Items.length; i++ )
        {
            var newSectionLeadingSpacer = document.createElement( "td" );
            var numberOfGames = document.createElement( "td" );
            newSectionLeadingSpacer.className = "sectionLeadingSpacer";
            numberOfGames.className = "playertableStat";
            
            var dataHtml = playerTableBgRow1Items[i].innerHTML;

            if( dataHtml.indexOf( "<td>&nbsp;</td>") != -1 )
            {
                // Add logic to clean up and add an empty cell
                numberOfGames.innerHTML = "--";
            }
            else if ( dataHtml.indexOf( "</a>" ) != -1 )
            {
                var splitPlayerTableBgRow1Items = dataHtml.split( "," );
                // Start substring at 1 because of the leading space
                var teamName = splitPlayerTableBgRow1Items[1].substring( 1, splitPlayerTableBgRow1Items[1].indexOf( "&" ) );
                var selectedDate = getSelectedDate();

                if( selectedDate.indexOf( "Today" ) != -1 )
                {
                    var todaysDate = getTodaysDate();
                    var nbaWeek = getNbaWeek( todaysDate );
                    var games = Schedule[teamName][nbaWeek-1];
                    totalGames += games;
                    numberOfGames.style.backgroundColor = getBackgroundColor( games );
                    numberOfGames.innerHTML = games;
                }
                else
                {
                    var splitSelectedDate = selectedDate.split( ' ' );
                    var selectedMonth = splitSelectedDate[1];
                    var selectedDate = splitSelectedDate[2];
                    var date = setYourLineUpDateFormat( selectedMonth, selectedDate );
                    var nbaWeek = getNbaWeek( date );
                    var games = Schedule[teamName][nbaWeek-1];
                    totalGames += games;
                    numberOfGames.style.backgroundColor = getBackgroundColor( games );
                    numberOfGames.innerHTML = games;
                }
            }
            playerTableBgRow1Items[i].appendChild( newSectionLeadingSpacer );
            playerTableBgRow1Items[i].appendChild( numberOfGames );
        }
        // End of players with background 1
        
        // Calculate total number of games for the whole team
        var rowTotals = document.getElementsByClassName( "playerTableBgRowTotals" );
        var gamesTotal = document.createElement( "td" );
        var totalsSectionLeadingSpace = document.createElement( "td" );
        gamesTotal.title = "The whole team's number of games for the week";
        totalsSectionLeadingSpace.className = "sectionLeadingSpacer";
        gamesTotal.innerHTML = totalGames;
        rowTotals[0].appendChild( totalsSectionLeadingSpace );
        rowTotals[0].appendChild( gamesTotal );
        dateRanges = false;
    }
    previousDateOnHtml = newDateOnHtml;
}

var refreshSleepTime = 700;

// Event listener for when a date in the top navigation bar with black background is clicked - Today, Weekday, Month Date
document.getElementsByClassName( "games-dates-mod" )[0].addEventListener( "click" , function() {
    setTimeout( () => {
        renderGames();
    }, refreshSleepTime );
});

// Event listener for navigating between 'Month Date', 'Last 7', 'Last 15', 'Last 30',
// '2018 Season', '2017', '2018 Projections'
$('div' ).on( 'click', ' .playertablefiltersmenucontainer', function( event ) {
    event.stopPropagation();
    var thisText = $( this ).text();
    if( 
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

if( currentUrl.indexOf( teamUrlMatch ) !== -1 )
{
    renderGames();
}