const Teams = [
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
var teams = Teams.join(",") + ",";

season_start = "2019-10-21";

//get today's unformatted date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

const week_to_date = {
  "1": "2019-10-21",
  "2": "2019-10-28",
  "3": "2019-11-4",
  "4": "2019-11-11",
  "5": "2019-11-18",
  "6": "2019-11-25",
  "7": "2019-12-2",
  "8": "2019-12-9",
  "9": "2019-12-16",
  "10": "2019-12-23",
  "11": "2019-12-30",
  "12": "2020-1-6",
  "13": "2020-1-13",
  "14": "2020-1-20",
  "15": "2020-1-27",
  "16": "2020-2-3",
  "17": "2020-2-10",
  "18": "2020-2-24",
  "19": "2020-3-2",
  "20": "2020-3-9",
  "21": "2020-3-16",
  "22": "2020-3-23",
  "23": "2020-3-30",
  "24": "2020-4-6",
  "25": "2020-4-13",
  "26": "2020-4-20",
  "27": "2020-4-27"
};

//globals
var Schedule = {};
var leftName;
var rightName;
var statsLeft = [];
var statsRight = [];
var pTable;
var header;
var scoreLeft = 0;
var scoreRight = 0;
var numTables = 0;
var tableSingle;
var tableLeft;
var tableRight;
var tables = [];
var leftPlayerList = [];
var leftPlayerFilteredList = [];
var rightPlayerList = [];
var rightPlayerFilteredList = [];
var categories;
function defineLayoutBySearch() {
  tables = document.querySelectorAll('[id^="statTable"]');
  numTables = tables.length;

  if (tables.length == 0) {
    setTimeout(function() {
      var matchup = document.getElementById("matchup");
      //console.log("first table null");
      table = matchup.childNodes[0];
      //console.log("new table: ", table);
    }, 1000);
  }
}

function defineLayout() {
  table = document.getElementById("statTable3");

  if (table) {
    numTables = 1;
    //console.log("one table found");
    return;
  }

  tableLeft = document.getElementById("statTable0");
  tableRight = document.getElementById("statTable1");

  if (tableLeft) {
    numTables = 2;
    //console.log("two tables found");
    return;
  }
}

function findMatchupsTable() {
  header = document.getElementById("matchup-wall-header");
  hNodes = header.childNodes;
  for (h = 0; h < hNodes.length; h++) {
    if (hNodes[h].localName == "table") {
      return hNodes[h];
    }
  }
}

function initTable() {
  //console.log("copying table...");
  //find stats headers
  var mTable = findMatchupsTable();
  categories = mTable.tHead.innerText;
  categories = categories.split("\n");
  categories = categories.filter(function(str) {
    return /\S/.test(str);
  });
  categories = categories.filter(e => e !== "Team");
  categories = categories.filter(e => e !== "Score");

  pTable = mTable.cloneNode(true);
  header = document.getElementById("matchup-wall-header");

  header.appendChild(pTable);
  pTable.style.marginTop = "10px";
  addTitles();
  //console.log("table copied");
}
function addTitles() {
  pTable.rows[0].cells[0].innerText = "WZRD Projections†";
  var p = document.createElement("p");
  var proj = document.createElement("span");
  var formula = document.createElement("span");
  proj.innerText = "†Projections: ";
  proj.style.fontWeight = "600";
  formula.innerText =
    "# of games this week * Yahoo! projected averages per game";
  p.appendChild(proj);
  p.appendChild(formula);
  p.setAttribute("class", "Ta-c C-grey Mt-10");
  pTable.insertAdjacentElement("afterend", p);
}
function getProjectionsColor(ratio) {
  if (ratio == 0) {
    return "white";
  } else if (ratio <= 0.1) {
    return "#ff3b3b";
  }
  if (ratio <= 0.2) {
    return "#ff4e4e";
  }
  if (ratio <= 0.3) {
    return "#ff6262";
  }
  if (ratio <= 0.4) {
    return "#ff7676";
  }
  if (ratio <= 0.5) {
    return "#ff8989";
  }
  if (ratio <= 0.6) {
    return "#ff9d9d";
  }
  if (ratio <= 0.7) {
    return "#ffb1b1";
  }
  if (ratio <= 0.8) {
    return "#ffc4c4";
  }
  if (ratio <= 0.9) {
    return "#ffd8d8";
  }
  if (ratio <= 1.0) {
    return "#ffebeb";
  }
  if (ratio <= 1.1) {
    return "#ebffeb";
  }
  if (ratio <= 1.2) {
    return "#d8ffd8";
  }
  if (ratio <= 1.3) {
    return "#c4ffc4";
  }
  if (ratio <= 1.4) {
    return "#b1ffb1";
  }
  if (ratio <= 1.5) {
    return "#9dff9d";
  }
  if (ratio <= 1.6) {
    return "#89ff89";
  }
  if (ratio <= 1.7) {
    return "#76ff76";
  }
  if (ratio <= 1.8) {
    return "#62ff62";
  }
  if (ratio <= 1.9) {
    return "#4eff4e";
  }
  if (ratio <= 2) {
    return "#3bff3b";
  }
  if (ratio <= 2.1) {
    return "#3bff3b";
  }
  if (ratio <= 1000) {
    return "#18f204";
  } else return "#dee8f7";
}

function getFormattedDate() {
  var d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function getDateFromURL(url) {
  url = url.split("week=")[1];
  date = url.split("&")[0];
  return date;
}

function getLeagueID() {
  var url = window.location.href.split("/");

  for (var u = 0; u < url.length; u++) {
    if (url[u] == "nba") {
      return url[u + 1];
    }
  }
}

function getGamesRemaining(team) {
  //console.log("fetching NBA stats...");
  var dateString;
  url = window.location.href;
  if (url.includes("week=") && !url.includes("date=totals")) {
    dateString = getDateFromURL(url);
    dateString = week_to_date[dateString];
  } else if (today < season_start) {
    dateString = season_start;
  } else {
    dateString = getFormattedDate();
  }

  //console.log("initialized dateString");

  //console.log("dateString: ", dateString);

  //console.log("url: ", url);
  chrome.runtime.sendMessage(
    {
      endpoint: "gamesremaining",
      pageName: "yMatchupsPage",
      teams: team,
      leagueID: getLeagueID(),
      date: dateString
    },
    function(response) {
      //console.log("data: ", data);
      //console.log("games: ", games);
      var data = response.data;
      for (var t = 0; t < Teams.length; t++) {
        team = Teams[t];
        Schedule[team.toUpperCase()] = data[t];
      }
      //console.log("NBA stats retrieved");
      if (numTables == 1) {
        getPlayersOneTable();
      } else {
        getPlayersTwoTables();
      }
    }
  );
}

function serializePlayer(p) {
  p = p.replace(/ /g, "");
  p = p.replace("-", "");
  p = p.replace(".", "");
  p = p.replace(".", "");
  return p;
}

function getNoteIndex(row) {
  noteIndex = row.indexOf("Player Note");
  if (noteIndex == -1) {
    noteIndex = row.indexOf("No new player Notes");
  }
  if (noteIndex == -1) {
    noteIndex = row.indexOf("New Player Note");
  }
  return noteIndex;
}

function getPlayersOneTable() {
  //console.log("loading single table players...");
  var num_rows = table.rows.length;
  addToggleColumnHeader();
  var playersLeft = [];
  var playersRight = [];
  var injuredPlayersLeft = [];
  var injuredPlayersRight = [];
  for (var i = 1; i < num_rows; i++) {
    var row = table.rows[i].innerText.split("\n");

    if (row.includes("--")) {
      continue;
    }

    //console.log("row: ", row);

    var noteIndex = getNoteIndex(row.slice(0, row.length / 2 - 1));
    var playerIndex = noteIndex + 1;
    var playerLeft = row[playerIndex].split(" - ")[0];
    playerLeft = serializePlayer(playerLeft);

    if (playerLeft != "O" && playerLeft.length > 0) {
      if (playerLeft.includes("Empty")) {
        addToggle("left", playerIndex + 1, table, i, true);
      } else {
        playersLeft.push(playerLeft);
        addToggle("left", playerIndex + 1, table, i);
        //or playerLeft=="0"
        if (row[playerIndex + 1] === "INJ") {
          injuredPlayersLeft.push(playerLeft);
        }
      }
    }

    row = row.slice(noteIndex + 2, row.length);

    noteIndex = getNoteIndex(row);
    playerIndex = noteIndex + 1;
    var playerRight = "";
    if (playerIndex === 0) {
      playerRight = "Empty";
    } else {
      playerRight = row[playerIndex].split(" - ")[0];
      playerRight = serializePlayer(playerRight);
      var rightToggleIndex = getRightToggleIndex(table);
    }

    if (playerRight != "O" && playerRight.length > 0) {
      if (playerRight.includes("Empty")) {
        addToggle("right", rightToggleIndex - 1, table, i, true);
      } else {
        playersRight.push(playerRight);
        addToggle("right", rightToggleIndex, table, i);
        //or playerRight == "O"
        if (row[playerIndex + 1] === "INJ") {
          injuredPlayersRight.push(playerRight);
        }
      }
    }
  }

  leftString = playersLeft.join(",") + ",";
  //console.log("leftString: ", leftString);
  getProjections(leftString, "left", injuredPlayersLeft);

  rightString = playersRight.join(",") + ",";
  //console.log("rightString: ", rightString);
  getProjections(rightString, "right", injuredPlayersRight);

  //console.log("single table players loaded");
}

//gets index of column of the 2nd occurrence of "player" + 1.
// call before adding a toggle or it will be misalinged
function getRightToggleIndex(table) {
  let headerRow = table.rows[0];
  for (let i = 2; i < headerRow.cells.length; i++) {
    let cell = headerRow.cells[i];
    if (cell.innerText === "Player") {
      return i + 1;
    }
  }
}

//adds a single toggle
function addToggle(side, cellIndex, table, rowIndex, empty) {
  if (empty) {
    var toggleTD = table.rows[rowIndex].insertCell(cellIndex + 1);
    var div = document.createElement("div");
    div.innerText = " ";
    toggleTD.appendChild(div);
    return;
  }
  var playerStr = "";
  playerStr =
    table.rows[rowIndex].cells[cellIndex - 1].children[0].children[0]
      .children[0].children[1].innerText;
  var isInjured = table.rows[rowIndex].cells[
    cellIndex - 1
  ].children[0].children[0].innerText.includes("INJ");
  var playerKey = makePlayerKey(playerStr);
  var toggleTD = table.rows[rowIndex].insertCell(cellIndex);
  var div = document.createElement("div");
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("playerKey", playerKey);
  input.checked = !isInjured;
  div.appendChild(input);
  toggleTD.appendChild(div);

  input.addEventListener("change", event => onCheckboxChange(event, side));
}

function onCheckboxChange(event, side) {
  var targetPlayer = event.target.getAttribute("playerKey");
  var remove = !event.target.checked;
  var list = [];
  list = getFilteredPlayerList(remove, side, targetPlayer);
  if (side === "left") {
    leftPlayerFilteredList = list;
  } else if (side === "right") {
    rightPlayerFilteredList = list;
  }

  showProjections(list, side);
}
//removes or adds given player from filtered list from corresponding side and returns new list
function getFilteredPlayerList(remove, side, playerKey) {
  var newList = [];
  if (remove) {
    if (side === "left") {
      for (var i = 0; i < leftPlayerFilteredList.length; i++) {
        if (leftPlayerFilteredList[i].playerID !== playerKey) {
          newList.push(leftPlayerFilteredList[i]);
        }
      }
    } else if (side === "right") {
      for (var i = 0; i < rightPlayerFilteredList.length; i++) {
        if (rightPlayerFilteredList[i].playerID !== playerKey) {
          newList.push(rightPlayerFilteredList[i]);
        }
      }
    }
  } else {
    var playerToAdd;
    if (side === "left") {
      newList = leftPlayerFilteredList;
      playerToAdd = leftPlayerList.find(function(element) {
        return element.playerID === playerKey;
      });
      newList.push(playerToAdd);
    } else if (side === "right") {
      newList = rightPlayerFilteredList;
      playerToAdd = rightPlayerList.find(function(element) {
        return element.playerID === playerKey;
      });
      newList.push(playerToAdd);
    }
  }
  return newList;
}

//adds headers for new column that will be inserted for toggles
function addToggleColumnHeader() {
  if (numTables === 1) {
    //header for left side
    var leftToggleTH = table.rows[0].insertCell(2);
    var div = document.createElement("div");
    div.innerText = "prj";
    leftToggleTH.appendChild(div);

    //header for right side
    rightHeaderIndex = getRightToggleIndex(table);
    rightToggleTH = table.rows[0].insertCell(rightHeaderIndex);
    var div2 = document.createElement("div");
    div2.innerText = "prj";
    rightToggleTH.appendChild(div2);
  }
}
function getPlayersTwoTables() {
  //console.log("loading two table players...");
  playersLeft = [];
  playersRight = [];

  for (i = 1; i < tableLeft.rows.length; i++) {
    row = tableLeft.rows[i].innerText.split("\n");
    if (row.includes("--") || row.includes("IL")) {
      continue;
    }

    noteIndex = getNoteIndex(row.slice(0, row.length / 2 - 1));
    playerIndex = noteIndex + 1;
    playerLeft = row[playerIndex].split(" - ")[0];
    playerLeft = serializePlayer(playerLeft);
    if (
      !playerLeft.includes("Empty") &&
      playerLeft != "O" &&
      playerLeft.length > 0 &&
      row[playerIndex + 1] != "INJ"
    ) {
      playersLeft.push(playerLeft);
    }
  }

  for (i = 1; i < tableRight.rows.length; i++) {
    row = tableRight.rows[i].innerText.split("\n");
    if (row.includes("--") || row.includes("IL")) {
      continue;
    }

    noteIndex = getNoteIndex(row.slice(0, row.length / 2 - 1));
    playerIndex = noteIndex + 1;
    playerRight = row[playerIndex].split(" - ")[0];
    playerRight = serializePlayer(playerRight);
    if (
      !playerRight.includes("Empty") &&
      playerRight != "O" &&
      playerRight.length > 0 &&
      row[playerIndex + 1] != "INJ"
    ) {
      playersRight.push(playerRight);
    }
  }

  leftString = playersLeft.join(",") + ",";
  //console.log("leftString: ", leftString);
  getProjections(leftString, "left");

  rightString = playersRight.join(",") + ",";
  //console.log("rightString: ", rightString);
  getProjections(rightString, "right");

  //console.log("two table players loaded");
}

function getProjections(playersString, side, injuredPlayers) {
  chrome.runtime.sendMessage(
    {
      endpoint: "getplayers",
      players: playersString
    },
    function(response) {
      var data = response.data;
      if (side === "left") {
        leftPlayerList = data;
        leftPlayerFilteredList = data;
        if (injuredPlayers) {
          for (var i = 0; i < injuredPlayers.length; i++) {
            leftPlayerFilteredList = getFilteredPlayerList(
              true,
              side,
              injuredPlayers[i]
            );
          }
        }
        showProjections(leftPlayerFilteredList, side);
      } else if (side === "right") {
        rightPlayerList = data;
        rightPlayerFilteredList = data;
        if (injuredPlayers) {
          for (var i = 0; i < injuredPlayers.length; i++) {
            rightPlayerFilteredList = getFilteredPlayerList(
              true,
              side,
              injuredPlayers[i]
            );
          }
        }
        showProjections(rightPlayerFilteredList, side);
      }
    }
  );
}

function incrementScore(ratio) {
  if (ratio > 1) {
    return 1;
  } else {
    return 0;
  }
}

function updateScores(scoreLeft, scoreRight) {
  len = pTable.rows[1].cells.length - 1;
  pTable.rows[1].cells[len].innerText = String(scoreLeft);
  pTable.rows[2].cells[len].innerText = String(scoreRight);
}

function showProjections(data, side) {
  //console.log("showProjections -- ", side, ": ", data);
  scoreLeft = 0;
  scoreRight = 0;
  //add text
  for (cat = 0; cat < categories.length; cat++) {
    if (side == "left") {
      stat = calculateStats(data, categories[cat]);
      if (stat === "NaN" || stat === "undefined") {
        stat = ".000";
      }
      pTable.rows[1].cells[cat + 1].innerText = stat;
      //statsLeft.push(stat);
    }
    if (side == "right") {
      stat = calculateStats(data, categories[cat]);
      if (stat === "NaN" || stat === "undefined") {
        stat = ".000";
      }
      pTable.rows[2].cells[cat + 1].innerText = stat;
      //statsRight.push(stat);
    }
  }

  //add colors
  for (cat = 1; cat < categories.length + 1; cat++) {
    //left colors
    num = parseFloat(pTable.rows[1].cells[cat].innerHTML);
    den = parseFloat(pTable.rows[2].cells[cat].innerHTML);

    if (categories[cat - 1] == "TO") {
      ratio = den / num;
    } else {
      ratio = num / den;
    }
    if (categories[cat - 1].includes("*")) {
      color = "#f5f8fc";
    } else {
      color = getProjectionsColor(ratio);
      scoreLeft += incrementScore(ratio);
    }

    pTable.rows[1].cells[cat].style.backgroundColor = color;

    //right colors
    num = parseFloat(pTable.rows[2].cells[cat].innerHTML);
    den = parseFloat(pTable.rows[1].cells[cat].innerHTML);
    if (categories[cat - 1] == "TO") {
      ratio = den / num;
    } else {
      ratio = num / den;
    }
    if (categories[cat - 1].includes("*")) {
      color = "#f5f8fc";
    } else {
      color = getProjectionsColor(ratio);
      scoreRight += incrementScore(ratio);
    }

    pTable.rows[2].cells[cat].style.backgroundColor = color;
  }

  //console.log("left: ", scoreLeft);
  //console.log("right: ", scoreRight);

  updateScores(scoreLeft, scoreRight);
}

function calculateStats(data, cat) {
  //console.log("calculating... ", cat);

  if (cat == "FG%") {
    var fgm = 0;
    var fga = 0;
    for (var i = 0; i < data.length; i++) {
      fgm +=
        parseFloat(data[i]["fgmpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
      fga +=
        parseFloat(data[i]["fgapg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(fgm / fga).toFixed(3);
  }
  if (cat == "FGM") {
    var fgm = 0;
    for (var i = 0; i < data.length; i++) {
      fgm +=
        parseFloat(data[i]["fgmpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(fgm).toFixed(1);
  }
  if (cat == "FGM/A*") {
    var fgm = 0;
    var fga = 0;
    for (var i = 0; i < data.length; i++) {
      fgm +=
        parseFloat(data[i]["fgmpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
      fga +=
        parseFloat(data[i]["fgapg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }

    fgm = fgm.toFixed(0);
    fga = fga.toFixed(0);

    return fgm + "/" + fga;
  }
  if (cat == "FT%") {
    var ftm = 0;
    var fta = 0;
    for (var i = 0; i < data.length; i++) {
      ftm +=
        parseFloat(data[i]["ftmpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
      fta +=
        parseFloat(data[i]["ftapg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(ftm / fta).toFixed(3);
  }
  if (cat == "FTM") {
    var ftm = 0;
    for (var i = 0; i < data.length; i++) {
      ftm +=
        parseFloat(data[i]["ftmpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(ftm).toFixed(1);
  }
  if (cat == "FTA") {
    var fta = 0;
    for (var i = 0; i < data.length; i++) {
      fta +=
        parseFloat(data[i]["ftapg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(fta).toFixed(1);
  }
  if (cat == "FTM/A*") {
    var ftm = 0;
    var fta = 0;
    for (var i = 0; i < data.length; i++) {
      ftm +=
        parseFloat(data[i]["ftmpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
      fta +=
        parseFloat(data[i]["ftapg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }

    ftm = ftm.toFixed(0);
    fta = fta.toFixed(0);

    return ftm + "/" + fta;
  }
  if (cat == "PTS") {
    var pts = 0;
    for (var i = 0; i < data.length; i++) {
      pts +=
        parseFloat(data[i]["ppg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(pts).toFixed(1);
  }
  if (cat == "OREB") {
    var reb = 0;
    for (var i = 0; i < data.length; i++) {
      reb +=
        parseFloat(data[i]["orpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(reb).toFixed(1);
  }
  if (cat == "DREB") {
    var reb = 0;
    for (var i = 0; i < data.length; i++) {
      reb +=
        parseFloat(data[i]["drpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(reb).toFixed(1);
  }
  if (cat == "REB") {
    var reb = 0;
    for (var i = 0; i < data.length; i++) {
      reb +=
        parseFloat(data[i]["rpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(reb).toFixed(1);
  }
  if (cat == "AST") {
    var ast = 0;
    for (var i = 0; i < data.length; i++) {
      ast +=
        parseFloat(data[i]["apg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(ast).toFixed(1);
  }
  if (cat == "ST") {
    var stl = 0;
    for (var i = 0; i < data.length; i++) {
      stl +=
        parseFloat(data[i]["spg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(stl).toFixed(1);
  }
  if (cat == "BLK") {
    var blk = 0;
    for (var i = 0; i < data.length; i++) {
      blk +=
        parseFloat(data[i]["bpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(blk).toFixed(1);
  }
  if (cat == "TO") {
    var to = 0;
    for (var i = 0; i < data.length; i++) {
      to +=
        parseFloat(data[i]["topg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(to).toFixed(1);
  }
  if (cat == "3PT%") {
    var threepm = 0;
    var threepa = 0;
    for (var i = 0; i < data.length; i++) {
      threepm +=
        parseFloat(data[i]["threepm"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
      threepa +=
        parseFloat(data[i]["threepa"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(threepm / threepa).toFixed(3);
  }
  if (cat == "3PTM*" || cat == "3PTM") {
    var threes = 0;
    for (var i = 0; i < data.length; i++) {
      threes +=
        parseFloat(data[i]["threepm"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(threes).toFixed(1);
  }
  if (cat == "3PTA") {
    var threesa = 0;
    for (var i = 0; i < data.length; i++) {
      threesa +=
        parseFloat(data[i]["threepa"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(threesa).toFixed(1);
  }
  if (cat == "DD") {
    var dd = 0;
    for (var i = 0; i < data.length; i++) {
      dd +=
        parseFloat(data[i]["ddpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(dd).toFixed(1);
  }
  if (cat == "TD") {
    var td = 0;
    for (var i = 0; i < data.length; i++) {
      td +=
        parseFloat(data[i]["tdpg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(td).toFixed(1);
  }
  if (cat == "A/T") {
    var apg = 0;
    var topg = 0;
    for (var i = 0; i < data.length; i++) {
      apg +=
        parseFloat(data[i]["apg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
      topg +=
        parseFloat(data[i]["topg"]) *
        parseFloat(Schedule[data[i]["team"]].split("/")[1]);
    }
    return parseFloat(apg / topg).toFixed(1);
  }

  return "N/A";
}

function isDateSelected() {
  var bar = document.getElementById("yspmaincontent").children[0].children[0]
    .children[0].children[1].children[0].children[0];
  for (var i = 1; i < bar.children.length; i++) {
    if (
      bar.children[i].getAttribute("class").includes("Selected") &&
      !bar.children[i].innerText.includes("Matchup Totals")
    ) {
      return true;
    }
  }
}
if (
  !isDateSelected() &&
  !document.getElementsByTagName("body")[0].innerText.includes("Orig Proj")
) {
  defineLayout();
  initTable();
  getGamesRemaining(teams);
}
