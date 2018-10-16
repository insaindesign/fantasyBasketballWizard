//Fantasy Basketball Wizard
//teamPage.js


Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]

Schedule = {}

teams = Teams.join(",") + ","
games = JSON.parse(getGames(teams))

//Initialize Functions
//-----------------------------------------------------------------------------
var getColor = function(games) {
    if (games == '0/0'){
        return "#56d2ff"
    }
    games = parseInt(games.split('/')[0]);
    if (games == 5){
        return "#7ee57e"
    } else if (games == 4) {
        return "#adebad"
    } else if (games == 3) {
        return "#d8ffcc"
    } else if (games == 2) {
        return "#ffffcc"
    } else if (games == 1) {
        return "#ffd6cc"
    } else if (games == 0) {
        return "#f97a7a"
    } else {
        return "white"
    }
}

function getFormattedDate() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}

function getDateFromURL(url){
    url = url.split("date=")[1]
    date = url.split("&")[0]
    return date
}

function getLeagueID(){
    var url = window.location.href.split("/");
    
    for (var u = 0; u < url.length; u++){
        if (url[u] == "nba"){
            return url[u+1];
        }
    }
}

function getGames(team){
    var dateString;
    var leagueIDString = 'leagueID=' + getLeagueID();
    url = window.location.href;
    if (url.includes("date=")){
        dateString = getDateFromURL(url);
    } else {
        dateString = getFormattedDate();
    }
    
    var url = 'https://www.fantasywizard.site/gamesremaining/?pageName=yTeamPage&teams='+team+'&format=json&date='+dateString+'&'+leagueIDString;
    //console.log("url: ", url);
    //console.log("url: ", dateString);
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
}

for (var t = 0; t < Teams.length; t++) {
    team = Teams[t];
    Schedule[team] = games[t];
}

