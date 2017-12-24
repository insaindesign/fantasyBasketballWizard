//Fantasy Basketball Wizard
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

Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]

//Initialize Functions
//-----------------------------------------------------------------------------
var getColor = function(games){
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
//get week of year
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;
    
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    
    return indexOf.call(this, needle) > -1;
};

var get_first_row = function(){
    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    num_rows = table.rows.length;
    
    for (var i = 2; i < num_rows; i++){
        if (!table.rows[i].cells[2].innerText.includes("(Empty)")){
            return i;
        }
    }
}

var games_isset = false;
var AS_isset = false;

var currentUrl = window.location.href;
var myTeamRegex = /https?:\/\/basketball[.]fantasysports[.]yahoo[.]com\/nba\/\d{3,7}\/\d{1,2}/;
var teamURLMatch = currentUrl.match(myTeamRegex);
var week = (new Date()).getWeek();
elements = document.getElementsByClassName("Block Mbot-xs Fz-xxs F-shade Uppercase");
versusString = elements[0].innerText;
arr = versusString.split(" ");
var fantasyWeek = arr[1]-1;

week_row_name = "Projected Week Totals";

S_VIEW = 0;
P_VIEW = 1;
AS_VIEW = 2;

this_view = S_VIEW;

//Default Stats Tab
//-----------------------------------------------------------------------------
renderGames = function(from_view) {
    
    if (from_view != 0){
        console.log("from: ", from_view);
        console.log("this: ", this_view)
        if (from_view == this_view){
            console.log("same view!");
            return;
        }
        
        if (from_view != -1){
            console.log("not default");
            this_view = from_view;
        }
        
    }
    
    console.log("rendering games...")
    
    
    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    num_rows = table.rows.length;
    
    first_player_row = get_first_row();
    
    //find player column
    th = table.rows[first_player_row];
    for (var i = 0; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes("Player"))
            player_col = i;
    }
    
    fantasy_col = -1
    //find % Started column
    th = table.rows[first_player_row];
    for (var i = 5; i < th.cells.length; i++){
        //if (th.cells[i].innerText.includes("-") && th.cells[i].innerText.length < 3){
        if (th.cells[i].innerText.includes("%")){
            fantasy_col = i;
            //console.log("found!", i);
            break;
        }
    }
    
    if (fantasy_col == -1){
        for (var i = 5; i < th.cells.length; i++){
            if (th.cells[i].innerText.includes("-") && th.cells[i].innerText.length < 3){
                fantasy_col = i + 1;
                break;
            }
        }
    }
    

    //replace Fantasy headers
    //find Fantasy header column
    th = table.rows[0];
    for (var i = 0; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes("Fantasy")){
            table.rows[0].cells[i].innerText = "Games";
            break;
        }
    }
    
    //find % Started header column
    th = table.rows[1];
    for (var i = 0; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes("% Started")){
            table.rows[1].cells[i].innerText = "Total";
            break;
        }
    }
    
    if (fantasy_col == -1){
        fantasy_col = i;
    }
    
    
    //read team names, write games
    row = 2;
    totalGames = 0;
    info = table.rows[row].cells[player_col].innerText.split(" ");
    cellText = table.rows[row].cells[player_col].innerText;
    while (!cellText.includes("Starting Lineup Totals")){
        //if spot is not empty and player isn't IL
        if (!cellText.includes("Empty") && !table.rows[row].cells[0].innerText.includes("IL")){
            //get player name field
            for (var i = info.length - 1; i > 0; i--){
                if (contains.call(Teams, info[i])){
                    games = Schedule[info[i]][fantasyWeek];
                    break;
                }
            }
            table.rows[row].cells[fantasy_col].innerText = games;
            table.rows[row].cells[fantasy_col].style.backgroundColor = getColor(games)
            totalGames += games;  
        } else if (!cellText.includes("Empty") && table.rows[row].cells[0].innerText.includes("IL")){
            //add color to IL
            table.rows[row].cells[fantasy_col].innerText = "";
            table.rows[row].cells[fantasy_col].style.backgroundColor = "#bcd6ff"
        }  else {
            table.rows[row].cells[fantasy_col].innerText = "-"
        }
        row++;
        cellText = table.rows[row].cells[player_col].innerText;
        //console.log(cellText);
        info = table.rows[row].cells[player_col].innerText.split(" ");
    }
    //display total number of games and add class
    table.rows[row].cells[fantasy_col].innerText = totalGames;
    table.rows[row].cells[fantasy_col].className = "Alt Ta-end Nowrap Bdrend";
    
    games_isset = true;
}

