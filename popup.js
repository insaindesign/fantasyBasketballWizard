//Fantasy Basketball Helper
//popup.js
//--------------------------------Schedule-------------------------------------
var Schedule = {}

AtlantaHawks = [3,4,3,3,3,4,2,4,3,4,3,3,3,3,4,4,4,3,4,3,3,4,3,4,1]
BostonCeltics = [3,3,4,4,3,4,3,4,4,4,4,3,1,3,3,4,4,3,3,3,3,3,3,4,2]
BrooklynNets = [3,4,2,4,3,3,3,3,4,3,4,3,4,4,3,4,3,3,4,3,3,4,3,3,2]
CharlotteHornets = [2,4,4,2,3,4,2,4,4,4,3,2,3,3,4,4,4,4,4,3,3,4,4,3,1]
ChicagoBulls = [2,3,3,3,3,4,3,4,3,4,4,4,3,3,4,2,3,4,3,4,3,4,4,3,2]
ClevelandCavaliers = [3,4,3,3,3,3,4,4,4,2,3,3,3,3,3,3,4,4,3,4,3,4,4,3,2]
DallasMavericks = [3,4,4,3,3,3,3,4,3,4,4,3,3,2,4,3,4,3,4,3,3,3,4,4,1]
DenverNuggets = [2,4,4,3,3,3,3,4,3,4,3,3,4,3,3,4,3,4,3,4,3,3,4,3,2]
DetroitPistons = [3,4,3,3,3,2,4,4,4,2,3,3,3,4,3,3,4,4,4,3,3,4,4,3,2]
GoldenStateWarriors = [3,4,3,3,4,3,4,3,2,4,4,3,4,3,3,3,3,4,3,4,3,3,4,4,1]
HoustonRockets = [3,4,4,3,3,2,3,2,4,3,4,3,3,3,4,3,4,4,3,4,4,4,3,3,2]
IndianaPacers = [3,3,4,4,3,3,3,4,3,3,4,2,4,4,3,4,4,2,4,4,3,3,3,4,1]
LosAngelesClippers = [2,3,4,3,3,3,4,2,4,4,3,3,4,3,4,2,3,4,4,3,4,4,4,3,2]
LosAngelesLakers = [3,3,4,3,4,2,4,2,2,4,4,4,3,4,3,3,3,4,3,4,3,3,4,4,2]
MemphisGrizzlies = [2,4,4,2,3,4,3,4,4,3,4,2,2,4,3,4,3,3,4,4,3,4,4,3,2]
MiamiHeat = [2,3,4,4,3,3,4,2,4,4,3,3,3,4,3,4,3,4,3,4,3,4,3,3,2]
MilwaukeeBucks = [3,3,3,3,3,3,3,4,3,3,3,4,4,3,3,4,3,4,4,3,3,4,4,3,2]
MinnesotaTimberwolves = [3,3,4,2,4,4,4,3,3,3,4,4,4,3,4,4,3,4,3,2,3,3,4,2,2]
NewOrleansPelicans = [3,3,4,3,3,4,3,4,3,3,3,2,4,3,4,3,4,4,3,4,4,3,3,3,2]
NewYorkKnicks = [2,3,4,3,3,4,3,4,3,3,4,4,3,4,3,4,3,4,3,3,3,4,3,3,2]
OklahomaCityThunder = [3,3,3,4,2,4,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,3,3,2,2]
OrlandoMagic = [3,3,4,3,3,4,4,4,3,3,3,3,3,3,2,3,4,4,4,4,3,3,3,4,2]
Philadelphia76ers = [3,3,3,3,3,3,4,4,2,4,4,2,1,3,4,4,3,5,4,3,3,4,4,4,2]
PhoenixSuns = [3,3,4,4,4,3,3,4,3,4,3,4,2,2,4,4,3,4,4,3,3,3,4,3,1]
PortlandTrailBlazers = [3,3,4,2,4,4,3,2,4,4,2,4,4,3,3,4,4,3,3,3,4,3,4,3,2]
SacramentoKings = [3,3,3,3,4,3,4,3,3,3,4,2,4,3,4,3,3,4,5,3,4,3,4,2,2]
SanAntonioSpurs = [2,4,4,3,3,3,4,4,3,4,3,4,3,4,4,3,2,4,2,3,4,4,3,3,2]
TorontoRaptors = [2,3,4,3,4,3,2,3,4,3,3,3,4,4,3,4,3,3,4,4,4,4,2,4,2]
UtahJazz = [3,3,4,3,4,3,3,4,3,4,3,3,2,4,3,3,4,4,3,4,3,4,3,3,2]
WashingtonWizards = [2,4,3,3,4,3,3,4,4,3,4,3,3,3,3,3,4,4,4,3,3,3,4,3,2]