//get week of year
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1,
                index = -1;

            for (i = 0; i < this.length; i++) {
                var item = this[i];

                if ((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

var get_first_row = function() {
    //init stats table
    table = document.getElementById("statTable0");

    //init table dimensions
    num_rows = table.rows.length;
    
    for (var i = 2; i < num_rows; i++) {
        rowText = table.rows[i].innerText.split('\n').toString();
        //console.log("rowText: ", rowText);
        if (!rowText.includes("(Empty)") && !rowText.includes("-,-,-")) {
            //console.log('i: ', i);
            return i;
        }
    }
}

var get_label_col = function() {
    //init stats table
    table = document.getElementById("statTable0");

    //init table dimensions
    if (table.rows[get_first_row()].cells[1].innerText.includes("layer Note")) {
        return 1;
    } else {
        return 2;
    }
}

function initGlobals(){
    games_id = "games";
    avg_stats_id = "avg";

    week = (new Date()).getWeek();
    elements = document.getElementsByClassName("Block Mbot-xs Fz-xxs F-shade Uppercase");
    versusString = elements[0].innerText;
    arr = versusString.split(" ");
    fantasyWeek = arr[1] - 1;

    week_row_name = "Projected Week Totals";

    S_VIEW = 0;
    P_VIEW = 1;
    AS_VIEW = 2;

    this_view = S_VIEW;
}

//Default Stats Tab
//-----------------------------------------------------------------------------
renderGames = function(from_view) {

    if (document.getElementById(games_id) != null) {
        console.log("no changes");
        return;
    }

    console.log("rendering games...")
    
    //init stats table
    table = document.getElementById("statTable0");
    
    //init stats columns
    header_cols = table.rows[1].innerText.split("\n");

    //init table dimensions
    num_rows = table.rows.length;

    first_player_row = get_first_row();
    
    if (first_player_row == table.rows.length - 1 || first_player_row == null){
        console.log("all empty");
        for (var i = 2; i < num_rows; i++) {
            rowText = table.rows[i].innerText.split('\n').toString();
            console.log("rowText: ", rowText);
            if (!rowText.includes("(Empty)")) {
                //console.log('i: ', i);
                first_player_row = i;
                break;
            }
        }
    }
    
    console.log("first_player_row: ", first_player_row);

    //find player column
    th = table.rows[first_player_row];
    for (var i = 0; i < th.cells.length; i++) {
        console.log("cell: ", th.cells[i].innerText);
        if (th.cells[i].innerText.includes("layer")) {
            player_col = i;
            break;
        }
    }
    
    console.log("player_col:", player_col);

    fantasy_col = -1;
    //find % Started column
    th = table.rows[first_player_row];
    for (var i = 5; i < th.cells.length; i++) {
        //if (th.cells[i].innerText.includes("-") && th.cells[i].innerText.length < 3){
        if (th.cells[i].innerText.includes("%")) {
            fantasy_col = i;
            break;
        }
    }

    //if % not in any cells
    if (fantasy_col == -1) {
        for (var i = 5; i < th.cells.length; i++) {
            if (th.cells[i].innerText.includes("-") && th.cells[i].innerText.length < 3) {
                fantasy_col = i + 1;
                break;
            }
        }
    }

    //replace Fantasy headers
    //find Fantasy header column
    th = table.rows[0];
    for (var i = 0; i < th.cells.length; i++) {
        if (th.cells[i].innerText.includes("Fantasy")) {
            table.rows[0].cells[i].innerText = "Games";
            table.rows[0].cells[i].id = games_id;
            break;
        }
    }

    //find % Started header column
    th = table.rows[1];
    for (var i = 0; i < th.cells.length; i++) {
        if (th.cells[i].innerText.includes("% Started")) {
            table.rows[1].cells[i].innerText = "Gr/G";
            break;
        }
    }

    //on average stats tab
    if (fantasy_col == -1 && !document.getElementById("subnav_AS").className.includes("Hidden")) {
        //find games column
        th = table.rows[first_player_row];
        for (var i = 2; i < th.cells.length; i++) {
            if (th.cells[i].innerText.includes(":") && !th.cells[i].innerText.includes("m")) {
                fantasy_col = i - 1;
                break;
            }
        }
    }

    //if opponent team
    if (fantasy_col == -1 && header_cols.includes("Action")) {
        fantasy_col = i+1;
    }
    else if (fantasy_col == -1) {
        fantasy_col = i;
    }

    //read team names, write games
    row = 2;
    totalGamesNum = 0;
    totalGamesDen = 0;
    info = table.rows[row].cells[player_col].innerText.split(" ");
    cellText = table.rows[row].cells[player_col].innerText;
    while (!cellText.includes("Starting Lineup Totals")) {
        //if spot is not empty and player isn't IL
        if (!cellText.includes("Empty") && !table.rows[row].cells[0].innerText.includes("IL") && !table.rows[row].innerText.includes("Injured")) {
            //get player name field
            for (var i = info.length - 1; i > 0; i--) {
                if (contains.call(Teams, info[i])) {
                    team = info[i];
                    games = Schedule[team];
                    break;
                }
            }
            table.rows[row].cells[fantasy_col].innerText = games;
            table.rows[row].cells[fantasy_col].style.backgroundColor = getColor(games)
            totalGamesNum += parseFloat(games.split("/")[0]);
            totalGamesDen += parseFloat(games.split("/")[1]);
        } else if (!cellText.includes("Empty") && table.rows[row].cells[0].innerText.includes("IL") || table.rows[row].innerText.includes("Injured")) {
            //add color to IL
            table.rows[row].cells[fantasy_col].innerText = "-";
            table.rows[row].cells[fantasy_col].style.backgroundColor = "#bcd6ff"
        } else {
            table.rows[row].cells[fantasy_col].innerText = "-"
        }
        row++;
        try {
            cellText = table.rows[row].cells[player_col].innerText;
            //console.log(cellText);
            info = table.rows[row].cells[player_col].innerText.split(" ");
        } catch (err) {
            console.log("error finishing reads");
            break;
        }

    }

    try {
        //display total number of games and add class
        totalGames = totalGamesNum.toString() + "/" + totalGamesDen.toString();
        console.log("totalGames", totalGames);
        table.rows[row].cells[fantasy_col].innerText = totalGames;
        table.rows[row].cells[fantasy_col].id = "games";
        table.rows[row].cells[fantasy_col].className = "Alt Ta-end Nowrap Bdrend";
    } catch (err) {
        console.log("error writing");
    }
}

round_float = function(num, round_to = 3) {
    return parseFloat(String(num)).toFixed(round_to);

}


//Average Stats Tab
//-----------------------------------------------------------------------------
countStats = function() {

    if (document.getElementById("subnav_AS").className.includes("Hidden")) {
        return;
    }

    if (document.getElementById(avg_stats_id) != null) {
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

    if (table.rows[1].innerText.includes("Action")) {
        num_cols = table.rows[2].cells.length;
    } else {
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
    for (var i = 0; i < th.cells.length; i++) {
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

    label_col = get_label_col();

    //add new row labels
    stats_week.cells[label_col].innerText = week_row_name;
    stats_all.cells[label_col].innerText = "Average Totals";

    stats_week.cells[1].style.fontWeight = 'bold';
    stats_all.cells[1].style.fontWeight = 'bold';

    footer.appendChild(stats_week);
    footer.appendChild(stats_all);
    table.appendChild(footer);

    header_row = table.rows[1];
    //find Gp col -- last col before "counting" stats
    for (var i = 0; i < header_row.cells.length; i++) {
        if (header_row.cells[i].innerText.includes("GP")) {
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
    for (var i = 2; i < th.cells.length; i++) {
        if (th.cells[i].innerText.includes(":") && !th.cells[i].innerText.includes("m") && !th.cells[i].innerText.includes("Q")) {
            games_col = i - 1;
            col = i + 1;
            break;
        }
    }

    //col = gp_col + 1;
    offset = false;
    write = 0;

    //on opponent page
    if (document.getElementsByClassName("F-icon Fz-xs F-trade T-action-icon-trade").length > 1 || document.getElementsByClassName("noactiondt-tradedeadlinepassed F-icon Fz-xs F-disabled T-action-icon-disabled-trade").length > 1) {
        offset = true;
        console.log("offset");
    } else {
        col++;
        console.log("not offset");
    }

    header_cell = table.rows[1].cells[col].innerText;

    console.log("header cell: ", header_cell);

    while (header_cell.length > 0) {
        console.log("col: ", table.rows[1].cells[col].innerText);
        //column is (x/y)
        if (header_cell.includes("/")) {
            while (!cellText.includes(week_row_name)) {
                if (!cellText.includes("Injured")) {
                    values = table.rows[row].cells[col + offset].innerText.split("/");
                    games_row = table.rows[row].cells[games_col].innerText.split('/')[1];
                    if (!isNaN(values[0]) && values[0].length > 0) {
                        num += parseFloat(values[0]);
                        den += parseFloat(values[1]);
                        if (!isNaN(games_row) && games_row.length > 0) {
                            weekly_num += parseFloat(values[0]) * games_row;
                            weekly_den += parseFloat(values[1]) * games_row;
                        }
                    }
                }

                row++;
                cellText = table.rows[row].cells[get_label_col()].innerText;
            }

            if (offset) {
                write = col + 1;
            } else {
                write = col;
            }

            stats_all.cells[write].innerText = round_float(num, 1) + "/" + round_float(den, 1);
            stats_week.cells[write].innerText = round_float(weekly_num, 1) + "/" + round_float(weekly_den, 1);

            console.log("/ stats: ", round_float(num, 1));
            console.log("/ stats: ", round_float(den, 1));


            //calculate % based on shooting volume
            if ((header_cell.includes("FGM/A") && table.rows[1].cells[col + 1].innerText.includes("FG%")) ||
                (header_cell.includes("FTM/A") && table.rows[1].cells[col + 1].innerText.includes("FT%"))) {
                avg = String(round_float(num / den));
                weekly_avg = String(round_float(weekly_num / weekly_den));
                if (avg.includes(".")) {
                    avg = "." + avg.split(".")[1]
                }

                if (weekly_avg.includes(".")) {
                    weekly_avg = "." + weekly_avg.split(".")[1]
                }

                if (offset) {
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
            while (!cellText.includes(week_row_name)) {
                value = table.rows[row].cells[col].innerText;
                if (!isNaN(value) && value.length > 0) {
                    num += parseFloat(value);
                    den += 1;
                }
                row++;
                cellText = table.rows[row].cells[get_label_col()].innerText;
            }

            avg = String(round_float(num / den));
            if (avg.includes(".")) {
                avg = "." + avg.split(".")[1]
            }

            write = col;

        } else {
            console.log("col: ", col);
            weekly_stats = 0;
            while (!cellText.includes(week_row_name)) {
                if (!cellText.includes("Injured")) {
                    value = table.rows[row].cells[col + offset].innerText;
                    games_row = table.rows[row].cells[games_col].innerText.split('/')[1];
                    if (!isNaN(value) && value.length > 0) {
                        num += parseFloat(value);
                        if (!isNaN(games_row) && games_row.length > 0) {
                            weekly_stats += (parseFloat(value) * parseFloat(games_row));
                        }

                    }
                }
                row++;
                cellText = table.rows[row].cells[get_label_col()].innerText;
            }

            if (offset) {
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
}

function init_AS_subnav() {
    var refreshSleepTime = 800;
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
    } catch (err) {
        console.log(err)
    }
}


//Initalize Tab Functionality
//-----------------------------------------------------------------------------
function addListeners(){
    
    var refreshSleepTime = 800;
    try {
        document.getElementById("S").addEventListener("click", function() {
            setTimeout(() => {
                renderGames(0);
            }, refreshSleepTime);
        })
    } catch (err) {
        console.log(err)
    }
    try {
        document.getElementById("subnav_S").addEventListener("click", function() {
            setTimeout(() => {
                renderGames(0);
            }, refreshSleepTime);
        })
    } catch (err) {
        console.log(err)
    }
    try {
        document.getElementById("P").addEventListener("click", function() {
            setTimeout(() => {
                renderGames(1);
            }, refreshSleepTime);
        })
    } catch (err) {
        console.log(err)
    }
    try {
        document.getElementById("SPS").addEventListener("click", function() {
            setTimeout(() => {
                renderGames();
            }, refreshSleepTime);
        })
    } catch (err) {
        console.log(err)
    }
    try {
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

    } catch (err) {
        console.log(err)
    }
}

render = function() {
    initGlobals();
    addListeners();
    renderGames();
    countStats();
}

//-----------------------------------------------------------------
currentUrl = window.location.href;
myTeamRegex = /https?:\/\/basketball[.]fantasysports[.]yahoo[.]com\/nba\/\d{3,7}\/\d{1,2}/;
teamURLMatch = currentUrl.match(myTeamRegex);

if (document.getElementById('team-card-info') != null && currentUrl.indexOf(teamURLMatch) !== -1) {
    render();
    //renderGames();
    //countStats();
}