round_float = function(num, round_to=3){
    return parseFloat(String(num)).toFixed(round_to);

}


//Average Stats Tab
//-----------------------------------------------------------------------------
countStats = function(){
    
    if (AS_isset){
        return;
    }
    
    view = AS_VIEW;
    console.log(view);
    console.log("counting stats...")
    
    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    num_rows = table.rows.length;
    
    if (table.rows[1].innerText.includes("Action")){
        num_cols = table.rows[1].cells.length;
    }
    else {
        num_cols = table.rows[1].cells.length - 2;
    }
    
    
    //append new row(s) to table
    footer = document.createElement("tfoot");
    stats_week = document.createElement("tr");
    stats_all = document.createElement("tr");
    
    for (var i = 0; i < num_cols; i++){
        cell1 = document.createElement("td");
        //cell1.innerText = "t";
        cell1.className = "Alt Ta-end"
        cell2 = document.createElement("td");
        //cell2.innerText = "t";
        cell2.className = "Alt Ta-end";
        stats_week.appendChild(cell1);
        stats_all.appendChild(cell2);
    }
    
    
    /*
    //add help
    stats_week.cells[0].innerText = "?"
    stats_all.cells[0].innerText = "?"
    
    stats_all.cells[0].classList.add("tooltip");
    text = document.createElement("span");
    text.className = "tooltiptext";
    stats_all.cells[0].appendChild(text);*/
    
    //add new row labels
    stats_week.cells[1].innerText = week_row_name;
    stats_all.cells[1].innerText = "Average Totals";
    
    stats_week.cells[1].style.fontWeight = 'bold';
    stats_all.cells[1].style.fontWeight = 'bold';
    
    stats_week.cells[1].className = "sum";
    stats_all.cells[1].className = "sum";
    
    
    footer.appendChild(stats_week);
    footer.appendChild(stats_all);
    table.appendChild(footer);
    
    header_row = table.rows[1];
    //find Gp col -- last col before "counting" stats
    for (var i = 0; i < header_row.cells.length; i++){
        if (header_row.cells[i].innerText.includes("GP")){
            gp_col = i;
            break;
        }
    }
    
    //find games col -- last col before "counting" stats
    for (var i = 0; i < header_row.cells.length; i++){
        if (header_row.cells[i].innerText.includes("Total")){
            games_col = i;
            break;
        }
    }
    
    row = 2;
    cellText = table.rows[row].cells[1].innerText;
    num = 0;
    den = 0;
    num_week = 0;
    den_week = 0;
    
    //init column to start with
    for (var i = 0; i < header_row.cells.length; i++){
        if (header_row.cells[i].innerText.includes("Total")){
            games_col = i;
            break;
        }
    }
    
    first_player_row = get_first_row();
    
    /*
    //find 2 columns after mins
    th = table.rows[first_player_row];
    for (var i = 0; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes(":")){
            col = i + 2;
            break;
        }
    }*/
    
    col = gp_col + 1;
    offset = false;
    write = 0;
    header_cell = table.rows[1].cells[col].innerText;
    
    while (header_cell.length > 0){
        console.log(header_cell);
        //column is (x/y)
        if (header_cell.includes("/")){
            if (!table.rows[2].cells[col].innerText.includes("/")){
                offset = true;
                console.log("offset");
                //col++;
            }
            while (!cellText.includes(week_row_name)){
                values = table.rows[row].cells[col+offset].innerText.split("/");
                if (!isNaN(values[0]) && values[0].length > 0){
                    num += parseFloat(values[0]);
                    den += parseFloat(values[1]);
                    //num_week = parseFloat(values[0]);
                    
                }
                row++;
                cellText = table.rows[row].cells[1].innerText;
            }
            
            if (offset){
                write = col + 1;
            } else {
                write = col - 1;
            }
            
            console.log(round_float(num, 1) + "/" + round_float(den, 1));
            stats_all.cells[write].innerText = round_float(num, 1) + "/" + round_float(den, 1);
            stats_all.cells[write].classList.add("F-faded");
            stats_all.cells[write].classList.add("Bdrend");
            
            
            if ((header_cell.includes("FGM/A") && table.rows[1].cells[col+1].innerText.includes("FG%")) ||
                (header_cell.includes("FTM/A") && table.rows[1].cells[col+1].innerText.includes("FT%"))){
                avg = String(round_float(num / den));
                if (avg.includes(".")){
                    avg = "." + avg.split(".")[1]
                }
                
                if (offset){
                    write = col + 2;
                } else {
                    write = col;
                }
                
                console.log(avg);
                stats_all.cells[write].innerText = avg;
                stats_all.cells[write].classList.add("Bdrend");
                col++;
            }
            
        }
        //column is %
        else if (header_cell.includes("%")) {
            console.log("%!");
            while (!cellText.includes(week_row_name)){
                value = table.rows[row].cells[col+offset].innerText;
                if (!isNaN(value) && value.length > 0){
                    num += parseFloat(value);
                    den += 1;
                }
                row++;
                cellText = table.rows[row].cells[1].innerText;
            }
            
            avg = String(round_float(num / den));
            if (avg.includes(".")){
                avg = "." + avg.split(".")[1]
            }
            
            if (offset){
                write = col + 1;
            } else {
                write = col - 1;
            }
            
            console.log(avg);
            stats_all.cells[write].innerText = avg;
            stats_all.cells[write].classList.add("Bdrend");

        }
        else {
            while (!cellText.includes(week_row_name)){
                value = table.rows[row].cells[col+offset].innerText;
                if (!isNaN(value) && value.length > 0){
                    num += parseFloat(value);
                }
                row++;
                cellText = table.rows[row].cells[1].innerText;
            }

            if (offset){
                write = col + 1;
            } else {
                write = col - 1;
            }
            
            console.log(round_float(num, 1));
            stats_all.cells[write].innerText = round_float(num, 1);
            stats_all.cells[write].classList.add("Bdrend");
        }
        
        cellText = table.rows[2].cells[1].innerText;
        num = 0;
        den = 0;
        num_week = 0;
        den_week = 0;
        row = 2;
        col++;
        header_cell = table.rows[1].cells[col].innerText;
        console.log(header_cell);
    }
    
    console.log("done")

    /*while (!cellText.includes("Projected Weekly Averages")){
        console.log(table.rows[row].cells[col].innerText);
        
        if (table.rows[row].cells[col].innerText.includes("/")){
            values = table.rows[row].cells[col].innerText.split("/");
            //console.log(values)
            if (!isNaN(values[0])){
                num += parseFloat(values[0]);
                den += parseFloat(values[1]);
            }
        }
        
        row++;
        cellText = table.rows[row].cells[1].innerText;
    }
    
    table.rows[row].cells[col-1].innerText = String(num) + "/" + String(den);*/
    
    AS_isset = true;
    
}


//Initalize Tab Functionality
//-----------------------------------------------------------------------------
var refreshSleepTime = 700;
try {
    document.getElementById("S").addEventListener("click", function() {
        setTimeout(() => {
            renderGames(0);
        }, refreshSleepTime);
    })
}
catch(err) {
    console.log(err)
} try {
    document.getElementById("P").addEventListener("click", function() {
        setTimeout(() => {
            renderGames(1);
        }, refreshSleepTime);
    })
}
catch(err) {
    console.log(err)
} try {
    document.getElementById("SPS").addEventListener("click", function() {
        setTimeout(() => {
            renderGames();
        }, refreshSleepTime);
    })
}
catch(err) {
    console.log(err)
} try {
    document.getElementById("AS").addEventListener("click", function() {
        setTimeout(() => {
            renderGames(2);
        }, refreshSleepTime);
    });
    document.getElementById("AS").addEventListener("click", function() {
        setTimeout(() => {
            countStats();
        }, refreshSleepTime);
    })
    
}
catch(err) {
    console.log(err)
}


//-----------------------------------------------------------------

if (currentUrl.indexOf(teamURLMatch) !== -1) {
    renderGames(-1);
}
