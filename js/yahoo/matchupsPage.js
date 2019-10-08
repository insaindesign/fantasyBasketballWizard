Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"];

season_start = '2019-10-21'

//get today's unformatted date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


week_to_date = {
    '1': '2019-10-21',
    '2': '2019-10-28',
    '3': '2019-11-4',
    '4': '2019-11-11',
    '5': '2019-11-18',
    '6': '2019-11-25',
    '7': '2019-12-2',
    '8': '2019-12-9',
    '9': '2019-12-16',
    '10': '2019-12-23',
    '11': '2019-12-30',
    '12': '2020-1-6',
    '13': '2020-1-13',
    '14': '2020-1-20',
    '15': '2020-1-27',
    '16': '2020-2-3',
    '17': '2020-2-10',
    '18': '2020-2-24',
    '19': '2020-3-2',
    '20': '2020-3-9',
    '21': '2020-3-16',
    '22': '2020-3-23',
    '23': '2020-3-30',
    '24': '2020-4-6',
    '25': '2020-4-13',
    '26': '2020-4-20',
    '27': '2020-4-27'
}

Schedule = {};

teams = Teams.join(",") + ",";

//console.log("teams: ", teams);

var leftName;
var rightName;

var statsLeft = [];
var statsRight = [];

var pTable;


//init stats table
table = document.getElementById("statTable3");

if (table == null){
    setTimeout(function(){
        var matchup = document.getElementById("matchup");
        //console.log("first table null");
        table = matchup.childNodes[0];
        //console.log("new table: ", table);
    }, 1000);
    
}

//find stats headers
header = table.rows[0].innerText.split("\n");
categories = header.slice(1, (header.length/2)-1);
categories = categories.join('').split('\t').join(' ').trim().split(' ')


function getProjectionsColor(ratio){
    if (ratio == 0){
        return "white";
    } else if (ratio <= .1){
        return '#ff3b3b';
    } if (ratio <= .2){
        return '#ff4e4e';
    } if (ratio <= .3){
        return '#ff6262';
    } if (ratio <= .4){
        return '#ff7676';
    } if (ratio <= .5){
        return '#ff8989';
    } if (ratio <= .6){
        return '#ff9d9d';
    } if (ratio <= .7){
        return '#ffb1b1';
    } if (ratio <= .8){
        return '#ffc4c4';
    } if (ratio <= .9){
        return '#ffd8d8';
    } if (ratio <= 1.0){
        return '#ffebeb';
    } if (ratio <= 1.1){
        return '#ebffeb';
    } if (ratio <= 1.2){
        return '#d8ffd8';
    } if (ratio <= 1.3){
        return '#c4ffc4';
    } if (ratio <= 1.4){
        return '#b1ffb1';
    } if (ratio <= 1.5){
        return '#9dff9d';
    } if (ratio <= 1.6){
        return '#89ff89';
    } if (ratio <= 1.7){
        return '#76ff76';
    } if (ratio <= 1.8){
        return '#62ff62';
    } if (ratio <= 1.9){
        return '#4eff4e';
    } if (ratio <= 2){
        return '#3bff3b';
    } if (ratio <= 2.1){
        return '#3bff3b';
    } if (ratio <= 4.5){
        return '#18f204';
    } else return '#dee8f7';
}

function getFormattedDate() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}

function getDateFromURL(url){
    url = url.split("week=")[1]
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

function getGamesRemaining(team){
    
    var dateString;
    var leagueIDString = 'leagueID=' + getLeagueID();
    url = window.location.href;
    if (url.includes("week=") && !url.includes("date=totals")){
        dateString = getDateFromURL(url);
        dateString = week_to_date[dateString];
    } else if (today < season_start) {
        dateString = season_start;
    }
    else {
        dateString = getFormattedDate();
    }
    
    //console.log("initialized dateString");
    
    console.log("dateString: ", dateString);
    
    var url = 'https://www.sportswzrd.com/gamesremaining/?pageName=yMatchupsPage&teams='+team+'&format=json&date='+dateString+'&'+leagueIDString;
    //console.log("url: ", url);
    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            //console.log('Called to backend failed: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            //console.log("data: ", data);
            //console.log("games: ", games);
            for (var t = 0; t < Teams.length; t++) {
                team = Teams[t];
                Schedule[team.toUpperCase()] = data[t];
            }
            getPlayers();
        });
    }).catch(function(err) {
        //console.log('Fetch Error :-S', err);
    });
}

