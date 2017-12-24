//researchPage.js
//Populates transaction trends panel on research page with number of games for the week
//--------------------------------Schedule-------------------------------------
var Schedule = {};

AtlantaHawks = [3,4,3,3,3,4,2,4,3,4,3,3,3,3,4,4,4,3,4,3,3,4,3,4,1];
BostonCeltics = [3,3,4,4,3,4,3,4,4,4,4,3,1,3,3,4,4,3,3,3,3,3,3,4,2];
BrooklynNets = [3,4,2,4,3,3,3,3,4,3,4,3,4,4,3,4,3,3,4,3,3,4,3,3,2];
CharlotteHornets = [2,4,4,2,3,4,2,4,4,4,3,2,3,3,4,4,4,4,4,3,3,4,4,3,1];
ChicagoBulls = [2,3,3,3,3,4,3,4,3,4,4,4,3,3,4,2,3,4,3,4,3,4,4,3,2];
ClevelandCavaliers = [3,4,3,3,3,3,4,4,4,2,3,3,3,3,3,3,4,4,3,4,3,4,4,3,2];
DallasMavericks = [3,4,4,3,3,3,3,4,3,4,4,3,3,2,4,3,4,3,4,3,3,3,4,4,1];
DenverNuggets = [2,4,4,3,3,3,3,4,3,4,3,3,4,3,3,4,3,4,3,4,3,3,4,3,2];
DetroitPistons = [3,4,3,3,3,2,4,4,4,2,3,3,3,4,3,3,4,4,4,3,3,4,4,3,2];
GoldenStateWarriors = [3,4,3,3,4,3,4,3,2,4,4,3,4,3,3,3,3,4,3,4,3,3,4,4,1];
HoustonRockets = [3,4,4,3,3,2,3,2,4,3,4,3,3,3,4,3,4,4,3,4,4,4,3,3,2];
IndianaPacers = [3,3,4,4,3,3,3,4,3,3,4,2,4,4,3,4,4,2,4,4,3,3,3,4,1];
LosAngelesClippers = [2,3,4,3,3,3,4,2,4,4,3,3,4,3,4,2,3,4,4,3,4,4,4,3,2];
LosAngelesLakers = [3,3,4,3,4,2,4,2,2,4,4,4,3,4,3,3,3,4,3,4,3,3,4,4,2];
MemphisGrizzlies = [2,4,4,2,3,4,3,4,4,3,4,2,2,4,3,4,3,3,4,4,3,4,4,3,2];
MiamiHeat = [2,3,4,4,3,3,4,2,4,4,3,3,3,4,3,4,3,4,3,4,3,4,3,3,2];
MilwaukeeBucks = [3,3,3,3,3,3,3,4,3,3,3,4,4,3,3,4,3,4,4,3,3,4,4,3,2];
MinnesotaTimberwolves = [3,3,4,2,4,4,4,3,3,3,4,4,4,3,4,4,3,4,3,2,3,3,4,2,2];
NewOrleansPelicans = [3,3,4,3,3,4,3,4,3,3,3,2,4,3,4,3,4,4,3,4,4,3,3,3,2];
NewYorkKnicks = [2,3,4,3,3,4,3,4,3,3,4,4,3,4,3,4,3,4,3,3,3,4,3,3,2];
OklahomaCityThunder = [3,3,3,4,2,4,3,3,4,4,4,3,3,3,4,4,3,4,4,3,4,3,3,2,2];
OrlandoMagic = [3,3,4,3,3,4,4,4,3,3,3,3,3,3,2,3,4,4,4,4,3,3,3,4,2];
Philadelphia76ers = [3,3,3,3,3,3,4,4,2,4,4,2,1,3,4,4,3,5,4,3,3,4,4,4,2];
PhoenixSuns = [3,3,4,4,4,3,3,4,3,4,3,4,2,2,4,4,3,4,4,3,3,3,4,3,1];;
PortlandTrailBlazers = [3,3,4,2,4,4,3,2,4,4,2,4,4,3,3,4,4,3,3,3,4,3,4,3,2]
SacramentoKings = [3,3,3,3,4,3,4,3,3,3,4,2,4,3,4,3,3,4,5,3,4,3,4,2,2];
SanAntonioSpurs = [2,4,4,3,3,3,4,4,3,4,3,4,3,4,4,3,2,4,2,3,4,4,3,3,2];
TorontoRaptors = [2,3,4,3,4,3,2,3,4,3,3,3,4,4,3,4,3,3,4,4,4,4,2,4,2];
UtahJazz = [3,3,4,3,4,3,3,4,3,4,3,3,2,4,3,3,4,4,3,4,3,4,3,3,2];
WashingtonWizards = [2,4,3,3,4,3,3,4,4,3,4,3,3,3,3,3,4,4,4,3,3,3,4,3,2];

