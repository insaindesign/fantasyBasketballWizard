//can also get from backend but damn, this is easier in this case lol
//look through this array to find the team in the player info div
Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]


//determine color based on number of games
function getColor(games) {
    if (games == '0/0') {
        return "#56d2ff"
    }
    games = parseInt(games.split('/')[0]);
    if (games == 5) {
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
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function getLeagueID() {
    return document.getElementById("league-info").
    firstElementChild.firstElementChild.
    innerText.split("# ")[1].replace(')', '');
}


function renderGames() {
    var table = document.getElementById("buzzindextable");
    var players = [];
    var rows = table.rows;
    var playerInfo;
    var teamsString = "teams=";

    for (var i = 1; i < rows.length; i++) {
        playerInfo = rows[i].cells[1].innerText.split(" ");
        for (var j = 0; j < Teams.length; j++) {
            if (Teams.includes(playerInfo[j])) {
                //console.log(playerInfo[j]);
                var teamAcronym = playerInfo[j];
                var rowNumber = i;
                teamsString += teamAcronym + ",";
                break;
            }
        }
    }
    //console.log(teamsString);

    //"2019-1-7" must be in this format. we need to pull from the matchups screen to display number of games
    var dateString = getFormattedDate();
    var leagueIDString = 'leagueID=' + getLeagueID();
    //console.log('dateString = ' + dateString);
    var url = 'https://www.fantasywizard.site/gamesremaining/?pageName=research&' + teamsString + '&format=json&date=' + dateString + '&' + leagueIDString;
    //console.log("before request");
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                console.log('response status: ' + response.status);
                return;
            }

            response.json().then(function (data) {
                addGames(data);
            });
        }).catch(function (err) {
            console.log("EXCEPTION", err);
        });
}

function addGames(data) {
    //console.log("in add Games");
    var table = document.getElementById("buzzindextable");
    var rows = table.rows;
    var gpHeader = document.createElement("th");
    var gpCell = table.rows[0].appendChild(gpHeader);
    var gpTip = document.createElement("div");
    gpTip.setAttribute("style", "text-align: right; color: #757575");
    document.getElementById("Buzz Index Navigation").appendChild(gpTip);
    gpHeader.innerText = "Gr/G*";
    var playerInfo;


    for (var i = 1; i < rows.length; i++) {
        //grab all text from the <td> that includes the team/player name
        playerInfo = rows[i].cells[1].innerText.split(" ");

        //check values from that <td> to values from the Teams array to find the team abbreviation
        for (var j = 0; j < Teams.length; j++) {
            if (Teams.includes(playerInfo[j])) {
                team = playerInfo[j];
                break;
            }
        }

        //create new cell and fill with proper attributes/data
        var numGames = data[i - 1];
        newCell = rows[i].insertCell(6);
        rows[i].cells[5].setAttribute("class", "Bdrend");
        newCell.style.border.color = "#e7e7e7";
        newCell.style.textAlign = "center";
        newCell.style.backgroundColor = getColor(numGames);
        newCell.innerText = data[i - 1];
    }
    gpCell.addEventListener("mouseover", function () {
        gpTip.innerText = "*Games remaining this week / Games this week";
    });
    gpCell.addEventListener("mouseout", function () {
        gpTip.innerText = "";
    });
    gpTip.addEventListener("mouseover", function () {
        gpTip.innerText = "*Games remaining this week / Games this week";
    });
    gpTip.addEventListener("mouseout", function () {
        gpTip.innerText = "";
    });
}
renderGames();