Schedule["Atl"] = AtlantaHawks
Schedule["Bos"] = BostonCeltics
Schedule["Bkn"] = BrooklynNets
Schedule["Cha"] = CharlotteHornets
Schedule["Chi"] = ChicagoBulls
Schedule["Cle"] = ClevelandCavaliers
Schedule["Dal"] = DallasMavericks
Schedule["Den"] = DenverNuggets
Schedule["Det"] = DetroitPistons
Schedule["GS"] = GoldenStateWarriors
Schedule["Hou"] = HoustonRockets
Schedule["Ind"] = IndianaPacers
Schedule["LAC"] = LosAngelesClippers
Schedule["LAL"] = LosAngelesLakers
Schedule["Mem"] = MemphisGrizzlies
Schedule["Mia"] = MiamiHeat
Schedule["Mil"] = MilwaukeeBucks
Schedule["Min"] = MinnesotaTimberwolves
Schedule["NO"] = NewOrleansPelicans
Schedule["NY"] = NewYorkKnicks
Schedule["OKC"] = OklahomaCityThunder
Schedule["Orl"] = OrlandoMagic
Schedule["Phi"] = Philadelphia76ers
Schedule["Pho"] = PhoenixSuns
Schedule["Por"] = PortlandTrailBlazers
Schedule["Sac"] = SacramentoKings
Schedule["SA"] = SanAntonioSpurs
Schedule["Tor"] = TorontoRaptors
Schedule["Uta"] = UtahJazz
Schedule["Was"] = WashingtonWizards
//-----------------------------------------------------------------------------

//get week of year
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

var week = (new Date()).getWeek();
elements = document.getElementsByClassName("Block Mbot-xs Fz-xxs F-shade Uppercase");
versusString = elements[0].innerText;
arr = versusString.split(" ");
var fantasyWeek = arr[1]-1;
//Handles matchup week
//var fantasyWeek = week - 42 - 1;

//console.log(fantasyWeek);

function getColor(games){
    if (games > 3){
        return "#adebad"
    } else if (games == 3){
        return "#d8ffcc"
    } else if (games == 2){
        return "#ffffcc"
    } else if (games == 1){
        return "#ffd6cc"
    } else {
        return "white"
    }
    
}

function render() {

    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    num_rows = table.rows.length;
    
    for (var i = 2; i < num_rows; i++){
        if (!table.rows[i].cells[2].innerText.includes("(Empty)")){
            first_player_row = i;
            break;
        }
    }
    
    console.log(first_player_row)
    
    //find player column
    th = table.rows[first_player_row];
    for (var i = 0; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes("Player"))
            player_col = i;
    }
    
    //find fantasy column
    th = table.rows[first_player_row];
    console.log(th.innerText)
    for (var i = 6; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes("-")){
            fantasy_col = i + 1;
            break;
        }
    }

    //replace Fantasy headers
    table.rows[0].cells[6].innerText = "Games";
    //table.rows[1].cells[6].innerText = "Remaining"; coming soon ;)
    table.rows[1].cells[8].innerText = "Total";
    
    //read team names, write games
    row = 2;
    totalGames = 0;
    info = table.rows[row].cells[player_col].innerText.split(" ");
    cellText = table.rows[row].cells[player_col].innerText;
    while (!cellText.includes("Starting Lineup Totals")){
        //console.log(info)
        if (!cellText.includes("Empty") && !table.rows[row].cells[0].innerText.includes("IL")){
            games = Schedule[info[info.length - 3]][fantasyWeek];
            table.rows[row].cells[fantasy_col].innerText = games;
            table.rows[row].cells[fantasy_col].style.backgroundColor = getColor(games)
            totalGames += games;
//
            
        } else {
            table.rows[row].cells[fantasy_col].innerText = "-"
        }
        row++;
        cellText = table.rows[row].cells[player_col].innerText;
        info = table.rows[row].cells[player_col].innerText.split(" ");
        //console.log(cellText);  
    }
    //add total # of games
    table.rows[row].cells[fantasy_col].innerText = totalGames;
    table.rows[row].cells[fantasy_col].className = "Alt Ta-end Nowrap Bdrend"
    //console.log(table.rows[row]);
    //console.log(info); 
}
var currentUrl = window.location.href;
var myTeamRegex = /https?:\/\/basketball[.]fantasysports[.]yahoo[.]com\/nba\/\d{3,7}\/\d{1,2}/;
var urlMatch = currentUrl.match(myTeamRegex);
if (currentUrl.indexOf(urlMatch) !== -1) {
    render();
}
