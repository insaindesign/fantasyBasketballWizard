//transactionTrendsPage.js
//Populates the transaction trends page with number of games for the week
Teams = [
  "Atl",
  "Bos",
  "Bkn",
  "Cha",
  "Chi",
  "Cle",
  "Dal",
  "Den",
  "Det",
  "GS",
  "Hou",
  "Ind",
  "LAC",
  "LAL",
  "Mem",
  "Mia",
  "Mil",
  "Min",
  "NO",
  "NY",
  "OKC",
  "Orl",
  "Phi",
  "Pho",
  "Por",
  "Sac",
  "SA",
  "Tor",
  "Uta",
  "Was"
];
var teamsString = "teams=";

//main function that initializes everything.
function init() {
  renderGames();
  addDropDown();
  var dropdown = document.getElementById("dropdown");
  dropdown.addEventListener("change", function() {
    var weekNum = getWeekNumFromDropdown();
    resetGames(weekNum);
  });
}

//check values from that <td> to values from the Teams array to find the team abbreviation
function getTeamFromInfo(playerInfo) {
  for (var j = 0; j < Teams.length; j++) {
    if (Teams.includes(playerInfo[j])) {
      var team = playerInfo[j];
      break;
    }
  }
  return team;
}

//determine color based on number of games
function getColor(games) {
  if (games == "0/0") {
    return "#56d2ff";
  }
  var games = parseInt(games.split("/")[0]);
  if (games == 5) {
    return "#7ee57e";
  } else if (games == 4) {
    return "#adebad";
  } else if (games == 3) {
    return "#d8ffcc";
  } else if (games == 2) {
    return "#ffffcc";
  } else if (games == 1) {
    return "#ffd6cc";
  } else if (games == 0) {
    return "#f97a7a";
  } else {
    return "white";
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
  var option = document.createElement("option");
  option.setAttribute("value", 0);
  option.innerText = "Today";
  select.appendChild(option);
  for (var i = 1; i <= 24; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerText = "Wk" + i;
    if (i != 17) {
      option.innerText = "Wk" + i;
    } else {
      option.innerText = "Wk" + i + "/18";
      i++;
    }
    select.appendChild(option);
  }
  //console.log(select);
  var div = document.createElement("div");
  div.innerText = "wk";
  div.setAttribute("class", "navtarget");
  select.style.cssFloat = "right";
  select.style.letterSpacing = "initial";
  document
    .getElementsByClassName("Nav-h Py-med No-brdbot Tst-pos-nav")[0]
    .appendChild(select);
}

//sets the number of games in the games column for the new week selected by the user
function resetGames(weekNum) {
  var gameColumn = document.getElementsByClassName("gameColumn");
  var rows = document.getElementsByClassName("Tst-table Table")[0].rows;
  var playerInfo;

  //console.log(teamsString)
  var dateString = "date=" + "2019-10-22";
  var leagueIDString = "leagueID=" + getLeagueID();
  //console.log("dateString = " + dateString);
  var url =
    "https://www.sportswzrd.com/gamesremaining/?pageName=weekSelect&" +
    teamsString +
    "&format=json" +
    "&weekNum=" +
    weekNum +
    "&" +
    dateString +
    "&" +
    leagueIDString;
  //remove weekNum if retrieving games for today
  if (weekNum == 0) {
    url = url.replace("weekNum=" + weekNum, "");
  }
  //console.log("weekNum=" + weekNum);
  chrome.runtime.sendMessage({ url: url }, function(response) {
    var data = response.data;
    var gameColumn = document.getElementsByClassName("gameColumn");
    //console.log(data)
    for (var i = 0; i < rows.length - 1; i++) {
      gameColumn[i].innerText = data[i];
      gameColumn[i].style.backgroundColor = getColor(data[i]);
    }
  });
  /*fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        //console.log('Called to backend failed: ' + response.status);
        return;
      }

      response.json().then(function(data) {
        var gameColumn = document.getElementsByClassName("gameColumn");
        //console.log(data)
        for (var i = 0; i < rows.length - 1; i++) {
          gameColumn[i].innerText = data[i];
          gameColumn[i].style.backgroundColor = getColor(data[i]);
        }
      });
    })
    .catch(function(err) {
      //console.log('Fetch Error :-S', err);
    });*/
}

function getFormattedDate() {
  var d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function getLeagueID() {
  return document
    .getElementById("league-info")
    .firstElementChild.firstElementChild.innerText.split("# ")[1]
    .replace(")", "");
}

//initial appending of new colum for current week with games
function renderGames() {
  var rows = document.getElementsByClassName("Tst-table Table")[0].rows;
  var playerInfo;

  //go through rows of table
  for (var i = 1; i < rows.length; i++) {
    //grab all text from the <td> that includes the team/player name
    playerInfo = rows[i].cells[1].innerText.split(" ");
    teamsString += getTeamFromInfo(playerInfo) + ",";
  }
  //console.log(teamsString)
  var dateString = getFormattedDate();
  var leagueIDString = "leagueID=" + getLeagueID();
  //console.log("dateString = " + dateString);
  var url =
    "https://www.sportswzrd.com/gamesremaining/?pageName=transactionTrends&" +
    teamsString +
    "&format=json&date=" +
    dateString +
    "&" +
    leagueIDString;
  //console.log("before request");
  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        //console.log('Called to backend failed: ' + response.status);
        return;
      }

      response.json().then(function(data) {
        addGames(data);
      });
    })
    .catch(function(err) {
      //console.log('Fetch Error :-S', err);
    });
}

function addGames(data) {
  //console.log("in add Games");
  //console.log(data);
  var table = document.getElementsByClassName("Tst-table Table")[0];
  var rows = table.rows;
  var newCell;
  var gpHeader = document.createElement("th");
  gpHeader.innerText = "Gr/G*";
  var gpCell = table.rows[0].appendChild(gpHeader);
  var gpTip = document.createElement("div");
  gpTip.setAttribute("style", "text-align: right; color: #757575");
  document.getElementsByClassName("Hd No-p")[1].appendChild(gpTip);

  for (var i = 1; i < rows.length; i++) {
    //create new cell and fill with proper attributes/data
    var numGames = data[i - 1];
    newCell = rows[i].insertCell(9);
    rows[i].cells[5].setAttribute("class", "Bdrend");
    newCell.style.border.color = "#e7e7e7";
    newCell.innerText = numGames;
    newCell.style.textAlign = "center";
    newCell.style.backgroundColor = getColor(numGames);
    newCell.setAttribute("class", "gameColumn");
  }
  gpCell.addEventListener("mouseover", function() {
    gpTip.innerText = "*Games remaining this week / Games this week";
  });
  gpCell.addEventListener("mouseout", function() {
    gpTip.innerText = "";
  });
  gpTip.addEventListener("mouseover", function() {
    gpTip.innerText = "*Games remaining this week / Games this week";
  });
  gpTip.addEventListener("mouseout", function() {
    gpTip.innerText = "";
  });
}

init();
