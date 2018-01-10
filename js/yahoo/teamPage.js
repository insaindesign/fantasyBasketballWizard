//Fantasy Basketball Wizard
//teamPage.js
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
        if (!table.rows[i].cells[1].innerText.includes("(Empty)") && !table.rows[i].cells[2].innerText.includes("(Empty)")){
            return i;
        }
    }
}

var get_label_col = function(){
    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    if (table.rows[get_first_row()].cells[1].innerText.includes("layer Note")){
        return 1;
    } else {
        return 2;
    }
    
}

var games_isset = false;
var AS_isset = false;

var games_id = "games";
var avg_stats_id = "avg";

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
    
    if (document.getElementById(games_id) != null){
        console.log("no changes");
        return;
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
        if (th.cells[i].innerText.includes("Player")){
            player_col = i;
            break;
        }
    }
    
    fantasy_col = -1
    //find % Started column
    th = table.rows[first_player_row];
    for (var i = 5; i < th.cells.length; i++){
        //if (th.cells[i].innerText.includes("-") && th.cells[i].innerText.length < 3){
        if (th.cells[i].innerText.includes("%")){
            fantasy_col = i;
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
            table.rows[0].cells[i].id = games_id;
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
    
    //on average stats tab
    if (fantasy_col == -1 && !document.getElementById("subnav_AS").className.includes("Hidden")){
        //find games column
        th = table.rows[first_player_row];
        for (var i = 2; i < th.cells.length; i++){
            if (th.cells[i].innerText.includes(":") && !th.cells[i].innerText.includes("m")){
                fantasy_col = i - 1;
                break;
            }
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
            table.rows[row].cells[fantasy_col].innerText = "-";
            table.rows[row].cells[fantasy_col].style.backgroundColor = "#bcd6ff"
        }  else {
            table.rows[row].cells[fantasy_col].innerText = "-"
        }
        row++;
        try{
            cellText = table.rows[row].cells[player_col].innerText;
            //console.log(cellText);
            info = table.rows[row].cells[player_col].innerText.split(" ");
        }
        catch(err){
            console.log("error finishing reads");
            break;
        }
        
    }
    
    try{
        //display total number of games and add class
        table.rows[row].cells[fantasy_col].innerText = totalGames;
        table.rows[row].cells[fantasy_col].id = "games";
        table.rows[row].cells[fantasy_col].className = "Alt Ta-end Nowrap Bdrend";
    }
    catch(err){
        console.log("error writing");
    }
}

round_float = function(num, round_to=3){
    return parseFloat(String(num)).toFixed(round_to);

}


//Average Stats Tab
//-----------------------------------------------------------------------------
countStats = function(){
    
    if (document.getElementById("subnav_AS").className.includes("Hidden")){
        return;
    }
    
    if (document.getElementById(avg_stats_id) != null){
        console.log("no changes");
        return;
    }
    
    view = AS_VIEW;
    console.log("counting stats...")
    
    init_AS_subnav();
    
    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    num_rows = table.rows.length;
    
    if (table.rows[1].innerText.includes("Action")){
        num_cols = table.rows[2].cells.length;
    }
    else {
        num_cols = table.rows[2].cells.length;
    }
    
    console.log("cols: ", num_cols);
    
    //append new row(s) to table
    footer = document.createElement("tfoot");
    stats_week = document.createElement("tr");
    stats_all = document.createElement("tr");
    
    first_player_row = get_first_row();
    
    //assign cells to bottom rows
    th = table.rows[first_player_row];
    for (var i = 0; i < th.cells.length; i++){
            cell1 = document.createElement("td");
            cell1.className = th.cells[i].className;
            //cell1.innerText = i;
            cell2 = document.createElement("td");
            cell2.className = th.cells[i].className;
            //cell2.innerText = i;
            stats_week.appendChild(cell1);
            stats_all.appendChild(cell2);
    }

    stats_all.id = avg_stats_id;
    
    /*
    //add help
    stats_week.cells[0].innerText = "?"
    stats_all.cells[0].innerText = "?"
    
    stats_all.cells[0].classList.add("tooltip");
    text = document.createElement("span");
    text.className = "tooltiptext";
    stats_all.cells[0].appendChild(text);*/
    
    label_col = get_label_col();
    
    //add new row labels
    stats_week.cells[label_col].innerText = week_row_name;
    stats_all.cells[label_col].innerText = "Average Totals";
    
    stats_week.cells[1].style.fontWeight = 'bold';
    stats_all.cells[1].style.fontWeight = 'bold';
    
    //stats_week.cells[1].className = "sum";
    //stats_all.cells[1].className = "sum";
    
    
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
    
    
    row = get_first_row();
    cellText = table.rows[row].cells[get_label_col()].innerText;
    num = 0;
    den = 0;
    num_week = 0;
    den_week = 0;
    
    weekly_num = 0;
    weekly_den = 0;
    
    
    
    //find games column
    th = table.rows[row];
    for (var i = 2; i < th.cells.length; i++){
        if (th.cells[i].innerText.includes(":") && !th.cells[i].innerText.includes("m") && !th.cells[i].innerText.includes("Q")){
            games_col = i - 1;
            col = i + 1;
            break;
        }
    }
    
    
    //col = gp_col + 1;
    offset = false;
    write = 0;
    
    //on opponent page
    if (document.getElementsByClassName("F-icon Fz-xs F-trade T-action-icon-trade").length > 1){
        offset = true;
        console.log("offset");
    } else {
        col++;
        console.log("not offset");
    }
    
    header_cell = table.rows[1].cells[col].innerText;
    
   

    
    while (header_cell.length > 0){
        console.log("col: ", table.rows[1].cells[col].innerText);
        //column is (x/y)
        if (header_cell.includes("/")){
            console.log("col: ", col);
            while (!cellText.includes(week_row_name)){
                if (!cellText.includes("Injured")){
                    values = table.rows[row].cells[col+offset].innerText.split("/");
                    games_row = table.rows[row].cells[games_col].innerText;
                    if (!isNaN(values[0]) && values[0].length > 0){
                        num += parseFloat(values[0]);
                        den += parseFloat(values[1]);
                        console.log("num: ", values[0]);
                        if (!isNaN(games_row) && games_row.length > 0){
                            weekly_num += parseFloat(values[0]) * games_row;
                            weekly_den += parseFloat(values[1]) * games_row;
                        }
                        
                    }
                }
                
                row++;
                cellText = table.rows[row].cells[get_label_col()].innerText;
            }
            
            
            if (offset){
                write = col + 1;
            } else {
                write = col;
            }
            
            stats_all.cells[write].innerText = round_float(num, 1)+"/"+round_float(den, 1);
            stats_week.cells[write].innerText = round_float(weekly_num, 1)+"/"+round_float(weekly_den, 1);
            
            console.log("/ stats: ", round_float(num, 1));
            console.log("/ stats: ", round_float(den, 1));
            

            //calculate % based on shooting volume
            if ((header_cell.includes("FGM/A") && table.rows[1].cells[col+1].innerText.includes("FG%")) ||
                (header_cell.includes("FTM/A") && table.rows[1].cells[col+1].innerText.includes("FT%"))){
                avg = String(round_float(num / den));
                weekly_avg = String(round_float(weekly_num / weekly_den));
                if (avg.includes(".")){
                    avg = "." + avg.split(".")[1]
                }
                
                if (weekly_avg.includes(".")){
                    weekly_avg = "." + weekly_avg.split(".")[1]
                }
                
                if (offset){
                    write = col + 2;
                } else {
                    write = col + 1;
                }
                
                console.log("shooting % detected");
                
                //console.log(avg);
                stats_all.cells[write].innerText = avg;
                stats_week.cells[write].innerText = weekly_avg;
                col++;
            }
            
            
        }
        //column is %
        else if (header_cell.includes("%")) {
            console.log("%!");
            while (!cellText.includes(week_row_name)){
                value = table.rows[row].cells[col].innerText;
                if (!isNaN(value) && value.length > 0){
                    num += parseFloat(value);
                    den += 1;
                }
                row++;
                cellText = table.rows[row].cells[get_label_col()].innerText;
            }
            
            avg = String(round_float(num / den));
            if (avg.includes(".")){
                avg = "." + avg.split(".")[1]
            }
            
            write = col;
            
            //console.log(avg);
            
            //write stats
            //stats_all.cells[write].innerText = avg;
            //stats_all.cells[write].classList.add("Bdrend");

        }
        else {
            console.log("col: ", col);
            weekly_stats = 0;
            while (!cellText.includes(week_row_name)){
                if (!cellText.includes("Injured")){
                    value = table.rows[row].cells[col+offset].innerText;
                    games_row = table.rows[row].cells[games_col].innerText;
                    if (!isNaN(value) && value.length > 0){
                        num += parseFloat(value);
                        console.log("else val: ", value);
                        if (!isNaN(games_row) && games_row.length > 0){
                            weekly_stats += (parseFloat(value) * parseFloat(games_row));
                        }
                        
                    }
                }
                row++;
                cellText = table.rows[row].cells[get_label_col()].innerText;
            }

            if (offset){
                write = col + 1;
            } else {
                write = col;
            }
            
            stats_all.cells[write].innerText = round_float(num, 1);
            stats_week.cells[write].innerText = round_float(weekly_stats, 1);
            
            console.log("stats: ", round_float(num, 1));
            
            weekly_stats = 0;
            
            
        }
    
        weekly_num = 0;
        weekly_den = 0;
        cellText = table.rows[get_first_row()].cells[get_label_col()].innerText;
        num = 0;
        den = 0;
        num_week = 0;
        den_week = 0;
        row = get_first_row();
        col++;
        header_cell = table.rows[1].cells[col].innerText;
        
    }
    
    console.log("done")
    
    AS_isset = true;
    
}

var init_AS_subnav = function(){
    try {
        var subNav = document.getElementById("subnav_AS");
        var today = document.getElementById("subnav_AS").childNodes[1];
        var last7 = document.getElementById("subnav_AS").childNodes[3];
        var last14 = document.getElementById("subnav_AS").childNodes[5];
        var last30 = document.getElementById("subnav_AS").childNodes[7];
        var season = document.getElementById("subnav_AS").childNodes[9];
        today.addEventListener("click", function() {
            setTimeout(() => {
                renderGames();
                countStats();
            }, refreshSleepTime);
        });
        last7.addEventListener("click", function() {
            setTimeout(() => {
                renderGames();
                countStats();
            }, refreshSleepTime);
        });
        last14.addEventListener("click", function() {
            setTimeout(() => {
                renderGames();
                countStats();
            }, refreshSleepTime);
        });
        last30.addEventListener("click", function() {
            setTimeout(() => {
                renderGames();
                countStats();
            }, refreshSleepTime);
        });
        season.addEventListener("click", function() {
            setTimeout(() => {
                renderGames();
                countStats();
            }, refreshSleepTime);
        });
}
catch(err) {
    console.log(err)
}
}


//Initalize Tab Functionality
//-----------------------------------------------------------------------------
var refreshSleepTime = 800;
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

render = function(){
    renderGames();
    countStats();
}

//-----------------------------------------------------------------

if (currentUrl.indexOf(teamURLMatch) !== -1) {
    render();
    //renderGames();
    //countStats();
}
