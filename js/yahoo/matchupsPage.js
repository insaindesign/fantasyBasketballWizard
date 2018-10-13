Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]

Schedule = {}

teams = Teams.join(",") + ","


var leftName;
var rightName;

var statsLeft = [];
var statsRight = [];

var table;
var pTable;

function getProjectionsColor(ratio){
    if (ratio <= .1){
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
    } else return '#14ff14';
}

function initGlobals(){
    //init stats table
    table = document.getElementById("statTable3");

    //find stats headers
    header = table.rows[0].innerText.split("\n");
    categories = header.slice(1, (header.length/2)-1);

    teamNames = document.getElementById("matchup-header").innerText.split('\n')
    console.log("teams: ", );
    nameLeft = teamNames[1];
    nameRight = teamNames[teamNames.length-3];

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
    cell.style.color = "#0f6800";
    cell.style.fontWeight = "bold";
    rowLeft.appendChild(cell);

    //insert right team name
    var cell = document.createElement("td");
    cell.innerHTML = nameRight;
    cell.style.color = "#6d0505";
    cell.style.fontWeight = "bold";
    rowRight.appendChild(cell);
    
    //insert "projections" cell
    var cell = document.createElement("td");
    cell.innerHTML = "Wizard Projections";
    cell.style.color = "#8a0491";
    cell.style.fontWeight = "bold";
    rowHeader.appendChild(cell);

    for (var cat = 0; cat < categories.length; cat++){
        //add cells to header
        var cell = document.createElement("th");
        cell.innerHTML = categories[cat];
        cell.style.fontWeight = "bold";
        rowHeader.appendChild(cell);
        
        //add cells to top row
        var cell = document.createElement("td");
        cell.innerHTML = " "
        
        rowLeft.appendChild(cell);
        
        //add cells to bottom row
        var cell = document.createElement("td");
        cell.innerHTML = " "
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
        console.log(weekNum);
        return weekNum;
    }
    return "date="+str;
}

function getGames() {
    var query = getFormattedQueryFromURL();
    var url = 'https://www.fantasywizard.site/gamestoday/?'+'&format=json&'+query;
    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            displayGamesToday(data);
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function serializePlayer(p){
    p = p.replace(/ /g,'');
    p = p.replace("-", "");
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

        noteIndex = getNoteIndex(row.slice(0, row.length/2 - 1));
        playerLeft = row[noteIndex+1].split(" - ")[0]
        
        playerLeft = serializePlayer(playerLeft)
        if ((!playerLeft.includes("Empty")) && (playerLeft != "O") && (playerLeft.length > 0)){
            playersLeft.push(playerLeft)
        }
        
        //console.log("left: ", playersLeft);
        
        row = row.slice(noteIndex+2, row.length)
        
        noteIndex = getNoteIndex(row)
        playerRight = row[noteIndex+1].split(" - ")[0]
        playerRight = serializePlayer(playerRight)
        if ((!playerRight.includes("Empty")) && (playerRight != "O")  && (playerRight.length > 0)){
            playersRight.push(playerRight)
        }
        //console.log("right: ", playersRight);
    }
    
    leftString = playersLeft.join(",") + ",";
    getProjections(leftString, "left");
    
    rightString = playersRight.join(",") + ",";
    getProjections(rightString, "right");
    
}

function getProjections(playersString, side){
    table = document.getElementById("statTable3");
    
    var url = 'https://www.fantasywizard.site/getplayers/?players=' + playersString;
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                console.log('Called to backend failed: ' + response.status);
                return;
            }

            response.json().then(function (data) {
                showProjections(data, side);
                console.log(data);
            });
        }).catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    
}

function showProjections(data, side){
    
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
        console.log("num: ", num);
        console.log("den: ", den);
        ratio = num / den;
        console.log("ratio: ", ratio);
        color = getProjectionsColor(ratio);
        console.log("color: ", color);
        pTable.rows[1].cells[cat].style.backgroundColor = color;
        statsLeft.push(stat);
        
        num = parseFloat(pTable.rows[2].cells[cat].innerHTML);
        den = parseFloat(pTable.rows[1].cells[cat].innerHTML);
        console.log("num: ", num);
        console.log("den: ", den);
        ratio = num / den;
        console.log("ratio: ", ratio);
        color = getProjectionsColor(ratio);
        console.log("color: ", color);
        pTable.rows[2].cells[cat].style.backgroundColor = color;
        statsRight.push(stat);
    }
    
    if (side == "left"){
        console.log("left: ", statsLeft);
    } if (side == "right"){
        console.log("right: ", statsRight);
    }
}

function calculateStats(data, cat){
    console.log("calculating... ", cat);
    if (cat == "FG%"){
        var fgm = 0;
        var fga = 0;
        for (var i = 0; i < data.length; i++){
            fgm += parseFloat(data[i]['fgmpg']);
            fga += parseFloat(data[i]['fgapg']);
        }
        return parseFloat(fgm/fga).toFixed(3);
        
    } if (cat == "FT%") {
        var ftm = 0;
        var fta = 0;
        for (var i = 0; i < data.length; i++){
            ftm += parseFloat(data[i]['ftmpg']);
            fta += parseFloat(data[i]['ftapg']);
        }
        return parseFloat(ftm/fta).toFixed(3);
        
    } if (cat == "PTS") {
        var pts = 0;
        for (var i = 0; i < data.length; i++){
            pts += parseFloat(data[i]['ppg']);
        }
        return parseFloat(pts).toFixed(1);
    } if (cat == "REB") {
        var reb = 0;
        for (var i = 0; i < data.length; i++){
            reb += parseFloat(data[i]['rpg']);
        }
        return parseFloat(reb).toFixed(1);
    } if (cat == "AST") {
        var ast = 0;
        for (var i = 0; i < data.length; i++){
            ast += data[i]['apg'];
        }
        return parseFloat(ast).toFixed(1);
    } if (cat == "ST") {
        var stl = 0;
        for (var i = 0; i < data.length; i++){
            stl += parseFloat(data[i]['spg']);
        }
        return parseFloat(stl).toFixed(1);
    } if (cat == "BLK") {
        var blk = 0;
        for (var i = 0; i < data.length; i++){
            blk += parseFloat(data[i]['bpg']);
        }
        return parseFloat(blk).toFixed(1);
    } if (cat == "TO") {
        var to = 0;
        for (var i = 0; i < data.length; i++){
            to += parseFloat(data[i]['topg']);
        }
        return parseFloat(to).toFixed(1);
    } if (cat == "3PTM") {
        var threes = 0;
        for (var i = 0; i < data.length; i++){
            threes += parseFloat(data[i]['threepg']);
        }
        return parseFloat(threes).toFixed(1);
    }

}

function getPlayerStats(player){
    var url = 'https://www.fantasywizard.site/getplayer/?id='+player;
    console.log("url: ", url);
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
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


initGlobals();
getGames();
getPlayers();

