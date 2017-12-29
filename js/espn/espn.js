//Fantasy Basketball Wizard
//espn.js
//--------------------------------Schedule-------------------------------------
var Schedule = {}

//                       0                   1               *   2
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
SanAntonioSpurs =       [2,4,4,3,3,3,4,4,3,4,3,4,3,4,4,3,2,2,4,3,4,4,3,3,2];
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

var currentUrl = window.location.href;
var espnMyTeamRegex = /http:\/\/?games[.]espn[.]com\/fba\/clubhouse\?leagueId=\d{1,10}&teamId=\d{1,2}&seasonId=\d{4}/;
var teamUrlMatch = currentUrl.match( espnMyTeamRegex );

renderGames = function()
{
    console.log( "Fantasy Wizard rendering..." );  

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
}

if( currentUrl.indexOf( teamUrlMatch ) !== -1 )
{
    renderGames();
}