Schedule["Atl"] = AtlantaHawks;
Schedule["Bos"] = BostonCeltics;
Schedule["Bkn"] = BrooklynNets;
Schedule["Cha"] = CharlotteHornets;
Schedule["Chi"] = ChicagoBulls;
Schedule["Cle"] = ClevelandCavaliers;
Schedule["Dal"] = DallasMavericks;
Schedule["Den"] = DenverNuggets;
Schedule["Det"] = DetroitPistons;
Schedule["GS"] = GoldenStateWarriors;
Schedule["Hou"] = HoustonRockets;
Schedule["Ind"] = IndianaPacers;
Schedule["LAC"] = LosAngelesClippers;
Schedule["LAL"] = LosAngelesLakers;
Schedule["Mem"] = MemphisGrizzlies;
Schedule["Mia"] = MiamiHeat;
Schedule["Mil"] = MilwaukeeBucks;
Schedule["Min"] = MinnesotaTimberwolves;
Schedule["NO"] = NewOrleansPelicans;
Schedule["NY"] = NewYorkKnicks;
Schedule["OKC"] = OklahomaCityThunder;
Schedule["Orl"] = OrlandoMagic;
Schedule["Phi"] = Philadelphia76ers;
Schedule["Pho"] = PhoenixSuns;
Schedule["Por"] = PortlandTrailBlazers;
Schedule["Sac"] = SacramentoKings;
Schedule["SA"] = SanAntonioSpurs;
Schedule["Tor"] = TorontoRaptors;
Schedule["Uta"] = UtahJazz;
Schedule["Was"] = WashingtonWizards;

Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"];


//--------Colors-----------
var lowColor = "#ffffcc";
var medColor = "#d8ffcc";
var highColor = "#adebad";
var whiteColor = "white";
var borderColor = "#e7e7e7";


//get week of year
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

//determine color based on number of games
function getColor(games){
    if (games > 3){
        return highColor;
    } else if (games == 3){
        return medColor;
    } else if (games == 2){
        return lowColor;
    } else if (games == 1){
        return lowColor;
    } else {
        return whiteColor;
    }
}
function renderGames() {
    var table = document.getElementById("buzzindextable");
    var gpHeader = document.createElement("th");
    var gpCell = table.rows[0].appendChild(gpHeader);
    var team;
    var weekNum = 9;
    var numGames;
    var rows = table.rows;
    var playerInfo;

    gpHeader.innerText = "GP";

    //go through rows of table
    for(var i=1; i<rows.length; i++) {
        //grab all text from the <td> that includes the team/player name
        playerInfo = rows[i].cells[1].innerText.split(" ");

        //check values from that <td> to values from the Teams array to find the team abbreviation
        for(var j=0; j<Teams.length; j++) {
            if(Teams.includes(playerInfo[j])) {
                team = playerInfo[j];
                break;
            }
        }

        //create new cell and fill with proper attributes/data
        newCell = rows[i].insertCell(6);
        rows[i].cells[5].setAttribute("class", "Bdrend");
        newCell.style.border.color = borderColor;
        numGames = Schedule[team][weekNum];
        newCell.innerText = numGames;
        newCell.style.backgroundColor = getColor(numGames);
    }
}
renderGames();