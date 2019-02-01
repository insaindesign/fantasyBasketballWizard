//playersPage.js
//Populates player page with number of games for the week
//--------------------------------Schedule-------------------------------------
var Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"];
var teamsString = "teams=Atl,Bos,Bkn,Cha,Chi,Cle,Dal,Den,Det,GS,Hou,Ind,LAC,LAL,Mem,Mia,Mil,Min,NO,NY,OKC,Orl,Phi,Pho,Por,Sac,SA,Tor,Uta,Was,";
var gamesDictionary = {};
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

function getTeamString() {
    var str = "";
    var playerInfoDivs = document.getElementsByClassName("ysf-player-name Nowrap Grid-u Relative Lh-xs Ta-start");
    for (var i = 0; i < playerInfoDivs.length; i++) {
        var playerInfo = playerInfoDivs[i].innerText.split(" ");
        for (var j = 0; j < playerInfo.length; j++) {
            if (Teams.includes(playerInfo[j])) {
                str += playerInfo[j] + ",";
                //console.log(playerInfo[j]);
            }
        }
    }
    return str;   
}
function getGames() {
    if(document.getElementById("gamesHeader") != null ) {
        return;
    }
    var dateString = getFormattedDate();
    var leagueIDString = "leagueID=1111111";
    var teamsString = "teams=" + getTeamString();
    var url = 'https://www.fantasywizard.site/gamesremaining/?pageName=test&' + teamsString + '&format=json&date=' + dateString + '&' + leagueIDString;
    fetch(url).then(function (response) {
        if (response.status !== 200) {
            //console.log('Called to backend failed: ' + response.status);
            return;
        }
    
        response.json().then(function (data) {
        for(var i = 0; i < data.length; i++) {
            gamesDictionary[Teams[i]] = data[i];  
        }
        //console.log(data);
        renderGames(data);
        });
    }).catch(function (err) {
        //console.log('Fetch Error :-S', err);
    });
}



function renderGames(data) {
    var table = document.getElementsByClassName("Table Ta-start Fz-xs Table-mid Table-px-xs Table-interactive")[0];
    var rows = table.rows;
    var th = document.createElement("th");
    th.innerText = "Gr/G";
    th.setAttribute("id","gamesHeader");
    rows[1].appendChild(th);
    for(var i = 2; i<rows.length;i++) {
        //console.log(rows[i]);
        var td = document.createElement("td");
        var div = document.createElement("div");
        div.innerText = data[i-2];
        td.appendChild(div);
        td.style.backgroundColor = getColor(data[i-2])
        td.setAttribute("class","Last Ta-end");
        td.setAttribute("id", "gamesColumn");
        rows[i].appendChild(td);
    }
}
//<button id="fetchGamesButton" class="Btn-primary Mstart-xxs Va-bot">Fetch Games Remaining</button>
var button = document.createElement("button");
button.innerText = "Wizard Gr/G";
button.setAttribute("class","Btn-primary Mstart-xxs Va-bot Fw-b");
document.getElementsByClassName("playersearchbox Relative")[0].appendChild(button);
button.addEventListener("click", getGames);
getGames();

document.body.addEventListener("click", function(event){
    console.log(event);
    if(document.getElementById("gamesHeader") == null ) {
        setTimeout(() => {
            getGames();
        }, 1000);
    }
    else {
        return;
    }
}, true);