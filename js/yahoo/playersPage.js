//playersPage.js
//Populates player page with number of games for the week
//--------------------------------Schedule-------------------------------------
Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]
var teamsString = "teams=Atl,Bos,Bkn,Cha,Chi,Cle,Dal,Den,Det,GS,Hou,Ind,LAC,LAL,Mem,Mia,Mil,Min,NO,NY,OKC,Orl,Phi,Pho,Por,Sac,SA,Tor,Uta,Was,"
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


//alert("hi");
var dateString = getFormattedDate();
var leagueIDString = "leagueID=1111111";
var url = 'https://www.fantasywizard.site/gamesremaining/?pageName=test&' + teamsString + '&format=json&date=' + dateString + '&' + leagueIDString;

fetch(url).then(function (response) {
    if (response.status !== 200) {
        //console.log('Called to backend failed: ' + response.status);
        return;
    }

    response.json().then(function (data) {
        renderGames();
        

    });
    }).catch(function (err) {
        //console.log('Fetch Error :-S', err);
    });


    function renderGames() {
        var table = document.getElementsByClassName("Table Ta-start Fz-xs Table-mid Table-px-xs Table-interactive")[0];
        var rows = table.rows;
        var playerInfoDivs = document.getElementsByClassName("ysf-player-name Nowrap Grid-u Relative Lh-xs Ta-start");
        for(var i=0; i<rows.length; i++) {
            var playerInfo = playerInfoDivs[i].innerText.split(" ");
            for(var j=0; j<playerInfo.length; j++) {
                if(teamsString.includes(playerInfo[j])) {
                    console.log(playerInfo[j]);
                }
            }
        }
    }