function initTable(){

    teamNames = document.evaluate('//a[@class="F-link"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("teams: ", );
    nameLeft = teamNames.snapshotItem(0).innerHTML;
    nameRight = teamNames.snapshotItem(1).innerHTML;

    matchup = document.getElementById("matchup-wall-header");
    pTable = document.createElement("table");
    pTable.setAttribute("id", "projections-table");
    pTable.setAttribute("class", "Table-plain Table Table-px-sm Table-mid Datatable Ta-center Tz-xxs Bdrbot");
    var rowLeft = document.createElement("tr");
    var rowRight = document.createElement("tr");
    var rowHeader = document.createElement("tr");
    
    rowHeader.setAttribute("class", "First Last")
    
    //insert left team name
    var cell = document.createElement("td");
  
    cell.innerHTML = nameLeft;
    cell.style.color = "#black";
  
    cell.style.fontWeight = "bold";
    rowLeft.appendChild(cell);

    //insert right team name
    var cell = document.createElement("td");

    cell.innerHTML = nameRight;
    cell.style.color = "#black";

    cell.style.fontWeight = "bold";
    rowRight.appendChild(cell);
    
    //insert "projections" cell
    var cell = document.createElement("td");
    cell.innerText = "Wizard Projections";
    cell.style.color = "#8a0491";
    cell.style.fontWeight = "bold";
    rowHeader.appendChild(cell);

    for (var cat = 0; cat < categories.length; cat++){
        //add cells to header
        var cell = document.createElement("th");
        cell.innerText = categories[cat];
        cell.style.fontWeight = "bold";
        rowHeader.appendChild(cell);
        
        //add cells to top row
        var cell = document.createElement("td");
        cell.innerText = " "
        
        rowLeft.appendChild(cell);
        
        //add cells to bottom row
        var cell = document.createElement("td");
        cell.innerText = " "
        rowRight.appendChild(cell);
    }

    pTable.append(rowHeader);
    pTable.appendChild(rowLeft);
    pTable.appendChild(rowRight);

    matchup.appendChild(pTable);

}

function getFormattedQueryFromURL() {
    var url = window.location.href;
    var start = url.indexOf("date");
    
    var end = url.indexOf("&", start);

    var str = url.substring(start+5, end);
    if(str == "totals" || start == -1) {
        var weekNum = "weekNum=";
        weekNum+=document.getElementsByClassName("flyout-title")[0].innerText.split(" ")[1];
        //console.log(weekNum);
        return weekNum;
    }
    return "date="+str;
}

function getGamesToday() {
    var query = getFormattedQueryFromURL();
    var url = 'https://www.sportswzrd.com/gamestoday/?'+'&format=json&'+query;
    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            //console.log('Called to backend failed: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            displayGamesToday(data);
        });
    }).catch(function(err) {
        //console.log('Fetch Error :-S', err);
    });
}

function serializePlayer(p){
    p = p.replace(/ /g,'');
    p = p.replace("-", "");
    p = p.replace(".", "");
    p = p.replace(".", "");
    return p;
}

function getNoteIndex(row){
    noteIndex = row.indexOf("Player Note");
    if (noteIndex == -1){
        noteIndex = row.indexOf("No new player Notes")
    } if (noteIndex == -1){
        noteIndex = row.indexOf("New Player Note")
    }
    return noteIndex;
}

function getPlayers(){
    
    num_rows = table.rows.length;
    
    playersLeft = []
    playersRight = []
    for (var i = 1; i < num_rows; i++){
        row = table.rows[i].innerText.split('\n')
        
        if (row.includes("--") || row.includes("IL")){
            continue;
        }
        
        //console.log("row: ", row);

        noteIndex = getNoteIndex(row.slice(0, row.length/2 - 1));
        playerIndex = noteIndex+1;
        playerLeft = row[playerIndex].split(" - ")[0]
        playerLeft = serializePlayer(playerLeft)
        if ((!playerLeft.includes("Empty")) && (playerLeft != "O") && (playerLeft.length > 0) && row[playerIndex+1] != "INJ"){
            playersLeft.push(playerLeft);
        }
        
        row = row.slice(noteIndex+2, row.length)
        
        noteIndex = getNoteIndex(row)
        playerIndex = noteIndex+1;
        playerRight = row[playerIndex].split(" - ")[0]
        playerRight = serializePlayer(playerRight)
        if ((!playerRight.includes("Empty")) && (playerRight != "O")  && (playerRight.length > 0) && row[playerIndex+1] != "INJ"){
            playersRight.push(playerRight);
        }

    }
    
    leftString = playersLeft.join(",") + ",";
    //console.log("leftString: ", leftString);
    getProjections(leftString, "left");
    
    rightString = playersRight.join(",") + ",";
    //console.log("rightString: ", rightString);
    getProjections(rightString, "right");
    
}

