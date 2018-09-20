//transactionTrendsPage.js
//Populates the transaction trends page with number of games for the week
Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]

//--------Colors-----------
var noneColor = "#ff4d4d";
var lowColor = "#FF9E9A";
var medColor = "#d8ffcc";
var highColor = "#adebad";
var whiteColor = "white";
var borderColor = "#e7e7e7";

//main function that initializes everything. 
function init() {
    renderGames();
    addDropDown();
    var dropdown = document.getElementById("dropdown");
    // dropdown.addEventListener("change", function() {
    //     var weekNum = getWeekNumFromDropdown();
    //     resetGames(weekNum-1);
    // });
}

//check values from that <td> to values from the Teams array to find the team abbreviation
function getTeamFromInfo(playerInfo) {
    for(var j=0; j<Teams.length; j++) {
        if(Teams.includes(playerInfo[j])) {
            var team = playerInfo[j];
            break;
        }
    }
    return team;
}

//determine color based on number of games
function getColor(games){
    var numGames = parseInt(games.split("/")[0], 10);
    if (numGames > 3){
        return highColor;
    } else if (numGames == 3){
        return medColor;
    } else if (numGames == 2){
        return lowColor;
    } else if (numGames == 1){
        return lowColor;
    } else if (numGames == 0) {
        return noneColor;
    } else {
        return whiteColor;
    }
}


//returns selected week number in drop down
function getWeekNumFromDropdown() {
    var dropdown = document.getElementById("dropdown");
    return dropdown.options[dropdown.selectedIndex].value;
}

//adds a drop down of weeks for user to select
function addDropDown() {
    var select = document.createElement("select");
    select.setAttribute("id", "dropdown");
    for(var i=1; i<=24; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerText = "Week " + i;
        select.appendChild(option);
    }
    console.log(select);
    var div = document.createElement("div");
    div.innerText = "wk";
    div.setAttribute("class", "navtarget");
    select.style.cssFloat ="right";
    document.getElementsByClassName("Nav-h Py-med No-brdbot Tst-pos-nav")[0].appendChild(select);


}

//sets the number of games in the games column for the new week selected by the user
function resetGames(weekNum) {
    var gameColumn = document.getElementsByClassName("gameColumn");
    var rows = document.getElementsByClassName("Tst-table Table")[0].rows;
    var playerInfo;
    for(var i=1; i<rows.length; i++) {
        playerInfo = rows[i].cells[1].innerText.split(" ");
        team = getTeamFromInfo(playerInfo);
        gameColumn[i].innerText = Schedule[team][weekNum];
    }
}

function getFormattedDate() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}

//initial appending of new colum for current week with games
function renderGames() {
    var rows = document.getElementsByClassName("Tst-table Table")[0].rows;
    var teamsString = "teams=";
    var playerInfo;

    //go through rows of table
    for(var i=1; i<rows.length; i++) {
        //grab all text from the <td> that includes the team/player name
        playerInfo = rows[i].cells[1].innerText.split(" "); 
        teamsString += getTeamFromInfo(playerInfo) + ",";
    }
    console.log(teamsString)
    var dateString = getFormattedDate();
    console.log("dateString = " + dateString);
    var url = 'https://bilalsattar24.pythonanywhere.com/gamesremaining/?'+teamsString+'&format=json&date='+dateString;
    console.log("before request");
    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            addGames(data);
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

}

function addGames(data) {
    console.log("in add Games");
    var table = document.getElementsByClassName("Tst-table Table")[0];
    var rows = table.rows;
    var newCell;
    var gpHeader = document.createElement("th");
    gpHeader.innerText = "Gr/G*";
    var gpCell = table.rows[0].appendChild(gpHeader);
    var gpTip = document.createElement("div");
    gpTip.setAttribute("style", "text-align: right; color: #757575");
    document.getElementsByClassName("Hd No-p")[1].appendChild(gpTip);


    for(var i=1; i<rows.length; i++) {
        
        //create new cell and fill with proper attributes/data
        var numGames = data[i-1];
        newCell = rows[i].insertCell(9);
        rows[i].cells[5].setAttribute("class", "Bdrend");
        newCell.style.border.color = borderColor;
        newCell.innerText = numGames;
        newCell.style.textAlign = "center";
        newCell.style.backgroundColor = getColor(numGames);
        newCell.setAttribute("class", "gameColumn");
    }
    gpCell.addEventListener("mouseover", function() {
        gpTip.innerText="*Games remaining this week / Games this week";
    });
    gpCell.addEventListener("mouseout", function () {
        gpTip.innerText="";
    });
    gpTip.addEventListener("mouseover", function() {
        gpTip.innerText="*Games remaining this week / Games this week";
    });
    gpTip.addEventListener("mouseout", function () {
        gpTip.innerText="";
    });
}

init();