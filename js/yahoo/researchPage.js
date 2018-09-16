Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]

//--------Colors-----------
var lowColor = "#ffffcc";
var medColor = "#d8ffcc";
var highColor = "#adebad";
var whiteColor = "white";
var borderColor = "#e7e7e7";

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

function getFormattedDate() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}


function newRenderGames() {
    
    var table = document.getElementById("buzzindextable"); 
    var players = [];
    var rows = table.rows;
    var playerInfo;
    var teamsString = "teams=";

    for(var i=1; i<rows.length; i++) {
        playerInfo = rows[i].cells[1].innerText.split(" ");
        for(var j=0; j<Teams.length; j++) {
            if(Teams.includes(playerInfo[j])) {
                console.log(playerInfo[j]);
                var teamAcronym = playerInfo[j];
                var rowNumber = i;
                teamsString = teamsString + teamAcronym + ",";
                break;
            }
        }
    }
    console.log(teamsString);

   // var Http = new XMLHttpRequest();
    var date = new Date(); //"2019-1-7" must be in this format. we need to pull from the matchups screen to display number of games
    var dateString = "2019-1-1";//getFormattedDate();
    console.log("dateString = " + dateString);
    var url = 'https://bilalsattar24.pythonanywhere.com/gamesthisweek/?'+teamsString+'&format=json&date='+dateString;
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
    var table = document.getElementById("buzzindextable"); 
    var rows = table.rows;
    var gpHeader = document.createElement("th");
    var gpCell = table.rows[0].appendChild(gpHeader);
    gpHeader.innerText = "G*";
    var gpTip = document.createElement("div");
    gpTip.setAttribute("style", "text-align: right; color: #757575");
    document.getElementById("Buzz Index Navigation").appendChild(gpTip);
    gpHeader.innerText = "G*";
    var playerInfo;


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
        var numGames = data[i-1];
        newCell = rows[i].insertCell(6);
        rows[i].cells[5].setAttribute("class", "Bdrend");
        newCell.style.border.color = borderColor;
        newCell.style.backgroundColor = getColor(numGames);
        newCell.innerText = data[i-1];
    }
    gpCell.addEventListener("mouseover", function() {
        gpTip.innerText="*Games this week";
    });
    gpCell.addEventListener("mouseout", function () {
        gpTip.innerText="";
    });
    gpTip.addEventListener("mouseover", function() {
        gpTip.innerText="*Games this week";
    });
    gpTip.addEventListener("mouseout", function () {
        gpTip.innerText="";
    });


}
newRenderGames();