function getProjections(playersString, side){
    
    var url = 'https://www.sportswzrd.com/getplayers/?players=' + playersString;
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                //console.log('Called to backend failed: ' + response.status);
                return;
            }

            response.json().then(function (data) {
                showProjections(data, side);
                //console.log(data);
            });
        }).catch(function (err) {
            //console.log('Fetch Error :-S', err);
        });
    
}

function showProjections(data, side){
    
    //console.log("showProjections -- ", side, ": ", data);
    
    //add text
    for (cat = 0; cat < categories.length; cat++){
        if (side == "left"){
            stat = calculateStats(data, categories[cat])
            pTable.rows[1].cells[cat+1].innerText = stat
            statsLeft.push(stat);
        } if (side == "right"){
            stat = calculateStats(data, categories[cat])
            pTable.rows[2].cells[cat+1].innerText = stat
            statsRight.push(stat);
        }
    }
    
    //add colors
    for (cat = 1; cat < categories.length+1; cat++){
        num = parseFloat(pTable.rows[1].cells[cat].innerHTML);
        den = parseFloat(pTable.rows[2].cells[cat].innerHTML);
        if (categories[cat-1] == "TO"){
            ratio = den / num;
        } else {
            ratio = num / den;
        }
        color = getProjectionsColor(ratio);
        pTable.rows[1].cells[cat].style.backgroundColor = color;
        
        num = parseFloat(pTable.rows[2].cells[cat].innerHTML);
        den = parseFloat(pTable.rows[1].cells[cat].innerHTML);
        if (categories[cat-1] == "TO"){
            ratio = den / num;
        } else {
            ratio = num / den;
        }
        color = getProjectionsColor(ratio);
        pTable.rows[2].cells[cat].style.backgroundColor = color;
    }
    
    if (side == "left"){
        //console.log("left: ", statsLeft);
    } if (side == "right"){
        //console.log("right: ", statsRight);
    }
}

function calculateStats(data, cat){
    
    //console.log("calculating... ", cat);
    
    if (cat == "FG%"){
        var fgm = 0;
        var fga = 0;
        for (var i = 0; i < data.length; i++){
            fgm += (parseFloat(data[i]['fgmpg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
            fga += (parseFloat(data[i]['fgapg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(fgm/fga).toFixed(3);
    } if (cat == "FT%") {
        var ftm = 0;
        var fta = 0;
        for (var i = 0; i < data.length; i++){
            ftm += (parseFloat(data[i]['ftmpg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
            fta += (parseFloat(data[i]['ftapg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(ftm/fta).toFixed(3);
    } if (cat == "PTS") {
        var pts = 0;
        for (var i = 0; i < data.length; i++){
            pts += (parseFloat(data[i]['ppg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(pts).toFixed(1);
    } if (cat == "REB") {
        var reb = 0;
        for (var i = 0; i < data.length; i++){
            reb += (parseFloat(data[i]['rpg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(reb).toFixed(1);
    } if (cat == "AST") {
        var ast = 0;
        for (var i = 0; i < data.length; i++){
            ast += (parseFloat(data[i]['apg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(ast).toFixed(1);
    } if (cat == "ST") {
        var stl = 0;
        for (var i = 0; i < data.length; i++){
            stl += (parseFloat(data[i]['spg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(stl).toFixed(1);
    } if (cat == "BLK") {
        var blk = 0;
        for (var i = 0; i < data.length; i++){
            blk += (parseFloat(data[i]['bpg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(blk).toFixed(1);
    } if (cat == "TO") {
        var to = 0;
        for (var i = 0; i < data.length; i++){
            to += (parseFloat(data[i]['topg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(to).toFixed(1);
    } if (cat == "3PTM") {
        var threes = 0;
        for (var i = 0; i < data.length; i++){
            threes += (parseFloat(data[i]['threepg']) * parseFloat(Schedule[data[i]['team']].split('/')[1]));
        }
        return parseFloat(threes).toFixed(1);
    }

}

function displayGamesToday(data) {
    var div = document.createElement("p");
    div.innerText = " NBA games today: " + data;
    div.setAttribute("class", "Ta-c C-grey Mt-10");
    div.style.color = "#0078FF";
    div.style.fontSize = "13px";
    div.style.marginTop = "0px";
    var className = "felo-matchup-button yfa-rapid-beacon yfa-rapid-module-felo-matchup-button F-link Cur-p Fz-m";
    var parentDiv = document.getElementsByClassName(className)[0].parentNode;
    parentDiv.appendChild(div);
}

if (categories.toString().replace(/\s/g, "").replace(/,/g, "") == "FG%FT%3PTMPTSREBASTSTBLKTO"){
    initTable();
    //console.log("9cat league");
    getGamesRemaining(teams);
    
}

try {
    getGamesToday();
}
catch(err) {
    //console.log("error displaying games today");
}




