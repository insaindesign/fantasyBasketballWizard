/* 
    Fantasy Basketball Wizard #1 Chrome Extension (ever) for Fantasy Sports
    
    espn.js

    Written by: JL
*/

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Global Variables
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

const DAILY_LEAGUE = "Daily";
const PAGE_TYPE_ADDED_DROPPED = "Added Dropped";
const PAGE_TYPE_BOXSCORE = "Boxscore";
const PAGE_TYPE_FANTASY_CAST = "Fantasy Cast";
const PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES = "Fantasy Cast Most Categories";
const PAGE_TYPE_FANTASY_CAST_POINTS = "Fantasy Cast Points";
const PAGE_TYPE_PLAYERS = "Players";
const PAGE_TYPE_TEAM = "Team";
const PAGE_TYPE_TEAM_NEWS = "News";
const PAGE_TYPE_TEAM_TRENDING = "Trending";
const PAGE_TYPE_TEAM_SCHEDULE = "Schedule";
const PAGE_TYPE_TEAM_STATS = "Stats";
const PAGE_TYPE_TEAM_SWITCH_DATES = "Switch Dates";
const PAGE_TYPE_UNDEFINED = "Undefined";
const WEEKLY_LEAGUE = "Weekly";

var acronymEspnToYahoo = {};
var currentPageType = "";
var dailyOrWeekly = ""; // Value of daily or weekly league
var localGamesDataDict = {}; // Holds the game remaining data
var updateHeaders = false; // Flag to update headers

acronymEspnToYahoo["Atl"] = "Atl";
acronymEspnToYahoo["Bos"] = "Bos";
acronymEspnToYahoo["Bkn"] = "Bkn";
acronymEspnToYahoo["Cha"] = "Cha";
acronymEspnToYahoo["Chi"] = "Chi";
acronymEspnToYahoo["Cle"] = "Cle";
acronymEspnToYahoo["Dal"] = "Dal";
acronymEspnToYahoo["Den"] = "Den";
acronymEspnToYahoo["Det"] = "Det";
acronymEspnToYahoo["GS"] = "GS";
acronymEspnToYahoo["Hou"] = "Hou";
acronymEspnToYahoo["Ind"] = "Ind";
acronymEspnToYahoo["LAC"] = "LAC";
acronymEspnToYahoo["LAL"] = "LAL";
acronymEspnToYahoo["Mem"] = "Mem";
acronymEspnToYahoo["Mia"] = "Mia";
acronymEspnToYahoo["Mil"] = "Mil";
acronymEspnToYahoo["Min"] = "Min";
acronymEspnToYahoo["NO"] = "NO";
acronymEspnToYahoo["NY"] = "NY";
acronymEspnToYahoo["OKC"] = "OKC";
acronymEspnToYahoo["Orl"] = "Orl";
acronymEspnToYahoo["Phi"] = "Phi";
acronymEspnToYahoo["Phx"] = "Pho";
acronymEspnToYahoo["Por"] = "Por";
acronymEspnToYahoo["Sac"] = "Sac";
acronymEspnToYahoo["SA"] = "SA";
acronymEspnToYahoo["Tor"] = "Tor";
acronymEspnToYahoo["Utah"] = "Uta";
acronymEspnToYahoo["Wsh"] = "Was";

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Helper Functions
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    buildSelectDateRequestString - creates a date request string for the
    the parameter for the server request for either daily or weekly leagues
*/
function buildSelectDateRequestString() {
  // console.log( "buildSelectDateRequestString" );
  var currentElements = document.getElementsByClassName("is-current");
  var resultDateRequestString = "";
  // console.log( dailyOrWeekly );
  if (dailyOrWeekly == DAILY_LEAGUE) {
    var currentDateDiv = currentElements[0];
    var currentDateChildren = currentDateDiv.children[0];
    var currentMonthDate = currentDateChildren.innerHTML;
    var currentMonthDateSplit = currentMonthDate.split(" ");
    var selectedMonth = currentMonthDateSplit[0];
    var selectedDate = currentMonthDateSplit[1];
    resultDateRequestString = resultDateRequestString.concat(
      formatDateString(selectedMonth, selectedDate)
    );
  } else if (dailyOrWeekly == WEEKLY_LEAGUE) {
    //console.log(document.getElementsByClassName("Table2__header-group Table2__thead"))
    var currentDateDiv = document.getElementsByClassName("Table2__header-group Table2__thead");
    if(currentDateDiv[0].children[0].children[1].innerHTML.length == 10){
      var dateArr = currentDateDiv[0].children[0].children[1].innerHTML.split(" ")
      var selectedMonth = dateArr[0].slice(0,3);
      var selectedDate = dateArr[1];
      resultDateRequestString = resultDateRequestString.concat(
        formatDateString(selectedMonth, selectedDate));
    }
    else{
      var currentDateDiv = currentDateDiv[0].children[0].children[1].innerHTML;
      var date = currentDateDiv.slice(6,12);
      var dateArr = date.split(" ");
      var selectedMonth = dateArr[0];
      var selectedDate = dateArr[1];
      resultDateRequestString = resultDateRequestString.concat(
        formatDateString(selectedMonth, selectedDate));
    }
  }
  // console.log( "resultDateRequestString=" + resultDateRequestString );
  return resultDateRequestString;
}

/*
    buildDropdownSelectDateRequestString - creates a date request string for the
    the parameter for the server request for either daily or weekly leagues
*/
function buildDropdownSelectDateRequestString() {
  // console.log( "buildDropdownSelectDateRequestString" );
  var currentElements = document.getElementsByClassName("dropdown__select");
  var resultDateRequestString = "";
  var dropdownElement =
    currentElements[0].options[currentElements[0].selectedIndex];
  var selectedDate = dropdownElement.text;
  var selectedDateSplit = selectedDate.split(" ");
  var month = selectedDateSplit[0];
  var date = selectedDateSplit[1];
  var formattedDate = formatDateString(month, date);

  resultDateRequestString = resultDateRequestString.concat(formattedDate);

  return resultDateRequestString;
}

/*
    buildTodayDateRequestString - 
*/
function buildTodayDateRequestString() {
  // console.log( "buildTodayDateRequestString" );
  var resultDateRequestString = "";
  var todaysDate = new Date();
  var firstDayOfSeason = new Date("2019-10-22");
  // Getting today's date before regular season starts
  if (todaysDate <= firstDayOfSeason) {
    resultDateRequestString = resultDateRequestString.concat("2019-10-22");
  } else {
    resultDateRequestString = resultDateRequestString.concat(
      todaysDate.getFullYear() +
        "-" +
        (todaysDate.getMonth() + 1) +
        "-" +
        todaysDate.getDate()
    );
  }
  // console.log( "resultDateRequestString=" + resultDateRequestString );
  return resultDateRequestString;
}

/*
    buildDateRequestStringFantasyCast - creates part of the url 
    for the teams to request game data for.
*/
function buildDateRequestStringFantasyCast() {
  // console.log( "buildDateRequestStringFantasyCast" );
  var dateElements = document.getElementsByClassName("dropdown__select");
  var dateElement = dateElements[0];
  var selectedDate = dateElement[dateElement.selectedIndex].text;
  var selectedDateSplit = selectedDate.split(" ");
  var month = selectedDateSplit[0];
  var date = selectedDateSplit[1];
  var resultDateRequestString = "";
  // console.log( "selectedDate=" + selectedDate + ", month=" + month + ", date=" + date );
  var formattedDate = formatDateString(month, date);
  resultDateRequestString = resultDateRequestString.concat(formattedDate);

  //console.log( resultDateRequestString );
  return resultDateRequestString;
}

/*
    buildLeagueIdRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildLeagueIdRequestString() {
  // console.log( "buildLeagueIdRequestString()" );
  var entireUrl = window.location.href;
  // console.log( url );
  var url = new URL(entireUrl);
  return url.searchParams.get("leagueId");
}

/*
    buildTeamsRequestString - creates part of the url for the teams to 
    request game data for.
*/
function buildTeamsRequestString() {
  // console.log( "buildTeamsRequestString" );

  var listOfElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var teamsRequestString = "teams=";
  // console.log( localGamesDataDict );
  // console.log( "currentPageType=" + currentPageType );
  for (var i = 0; i < listOfElements.length; i++) {
    if (
      currentPageType == PAGE_TYPE_PLAYERS ||
      currentPageType == PAGE_TYPE_ADDED_DROPPED ||
      currentPageType == PAGE_TYPE_BOXSCORE ||
      currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS ||
      currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES
    ) {
      if (
        !(listOfElements[i].innerHTML in localGamesDataDict) &&
        listOfElements[i].innerHTML != "FA"
      ) {
        teamsRequestString += listOfElements[i].innerHTML + ",";
      }
    }
    // else if( currentPageType == PAGE_TYPE_ADDED_DROPPED )
    // {
    //     if( !( listOfElements[ i ].innerHTML in localGamesDataDict ) && listOfElements[ i ].innerHTML != "FA" )
    //     {
    //         teamsRequestString += listOfElements[ i ].innerHTML + ",";
    //     }
    // }
    else {
      if (listOfElements[i].innerHTML != "FA") {
        teamsRequestString += listOfElements[i].innerHTML + ",";
      }
    }
  }
  // console.log( teamsRequestString );
  return teamsRequestString;
}

/*
    buildPageNameRequestString -
*/
function buildPageNameRequestString() {
  // console.log( "buildPageNameRequestString" );
  var pageNameResult = "";

  if (currentPageType == PAGE_TYPE_TEAM) {
    pageNameResult += "espnTeamStats";
  } else if (currentPageType == PAGE_TYPE_PLAYERS) {
    pageNameResult += "espnPlayers";
  } else if (currentPageType == PAGE_TYPE_TEAM_TRENDING) {
    pageNameResult += "espnTeamTrending";
  } else if (currentPageType == PAGE_TYPE_TEAM_SCHEDULE) {
    pageNameResult += "espnTeamSchedule";
  } else if (currentPageType == PAGE_TYPE_TEAM_NEWS) {
    pageNameResult += "espnTeamNews";
  } else if (currentPageType == PAGE_TYPE_ADDED_DROPPED) {
    pageNameResult += "espnAddedDropped";
  } else if (currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS) {
    pageNameResult += "espnFantasyCastPoints";
  } else if (currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES) {
    pageNameResult += "espnFantasyCastMostCats";
  } else if (currentPageType == PAGE_TYPE_BOXSCORE) {
    pageNameResult += "espnBoxscore";
  }

  // console.log( pageNameResult );
  return pageNameResult;
}

/*
    buildPlayerProjectionsString -
*/
function buildPlayerProjectionsStrings() {
  // console.log( "buildPlayerProjectionsStrings" );
  var resultPlayersStrings = [];
  var teamOnePlayerNamesArray = [];
  var teamTwoPlayerNamesArray = [];
  var playerNameElements = document.getElementsByClassName(
    "player-column__athlete"
  );
  var teamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var teamOnePlayersString = "";
  var teamTwoPlayersString = "";
  var teamOneTable;
  var teamTwoTable;
  var tableElements = document.getElementsByClassName("Table2__table-fixed");

  teamOneTable = tableElements[0];

  //Used to differiate points and categories
  if (tableElements[2]) {
    teamTwoTable = tableElements[2];
  } else {
    teamTwoTable = tableElements[1];
  }

  for (var i = 0; i < playerNameElements.length; i++) {
    var fullPlayerName =
      playerNameElements[i].children[0].children[0].innerHTML;
    var playerNameSplit = fullPlayerName.split(" ");
    var formattedPlayerName = "";
    if (playerNameSplit.length == 2) {
      formattedPlayerName = playerNameSplit[0]
        .charAt(0)
        .concat(playerNameSplit[1]);
    }
    // Jr's, long last names
    else if (playerNameSplit.length == 3 && playerNameSplit[2] == "Jr.") {
      formattedPlayerName = playerNameSplit[0]
        .charAt(0)
        .concat(playerNameSplit[1] + "Jr");
    }
    var parentTable = playerNameElements[i].closest(".Table2__table-fixed");
    if ($(teamOneTable).is($(parentTable))) {
      teamOnePlayerNamesArray.push(formattedPlayerName);
    } else if ($(teamTwoTable).is($(parentTable))) {
      teamTwoPlayerNamesArray.push(formattedPlayerName);
    }
  }
  var teamNameIndex = 0;

  for (var i = 0; i < teamOnePlayerNamesArray.length; i++) {
    var parentTable = playerNameElements[teamNameIndex].closest(
      ".Table2__table-fixed"
    );
    if ($(teamOneTable).is($(parentTable))) {
      teamOnePlayerNamesArray[i] = teamOnePlayerNamesArray[i].concat(
        acronymEspnToYahoo[teamNameElements[teamNameIndex].innerHTML]
      );
      teamOnePlayersString += teamOnePlayerNamesArray[i] + ",";
    }
    teamNameIndex++;
  }
  for (var i = 0; i < teamTwoPlayerNamesArray.length; i++) {
    var parentTable = playerNameElements[teamNameIndex].closest(
      ".Table2__table-fixed"
    );
    if ($(teamTwoTable).is($(parentTable))) {
      teamTwoPlayerNamesArray[i] = teamTwoPlayerNamesArray[i].concat(
        acronymEspnToYahoo[teamNameElements[teamNameIndex].innerHTML]
      );
      teamTwoPlayersString += teamTwoPlayerNamesArray[i] + ",";
    }
    teamNameIndex++;
  }

  //console.log(teamTwoPlayersString)

  resultPlayersStrings.push(teamOnePlayersString);
  resultPlayersStrings.push(teamTwoPlayersString);
  return resultPlayersStrings;
}

/*
    formatDateString - formats a date string in YYYY-MM-DD
*/
function formatDateString(month, date) {
  // console.log( "formatDateString - month=" + month + ", date=" + date );
  var dateString = "";

  if (month == "Oct" || month == "10") {
    dateString = "2019-10-" + date;
  } else if (month == "Nov" || month == "11") {
    dateString = "2019-11-" + date;
  } else if (month == "Dec" || month == "12") {
    dateString = "2019-12-" + date;
  } else if (month == "Jan" || month == "1" || month == "01") {
    dateString = "2020-01-" + date;
  } else if (month == "Feb" || month == "2") {
    dateString = "2020-02-" + date;
  } else if (month == "Mar" || month == "3") {
    dateString = "2020-03-" + date;
  } else if (month == "Apr" || month == "4") {
    dateString = "2020-04-" + date;
  }
  // console.log( "dateString=" + dateString );
  return dateString;
}

/* 
    getActiveMenu - returns the active menu
*/
function getActiveMenu() {
  // console.log( "getActiveMenu" );
  var entireUrl = window.location.href;
  var url = new URL(entireUrl);
  var view = url.searchParams.get("view");

  // if nothing, then it is at Stats
  if (view != null) {
    return view.charAt(0).toUpperCase() + view.slice(1);
  } else {
    // console.log( "view is null" );
    return PAGE_TYPE_TEAM_STATS;
  }
}

/* 
    getBackgroundColor - returns the background color
    associated with the number of games.

    games - The number of games
*/
function getBackgroundColor(games) {
  if (games >= 4) {
    return "#a5d394";
  } else if (games == 3) {
    return "#d8ffcc";
  } else if (games == 2) {
    return "#ffffcc";
  } else if (games == 1) {
    return "#ffd6cc";
  } else if (games == 0) {
    return "#ff7770";
  }
}

/*
    getCurrentUrl - returns the current browser url
*/
function getCurrentUrl() {
  // console.log( window.location.href );
  return window.location.href;
}

function getNumberOfPlayersTeamPage() {
  // console.log( "getNumberOfPlayersTeamPage" );
  var playerElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );

  return playerElements.length;
}

function getPageTypeFromUrl(url) {
  // console.log( "getPageTypeFromUrl" );
  if (url.indexOf("basketball/team") != -1) {
    var activeMenu = getActiveMenu();
    // console.log( "activeMenu=" + activeMenu );
    isLeagueDailyOrWeekly();
    /*
    if (dailyOrWeekly == WEEKLY_LEAGUE) {
      currentPageType = WEEKLY_LEAGUE;
    */
    if (activeMenu == PAGE_TYPE_TEAM_SCHEDULE) {
      currentPageType = PAGE_TYPE_TEAM_SCHEDULE;
    } else if (activeMenu == PAGE_TYPE_TEAM_NEWS) {
      currentPageType = PAGE_TYPE_TEAM_NEWS;
    } else if (activeMenu == PAGE_TYPE_TEAM_TRENDING) {
      currentPageType = PAGE_TYPE_TEAM_TRENDING;
    } else if (activeMenu == PAGE_TYPE_TEAM_STATS) {
      currentPageType = PAGE_TYPE_TEAM;
    }
  } else if (url.indexOf("basketball/players/add") != -1) {
    currentPageType = PAGE_TYPE_PLAYERS;
  } else if (url.indexOf("basketball/addeddropped") != -1) {
    currentPageType = PAGE_TYPE_ADDED_DROPPED;
  } else if (url.indexOf("fantasycast") != -1) {
    currentPageType = PAGE_TYPE_FANTASY_CAST;
  } else if (url.indexOf("boxscore") != -1) {
    currentPageType = PAGE_TYPE_BOXSCORE;
  } else {
    return PAGE_TYPE_UNDEFINED;
  }
  // console.log( "currentPageType=" + currentPageType );
  return currentPageType;
}

/*
    isLeagueDailyOrWeekly - returns whether the league is daily or weekly
*/
function isLeagueDailyOrWeekly() {
  var dateElements = document.getElementsByClassName("is-current");
  if (dateElements.length > 0) {
    if (dateElements[0].innerHTML.indexOf("day") != -1) {
      dailyOrWeekly = DAILY_LEAGUE;
      return DAILY_LEAGUE;
    } else if (dateElements[0].innerHTML.indexOf("week") != -1) {
      dailyOrWeekly = WEEKLY_LEAGUE;
      return WEEKLY_LEAGUE;
    }
  }
}

/*
    isFantasyCastMostCatsOrPoints - returns whether the fantasy cast page
    is most categories or points
*/
function isFantasyCastMostCatsOrPoints() {
  // console.log( "isFantasyCastMostCatsOrPoints" );
  var teamScoreElements = document.getElementsByClassName("team-score");
  // console.log( "teamScoreElements.length=" +teamScoreElements.length );
  if (teamScoreElements.length == 2) {
    currentPageType = PAGE_TYPE_FANTASY_CAST_POINTS;
  } else if (teamScoreElements.length == 6) {
    currentPageType = PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES;
  }
}

/*
    sleep - to create a delay in some functions to help the dynamic ESPN
    page load and change different settings
*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        WEEK - GAMES HEADERS
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    addWeekGamesHeaders - adds the 'WEEK #' and 'GR/G' headers to the HTML of the page
*/
function addWeekGamesHeaders(data) {
  // console.log( "addWeekGamesHeaders" );

  var activeMenu = getActiveMenu();
  var listOfElements = document.getElementsByClassName("Table2__header-row");
  var weekNum = data.weekNum;

  if (activeMenu == PAGE_TYPE_TEAM_NEWS) {
    for (var i = 0; i < listOfElements.length; i++) {
      if (i % 2 == 0) {
        var newCell = listOfElements[i].insertCell(2);
        newCell.title =
          "Week number " + weekNum.toString() + " of fantasy basketball";
        newCell.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newCell.textContent = "WEEK " + weekNum.toString();
        newCell.style.fontWeight = "bold";
        newCell.style.color = "#48494A";
        newCell.style.borderTop = "1px solid #dcdddf";
        newCell.style.borderRight = "1px solid #dcdddf";
        newCell.style.borderLeft = "1px solid #dcdddf";
        newCell.style.padding = "3px"

      } else {
        if(document.getElementsByClassName('Table2__header-row Table2__tr Table2__even')[1].innerHTML.indexOf("Player News") != -1 && weekNum.toString() != 1){
          var newCell = listOfElements[i].insertCell(4);
        }else{
          var newCell = listOfElements[i].insertCell(5);
        }
        newCell.title = "Games Remaining / Games This Week";
        newCell.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newCell.textContent = "GR/G";
        newCell.style.color = "#151617";
        newCell.style.borderRight = "1px solid #dcdddf";
        newCell.style.padding = "3px"
        newCell.style.fontWeight = "500"

      }
    }
  } else if (activeMenu == PAGE_TYPE_TEAM_TRENDING) {
    for (var i = 0; i < listOfElements.length; i++) {
      if (i % 2 == 0) {
        var newCell = listOfElements[i].insertCell(2);
        newCell.title =
          "Week number " + weekNum.toString() + " of fantasy basketball";
        newCell.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newCell.textContent = "WEEK " + weekNum.toString();
        newCell.style.fontWeight = "bold";
        newCell.style.color = "#48494A";
        newCell.style.borderTop = "1px solid #dcdddf";
        newCell.style.borderRight = "1px solid #dcdddf";
        newCell.style.borderLeft = "1px solid #dcdddf";
        newCell.style.padding = "3px"

      } else {
        if(listOfElements[i].innerHTML.indexOf("+/-") != -1 && weekNum.toString() != 1){
          var newCell = listOfElements[i].insertCell(4);
        }else{
          var newCell = listOfElements[i].insertCell(5);
        }
        newCell.title = "Games Remaining / Games This Week";
        newCell.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newCell.textContent = "GR/G";
        newCell.style.color = "#151617";
        newCell.style.borderRight = "1px solid #dcdddf";
        newCell.style.borderLeft = "1px solid #dcdddf";
        newCell.style.padding = "3px"
        newCell.style.fontWeight = "500"

      }
    }
  } else if (activeMenu == PAGE_TYPE_TEAM_SCHEDULE) {
    for (var i = 0; i < listOfElements.length; i++) {
      // console.log(listOfElements[i].innerHTML);
      if (
        listOfElements[i].innerHTML.indexOf("STARTERS") != -1 ||
        listOfElements[i].innerHTML.indexOf("BENCH") != -1
      ) {
        var newGamesHeader = document.createElement("th");
        newGamesHeader.title =
          "Week number " + weekNum.toString() + " of fantasy basketball";
        newGamesHeader.colSpan = "1";
        newGamesHeader.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newGamesHeader.textContent = "WEEK" + weekNum.toString();
        newGamesHeader.style.borderLeft = "1px solid #dcdddf";
        newGamesHeader.style.borderRight = "1px solid #dcdddf";
        listOfElements[i].appendChild(newGamesHeader);
        // listOfElements[i].insertAdjacentElement( 'beforeend', newGamesHeader );
      } else if (listOfElements[i].innerHTML.indexOf("STATUS") != -1 || listOfElements[i].innerHTML.indexOf("opp") != -1) {
        var newGamesHeader = document.createElement("th");
        newGamesHeader.title = "Games Remaining / Games This Week";
        newGamesHeader.colSpan = "1";
        newGamesHeader.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newGamesHeader.textContent = "GR/G";
        newGamesHeader.style.borderLeft = "1px solid #dcdddf";
        newGamesHeader.style.borderRight = "1px solid #dcdddf";
        listOfElements[i].appendChild(newGamesHeader);
        // listOfElements[i].insertAdjacentElement( 'beforeend', newGamesHeader );
      }
    }
  } else {
    for (var i = 0; i < listOfElements.length; i++) {
      //console.log(listOfElements[i].innerHTML);
      if (
        listOfElements[i].innerHTML.indexOf("STARTERS") != -1 ||
        listOfElements[i].innerHTML.indexOf("BENCH") != -1
      ) {
        var newGamesHeader = document.createElement("th");
        newGamesHeader.title =
          "Week number " + weekNum.toString() + " of fantasy basketball";
        newGamesHeader.colSpan = "1";
        newGamesHeader.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newGamesHeader.textContent = "WEEK" + weekNum.toString();
        newGamesHeader.style.borderLeft = "1px solid #dcdddf";
        listOfElements[i].appendChild(newGamesHeader);
        // listOfElements[i].insertAdjacentElement( 'beforeend', newGamesHeader );
      } else if (listOfElements[i].innerHTML.indexOf("STATUS") != -1 || listOfElements[i].innerHTML.indexOf("games: ") != -1) {
        var newGamesHeader = document.createElement("th");
        newGamesHeader.title = "Games Remaining / Games This Week";
        newGamesHeader.colSpan = "1";
        newGamesHeader.className =
          "tc bg-clr-white Table2__th fbw-header fbw-new-element";
        newGamesHeader.textContent = "GR/G";
        newGamesHeader.style.borderLeft = "1px solid #dcdddf";
        listOfElements[i].appendChild(newGamesHeader);
        // listOfElements[i].insertAdjacentElement( 'beforeend', newGamesHeader );
      } 
    }
  }
}

/*
    addWeekGamesHeadersPlayers - adds the 'WEEK #' and 'GR/G' headers
    to the HTML of the page for Players page
*/
function addWeekGamesHeadersPlayers(data) {
  //console.log( "addWeekGamesHeaders" );
  var weekNum = data.weekNum;
  var listOfElements = document.getElementsByClassName("Table2__header-row");

  for (var i = 0; i < listOfElements.length; i++) {
    //console.log(listOfElements[i].innerHTML)
    if (listOfElements[i].innerHTML.indexOf("Players") != -1) {
      var newGamesHeader = document.createElement("th");
      newGamesHeader.title =
        "Week number " + weekNum.toString() + " of fantasy basketball";
      newGamesHeader.colSpan = "1";
      newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header";
      newGamesHeader.textContent = "WEEK" + weekNum.toString();
      newGamesHeader.style.borderLeft = "1px solid #dcdddf";
      listOfElements[i].appendChild(newGamesHeader);
    } else if (listOfElements[i].innerHTML.indexOf("STATUS") != -1) {
      var newGamesHeader = document.createElement("th");
      newGamesHeader.title = "Games Remaining / Games This Week";
      newGamesHeader.colSpan = "1";
      newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header";
      newGamesHeader.textContent = "GR/G";
      newGamesHeader.style.borderLeft = "1px solid #dcdddf";
      listOfElements[i].appendChild(newGamesHeader);
    }
  }
}

/*
    addWeekGamesHeadersAddedDroppedPage - adds the 'GR/G' header to the HTML of the page.
*/
function addWeekGamesHeadersAddedDroppedPage(data) {
  // console.log( "addWeekGamesHeadersAddedDroppedPage" );
  var weekNum = data.weekNum;
  var listOfElements = document.getElementsByClassName("Table2__header-row");

  for (var i = 0; i < listOfElements.length; i++) {
    var newHeaderTh = document.createElement("th");
    var newHeaderSpan = document.createElement("span");
    newHeaderTh.title = "Games Remaining / Games This Week";
    newHeaderTh.colSpan = "1";
    newHeaderTh.style.borderTop = "0px solid #dcdddf";
    newHeaderTh.className = "jsx-2810852873 table--cell poc tar header";
    newHeaderSpan.textContent = "GR/G";
    newHeaderTh.appendChild(newHeaderSpan);
    listOfElements[i].appendChild(newHeaderTh);
  }
}

/*
    addWeekGamesHeadersBoxscorePage - adds the 'Week #' and 'GR/G' header to the HTML of the page.
*/
function addWeekGamesHeadersBoxscorePage(data) {
  // console.log( "addWeekGamesHeadersBoxscorePage" );
  var weekNum = data.weekNum;
  var listOfElements = document.getElementsByClassName("Table2__header-row");

  for (var i = 0; i < listOfElements.length; i++) {
    if (
      listOfElements[i].innerHTML.indexOf("STARTERS") != -1 ||
      listOfElements[i].innerHTML.indexOf("BENCH") != -1
    ) {
      var newGamesHeader = document.createElement("th");
      newGamesHeader.title =
        "Week number " + weekNum.toString() + " of fantasy basketball";
      newGamesHeader.colSpan = "1";
      newGamesHeader.className =
        "tc bg-clr-white Table2__th fbw-header fbw-new-element";
      newGamesHeader.textContent = "WEEK" + weekNum.toString();
      newGamesHeader.style.borderLeft = "1px solid #dcdddf";
      listOfElements[i].appendChild(newGamesHeader);
    } else if (listOfElements[i].innerHTML.indexOf("STATUS") != -1) {
      var newGamesHeader = document.createElement("th");
      newGamesHeader.title = "Games Remaining / Games This Week";
      newGamesHeader.colSpan = "1";
      newGamesHeader.className =
        "tc bg-clr-white Table2__th fbw-header fbw-new-element";
      newGamesHeader.textContent = "GR/G";
      newGamesHeader.style.borderLeft = "1px solid #dcdddf";
      listOfElements[i].appendChild(newGamesHeader);
    }
  }
}

/*
    addWeekGamesHeadersFantasyCastPage - adds the 'GR/G' header to the HTML of the page.
*/
function addWeekGamesHeadersFantasyCastPage(data) {
  //console.log( "addWeekGamesHeaders" );
  var weekNum = data.weekNum;
  var listOfElements = document.getElementsByClassName("Table2__right-aligned Table2__table-fixed Table2__Table--fixed--left Table2__table");
  listOfElements =  listOfElements[0].children
  for (var i = 0; i < listOfElements.length; i++) {
    //console.log(listOfElements[i].innerHTML)
    if (listOfElements[i].innerHTML.indexOf("STARTERS") != -1) {
      var newGamesHeader = document.createElement("th");
      newGamesHeader.title =
        "Week number " + weekNum.toString() + " of fantasy basketball";
      newGamesHeader.colSpan = "1";
      newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header";
      newGamesHeader.textContent = "WEEK" + weekNum.toString();
      newGamesHeader.style.fontSize = "11px";
      newGamesHeader.style.color = "#48494a";
      newGamesHeader.style.borderLeft = "1px solid #dcdddf";
      listOfElements[i].children[0].appendChild(newGamesHeader);
    } else if (listOfElements[i].innerHTML.indexOf("SLOT") != -1) {
      var newGamesHeader = document.createElement("th");
      newGamesHeader.title = "Games Remaining / Games This Week";
      newGamesHeader.colSpan = "1";
      newGamesHeader.className = "tc bg-clr-white Table2__th fbw-header";
      newGamesHeader.textContent = "GR/G";
      newGamesHeader.style.fontSize = "11px";
      newGamesHeader.style.color = "#151617";
      newGamesHeader.style.fontWeight = "500";
      newGamesHeader.style.borderLeft = "1px solid #dcdddf";
      listOfElements[i].children[0].appendChild(newGamesHeader);    
    }
  }
}

/*
    updateWeekNumberHeader - updates the 'GAMES' and 'WEEK' headers
*/
function updateWeekNumberHeader(data) {
  var weekNum = data.weekNum;
  var listOfHeaders = document.getElementsByClassName("fbw-header");
  for (var i = 0; i < listOfHeaders.length; i++) {
    if (i % 2 == 0) {
      listOfHeaders[i].title =
        "Week number " + weekNum.toString() + " of fantasy basketball";
      listOfHeaders[i].textContent = "WEEK" + weekNum.toString();
    }
  }
}

/*
    requestHeaderFromServer - 
*/
async function requestHeaderFromServer(addOrUpdate) {
  // console.log( "requestHeaderFromServer" );
  // Sleep before getting the date string to allow the selected date some time to be changed
  await sleep(4000);
  var dateRequestString = "";
  // console.log( "currentPageType=" + currentPageType );
  if (
    currentPageType == PAGE_TYPE_PLAYERS ||
    currentPageType == PAGE_TYPE_ADDED_DROPPED ||
    currentPageType == PAGE_TYPE_BOXSCORE ||
    currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES
  ) {
    dateRequestString = buildTodayDateRequestString();
  } else {
    dateRequestString = buildSelectDateRequestString();
  }

  // console.log( "dateRequestString - " + dateRequestString );
  // console.log( typeof dateRequestString );
  var leagueIdRequestString = buildLeagueIdRequestString();

  var pageNameRequestString = buildPageNameRequestString();

  if (dateRequestString != "" && typeof dateRequestString !== "undefined") {
    //Pass url to background script and get back response data
    chrome.runtime.sendMessage(
      {
        endpoint: "getweek",
        pageName: pageNameRequestString,
        date: dateRequestString,
        leagueID: leagueIdRequestString
      },
      function(response) {
        if (addOrUpdate == "Add") {
          if (currentPageType == PAGE_TYPE_PLAYERS) {
            addWeekGamesHeadersPlayers(response.data);
          } else if (currentPageType == PAGE_TYPE_ADDED_DROPPED) {
            addWeekGamesHeadersAddedDroppedPage(response.data);
          } else if (currentPageType == PAGE_TYPE_BOXSCORE) {
            addWeekGamesHeadersBoxscorePage(response.data);
          } else if (currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES){
            addWeekGamesHeadersFantasyCastPage(response.data);
          } else {
            addWeekGamesHeaders(response.data);
          }
        } else if (addOrUpdate == "Update") {
          updateWeekNumberHeader(response.data);
        }
      }
    );
  }
}

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        GAMES DATA
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    addGamesDataToLocalDictionary - 
*/
function addGamesDataToLocalDictionary(data, teamsRequestString) {
  // console.log( "addDataToLocalDictionary" );
  // console.log( teamsRequestString );
  if (teamsRequestString != "teams=") {
    // if( currentPageType != PAGE_TYPE_PLAYERS && currentPageType != PAGE_TYPE_ADDED_DROPPED )
    if (
      currentPageType == PAGE_TYPE_TEAM_NEWS ||
      currentPageType == PAGE_TYPE_TEAM ||
      currentPageType == PAGE_TYPE_TEAM_STATS ||
      currentPageType == PAGE_TYPE_TEAM_TRENDING ||
      currentPageType == PAGE_TYPE_TEAM_SCHEDULE 
      //|| currentPageType == WEEKLY_LEAGUE
    ) {
      localGamesDataDict = {};
    }
    var teamsRequestStringConcise = teamsRequestString.substring(
      6,
      teamsRequestString.length - 1
    );
    var teamsList = teamsRequestStringConcise.split(",");
    for (var i = 0; i < data.length; i++) {
      if (!(teamsList[i] in localGamesDataDict)) {
        localGamesDataDict[teamsList[i]] = data[i];
      }
    }
    // console.log( localGamesDataDict );
  }
}

/*
    requestGameDataFromServer
*/
async function requestGameDataFromServer(addOrUpdate) {
  // console.log( "requestGameDataFromServer" );
  await sleep(4000);

  var teamsRequestString = buildTeamsRequestString();
  if (currentPageType == PAGE_TYPE_PLAYERS && teamsRequestString == "teams=") {
    addGamesPlayersPage();
  } else if (
    currentPageType == PAGE_TYPE_ADDED_DROPPED &&
    teamsRequestString == "teams="
  ) {
    addGamesAddedDroppedPage();
  } else {
    var dateRequestString = "";
    if (
      currentPageType == PAGE_TYPE_PLAYERS ||
      currentPageType == PAGE_TYPE_ADDED_DROPPED
    ) {
      dateRequestString = buildTodayDateRequestString();
    } else if (
      currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS ||
      currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES
    ) {
      dateRequestString = buildDateRequestStringFantasyCast();
    } else if (currentPageType == PAGE_TYPE_BOXSCORE) {
      dateRequestString = buildDropdownSelectDateRequestString();
    } else {
      dateRequestString = buildSelectDateRequestString();
    }
    var leagueIdRequestString = buildLeagueIdRequestString();
    var pageNameRequestString = buildPageNameRequestString();
    if (
      dateRequestString != "" &&
      teamsRequestString != "" &&
      typeof dateRequestString !== "undefined"
    ) {
      //Pass url to background script and get back response data
      var newTeams = teamsRequestString.slice(
        teamsRequestString.indexOf("=") + 1,
        teamsRequestString.length
      );
      chrome.runtime.sendMessage(
        {
          endpoint: "gamesremaining",
          teams: newTeams,
          pageName: pageNameRequestString,
          leagueID: leagueIdRequestString,
          date: dateRequestString
        },
        function(response) {
          addGamesDataToLocalDictionary(response.data, teamsRequestString);
          if (addOrUpdate == "Add") {
            // console.log( "currentPageType=" + currentPageType );
            if (currentPageType == PAGE_TYPE_PLAYERS) {
              addGamesPlayersPage();
            } else if (currentPageType == PAGE_TYPE_ADDED_DROPPED) {
              addGamesAddedDroppedPage();
            } else if (currentPageType == PAGE_TYPE_BOXSCORE) {
              addGamesBoxscorePage();
            } else if (currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS) {
              addGamesFantasyCastPagePoints();
            }else if (currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES){
              addGamesFantasyCastPageCates();
            } else {
              addGamesTeamPage();
            }
          } else if (addOrUpdate == "Update") {
            updateGameData();
          }
        }
      );
    }
  }
}

/*
    addGamesTeamPage - add the games remaining data to the HTML
    of the page
*/
function addGamesTeamPage() {
  // console.log( "addGamesTeamPage" );

  var listOfElements = document.getElementsByClassName("Table2__tr--lg");
  var listOfTeamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var listOfTeamNameElementsIndex = 0;
  var numberOfPlayers = getNumberOfPlayersTeamPage();
  var totalGamesRemainingAll = 0;
  var totalGamesForWeekAll = 0;
  var totalGamesRemainingStarters = 0;
  var totalGamesForWeekStarters = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsTr = listOfElements[i];
    // Initial render for Stats menu
    //console.log(listOfElementsTr.children.length)
    if (listOfElementsTr.children.length == 5 || listOfElementsTr.children.length == 4) {
      //Check for news page and not week 1
      if(document.getElementsByClassName('Table2__header-row Table2__tr Table2__even')[1].innerHTML.indexOf("Player News") != -1){
        var newCell = listOfElementsTr.insertCell(4);
        // var newGamesTd = document.createElement( "td" );
        var newGamesDiv = document.createElement("div");
        newCell.className =
          "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
        newGamesDiv.className =
          "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
        newGamesDiv.style.textAlign = "center";
        // newGamesTd.appendChild( newGamesDiv );
        var isInjured = false;
        // 'O'ut, injured player
        if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
          isInjured = true;
        }
        // Normal player
        if (listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1) {
          if (!isInjured) {
            var teamName =
              listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
            newGamesDiv.textContent = localGamesDataDict[teamName];
            var splitDataIndex = localGamesDataDict[teamName].split("/");
            totalGamesRemainingStarters += parseInt(splitDataIndex[0]);
            totalGamesForWeekStarters += parseInt(splitDataIndex[1]);
            newCell.style.backgroundColor = getBackgroundColor(splitDataIndex[0]);
          } else {
            newGamesDiv.textContent = "-/-";
          }
          listOfTeamNameElementsIndex++;
        }
        // Empty player
        else {
          newGamesDiv.textContent = "-/-";
        }
        newCell.style.borderRight = "1px solid #dcdddf";
        newCell.appendChild(newGamesDiv);
      }else{
        var newGamesTd = document.createElement("td");
        var newGamesDiv = document.createElement("div");
        newGamesTd.className =
          "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
        newGamesDiv.className =
          "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
        newGamesDiv.style.textAlign = "center";

        var isInjured = false;
        // 'O'ut, injured player
        if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
          isInjured = true;
        }
        // TOTALS row
        if (listOfElementsTr.innerHTML.indexOf(">TOTALS</div>") != -1) {
          var totalGamesString =
            totalGamesRemainingStarters.toString() +
            "/" +
            totalGamesForWeekStarters.toString();
          newGamesDiv.textContent = totalGamesString;
          newGamesTd.className += " bg-clr-gray-08 fbw-games-total-td";
          newGamesDiv.className += " bg-clr-gray-08 fbw-games-total-div";

          var startersGameTotalDiv = document.createElement("div");
          startersGameTotalDiv.className =
            "jsx-2810852873 table--cell bg-clr-gray-08 fbw-starters-games-div";
          startersGameTotalDiv.style.textAlign = "center";
          //startersGameTotalDiv.textContent = "S: " + totalGamesString;
          startersGameTotalDiv.title = "Starters";
          newGamesTd.appendChild(startersGameTotalDiv);
        }
        // Normal player
        else if (
          listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1
        ) {
          if (!isInjured) {
            var teamName =
              listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
            newGamesDiv.textContent = localGamesDataDict[teamName];
            var splitDataIndex = localGamesDataDict[teamName].split("/");
            totalGamesRemainingStarters += parseInt(splitDataIndex[0]);
            totalGamesForWeekStarters += parseInt(splitDataIndex[1]);
            newGamesTd.style.backgroundColor = getBackgroundColor(
              splitDataIndex[0]
            );
          } else {
            newGamesDiv.textContent = "-/-";
          }
          listOfTeamNameElementsIndex++;
        }
        // Empty player
        else {
          newGamesDiv.textContent = "-/-";
        }
        if (i == numberOfPlayers) {
          var totalElements = document.getElementsByClassName(
            "fbw-games-total-div"
          );
          if(totalElements[0]){
            var totalGamesString =
              totalGamesRemainingStarters.toString() +
              "/" +
              totalGamesForWeekStarters.toString();
            totalElements[0].title = "Total team";
            totalElements[0].textContent = totalGamesString;
          }
        }
        newGamesTd.style.borderLeft = "1px solid #dcdddf";
        newGamesTd.appendChild(newGamesDiv);
        listOfElementsTr.appendChild(newGamesTd);
      }
    }
    // Schedule Menu
    else if (
      listOfElementsTr.children.length == 12
      || listOfElementsTr.children.length == 11
    ) {
      //Check for trending page
      if(document.getElementsByClassName('Table2__header-row Table2__tr Table2__even')[1].innerHTML.indexOf("+/-") != -1){
        var newCell = listOfElementsTr.insertCell(4);
        // var newGamesTd = document.createElement( "td" );
        var newGamesDiv = document.createElement("div");
        newCell.className =
          "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
        newGamesDiv.className =
          "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
        newGamesDiv.style.textAlign = "center";
        // newGamesTd.appendChild( newGamesDiv );
        var isInjured = false;
        // 'O'ut, injured player
        if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
          isInjured = true;
        }
        // Normal player
        if (listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1) {
          if (!isInjured) {
            var teamName =
              listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
            newGamesDiv.textContent = localGamesDataDict[teamName];
            var splitDataIndex = localGamesDataDict[teamName].split("/");
            totalGamesRemainingStarters += parseInt(splitDataIndex[0]);
            totalGamesForWeekStarters += parseInt(splitDataIndex[1]);
            newCell.style.backgroundColor = getBackgroundColor(splitDataIndex[0]);
          } else {
            newGamesDiv.textContent = "-/-";
          }
          listOfTeamNameElementsIndex++;
        }
        // Empty player
        else {
          newGamesDiv.textContent = "-/-";
        }
        newCell.style.borderRight = "1px solid #dcdddf";
        newCell.appendChild(newGamesDiv);
      }
      else{
        var newGamesTd = document.createElement("td");
        var newGamesDiv = document.createElement("div");
        newGamesTd.className =
          "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
        newGamesDiv.className =
          "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
        newGamesDiv.style.textAlign = "center";

        var isInjured = false;
        // 'O'ut, injured player
        if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
          isInjured = true;
        }
        // Normal player
        if (listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1) {
          if (!isInjured) {
            var teamName =
              listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
            newGamesDiv.textContent = localGamesDataDict[teamName];
            var splitDataIndex = localGamesDataDict[teamName].split("/");
            totalGamesRemainingStarters += parseInt(splitDataIndex[0]);
            totalGamesForWeekStarters += parseInt(splitDataIndex[1]);
            newGamesTd.style.backgroundColor = getBackgroundColor(
              splitDataIndex[0]
            );
          } else {
            newGamesDiv.textContent = "-/-";
          }
          listOfTeamNameElementsIndex++;
        }
        // Empty player
        else {
          newGamesDiv.textContent = "-/-";
        }
        newGamesTd.style.borderLeft = "1px solid #dcdddf";
        newGamesTd.style.borderRight = "1px solid #dcdddf";
        newGamesTd.appendChild(newGamesDiv);
        listOfElementsTr.appendChild(newGamesTd);
      }
    }
    // News Menu & Trending
    else if (listOfElementsTr.children.length == 13 || listOfElementsTr.children.length == 6) {
      var newCell = listOfElementsTr.insertCell(5);
      // var newGamesTd = document.createElement( "td" );
      var newGamesDiv = document.createElement("div");
      newCell.className =
        "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
      newGamesDiv.style.textAlign = "center";
      // newGamesTd.appendChild( newGamesDiv );
      var isInjured = false;
      // 'O'ut, injured player
      if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
        isInjured = true;
      }
      // Normal player
      if (listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1) {
        if (!isInjured) {
          var teamName =
            listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
          newGamesDiv.textContent = localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          totalGamesRemainingStarters += parseInt(splitDataIndex[0]);
          totalGamesForWeekStarters += parseInt(splitDataIndex[1]);
          newCell.style.backgroundColor = getBackgroundColor(splitDataIndex[0]);
        } else {
          newGamesDiv.textContent = "-/-";
        }
        listOfTeamNameElementsIndex++;
      }
      // Empty player
      else {
        newGamesDiv.textContent = "-/-";
      }
      newCell.style.borderRight = "1px solid #dcdddf";
      newCell.appendChild(newGamesDiv);
    }
  }
}

/*
    addGamesFantasyCastPagePoints - 
*/
function addGamesFantasyCastPagePoints() {
  // console.log( "addGamesFantasyCastPagePoints" );

  var listOfElements = document.getElementsByClassName("Table2__tr");
  var leftTotalGamesRemaining = 0;
  var leftTotalGamesForWeek = 0;
  var rightTotalGamesRemaining = 0;
  var rightTotalGamesForWeek = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsChildren = listOfElements[i].children;
    var playerColumnLeft = listOfElementsChildren[0];
    var playerColumnLeftScore = listOfElementsChildren[1];
    var playerColumnRight = listOfElementsChildren[4];
    var playerColumnRightScore = listOfElementsChildren[3];
    var newLeftGamesDiv = document.createElement("div");
    var newRightGamesDiv = document.createElement("div");
    newLeftGamesDiv.className =
      "jsx-2810852873 table--cell points-column fbw-new-element";
    newRightGamesDiv.className =
      "jsx-2810852873 table--cell points-column reverse fbw-new-element";

    // Total Row
    if (listOfElements[i].className.indexOf("total-row") != -1) {
      var leftTotalGamesString =
        leftTotalGamesRemaining.toString() +
        "/" +
        leftTotalGamesForWeek.toString();
      var rightTotalGamesString =
        rightTotalGamesRemaining.toString() +
        "/" +
        rightTotalGamesForWeek.toString();
      newLeftGamesDiv.className += " fbw-left-total";
      newRightGamesDiv.className += " fbw-right-total";
      newLeftGamesDiv.textContent = leftTotalGamesString;
      newRightGamesDiv.textContent = rightTotalGamesString;

      listOfElementsChildren[0].appendChild(newLeftGamesDiv);
      listOfElementsChildren[2].appendChild(newRightGamesDiv);
      break;
    }
    // Player Row
    else {
      // Check if the player is injured
      var isLeftInjured = false;
      var isRightInjured = false;
      var leftInjuredElements = playerColumnLeft.getElementsByClassName(
        "injury-status_medium"
      );
      var rightInjuredElements = playerColumnRight.getElementsByClassName(
        "injury-status_medium"
      );

      if (leftInjuredElements.length > 0) {
        if (leftInjuredElements[0].innerHTML == "O") {
          isLeftInjured = true;
        }
      }

      if (rightInjuredElements.length > 0) {
        if (rightInjuredElements[0].innerHTML == "O") {
          isRightInjured = true;
        }
      }

      // Empty Left Player
      if (playerColumnLeft.innerHTML.indexOf("</div>Empty</div>") != -1) {
        newLeftGamesDiv.textContent = "-/-";
      }
      // Normal Left Player
      else {
        if (!isLeftInjured) {
          var teamNameElements = playerColumnLeft.getElementsByClassName(
            "playerinfo__playerteam"
          );
          var teamName = teamNameElements[0].innerHTML;
          newLeftGamesDiv.textContent = localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          leftTotalGamesRemaining += parseInt(splitDataIndex[0]);
          leftTotalGamesForWeek += parseInt(splitDataIndex[1]);
          newLeftGamesDiv.style.backgroundColor = getBackgroundColor(
            splitDataIndex[0]
          );
        } else {
          newLeftGamesDiv.textContent = "-/-";
        }
      }
      // Empty Right Player
      if (playerColumnRight.innerHTML.indexOf("</div>Empty</div>") != -1) {
        newRightGamesDiv.textContent = "-/-";
      }
      // Normal Right Player
      else {
        if (!isRightInjured) {
          var teamNameElements = playerColumnRight.getElementsByClassName(
            "playerinfo__playerteam"
          );
          var teamName = teamNameElements[0].innerHTML;
          // console.log( "team:" + teamName );
          // console.log( localGamesDataDict[teamName] );
          newRightGamesDiv.textContent = localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          rightTotalGamesRemaining += parseInt(splitDataIndex[0]);
          rightTotalGamesForWeek += parseInt(splitDataIndex[1]);
          newRightGamesDiv.style.backgroundColor = getBackgroundColor(
            splitDataIndex[0]
          );
        } else {
          newRightGamesDiv.textContent = "-/-";
        }
      }
    }

    playerColumnLeftScore.appendChild(newLeftGamesDiv);
    playerColumnRightScore.appendChild(newRightGamesDiv);
  }

  // Update total games
  var leftTotalElements = document.getElementsByClassName("fbw-left-total");
  var rightTotalElements = document.getElementsByClassName("fbw-right-total");

  if (leftTotalElements.length > 0) {
    var leftTotalGamesString =
      leftTotalGamesRemaining.toString() +
      "/" +
      leftTotalGamesForWeek.toString();
    var rightTotalGamesString =
      rightTotalGamesRemaining.toString() +
      "/" +
      rightTotalGamesForWeek.toString();
    leftTotalElements[0].textContent = leftTotalGamesString;
    rightTotalElements[0].textContent = rightTotalGamesString;
  }
  // Make the greater number of total games font color green
  if (leftTotalGamesRemaining > rightTotalGamesRemaining) {
    leftTotalElements[0].style.fontSize = "15px";
    rightTotalElements[0].style.fontSize = "15px";
    leftTotalElements[0].style.color = "#acd888";
  } else if (rightTotalGamesRemaining > leftTotalGamesRemaining) {
    leftTotalElements[0].style.fontSize = "15px";
    rightTotalElements[0].style.fontSize = "15px";
    rightTotalElements[0].style.color = "#acd888";
  } else if (leftTotalGamesRemaining == rightTotalGamesRemaining) {
    // Do nothing in a tie
    leftTotalElements[0].style.fontSize = "15px";
    rightTotalElements[0].style.fontSize = "15px";
  }
}

/*
    addGamesFantasyCastPageCates - 
*/
function addGamesFantasyCastPageCates() {
  // console.log( "addGamesFantasyCastPageCates" );
  var listOfElements = document.getElementsByClassName("Table2__right-aligned Table2__table-fixed Table2__Table--fixed--left Table2__table");
  listOfElements = listOfElements[0].children[3].children
  var listOfTeamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var listOfTeamNameElementsIndex = 0;
  var numberOfPlayers = getNumberOfPlayersTeamPage();
  var totalGamesRemainingAll = 0;
  var totalGamesForWeekAll = 0;
  var totalGamesRemainingStarters = 0;
  var totalGamesForWeekStarters = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsTr = listOfElements[i];
    // Initial render for Stats menu
      var newGamesTd = document.createElement("td");
      var newGamesDiv = document.createElement("div");
      newGamesTd.className =
        "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
      newGamesDiv.style.textAlign = "center";

      var isInjured = false;
      // 'O'ut, injured player
      if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
        isInjured = true;
      }
      // TOTALS row
      if (listOfElementsTr.innerHTML.indexOf(">TOTALS</div>") != -1) {
        var totalGamesString =
          totalGamesRemainingStarters.toString() +
          "/" +
          totalGamesForWeekStarters.toString();
        newGamesDiv.textContent = totalGamesString;
        newGamesTd.className += " bg-clr-gray-08 fbw-games-total-td";
        newGamesDiv.className += " bg-clr-gray-08 fbw-games-total-div";

        var startersGameTotalDiv = document.createElement("div");
        startersGameTotalDiv.className =
          "jsx-2810852873 table--cell bg-clr-gray-08 fbw-starters-games-div";
        startersGameTotalDiv.style.textAlign = "center";
        startersGameTotalDiv.title = "Starters";
        newGamesTd.appendChild(startersGameTotalDiv);
      }
      //Bench player
      else if (
        listOfElementsTr.innerHTML.indexOf(">Bench</div>") != -1
      ) {
          newGamesDiv.textContent = "-/-"
      }
      // Normal player
      else if (
        listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1
      ) {
        if (!isInjured) {
          var teamName =
            listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
          newGamesDiv.textContent = localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          totalGamesRemainingStarters += parseInt(splitDataIndex[0]);
          totalGamesForWeekStarters += parseInt(splitDataIndex[1]);
          newGamesTd.style.backgroundColor = getBackgroundColor(
            splitDataIndex[0]
          );
        } else {
          newGamesDiv.textContent = "-/-";
        }
        listOfTeamNameElementsIndex++;
      }
      // Empty player
      else {
        newGamesDiv.textContent = "-/-";
      }
      if (i == numberOfPlayers) {
        var totalElements = document.getElementsByClassName(
          "fbw-games-total-div"
        );
        if(totalElements[0]){
          var totalGamesString =
            totalGamesRemainingStarters.toString() +
            "/" +
            totalGamesForWeekStarters.toString();
          totalElements[0].title = "Total team";
          totalElements[0].textContent = totalGamesString;
        }
      }
      newGamesTd.style.borderLeft = "1px solid #dcdddf";
      newGamesTd.appendChild(newGamesDiv);
      listOfElementsTr.appendChild(newGamesTd);
  }
}

/*
    addGamesPlayersPage - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesPlayersPage() {
  // console.log( "addGamesPlayersPage" );

  var listOfElements = document.getElementsByClassName("Table2__tr--lg");
  var totalGamesRemaining = 0;
  var totalGamesForWeek = 0;

  var listOfTeamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var listOfTeamNameElementsIndex = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsTr = listOfElements[i];
    // console.log( "listOfElementsTr.children.length=" + listOfElementsTr.children.length );

    if (listOfElementsTr.children.length == 5) {
      var newGamesTd = document.createElement("td");
      var newGamesDiv = document.createElement("div");
      newGamesTd.className =
        "Table2__td Table2__td--fixed-width fbw-games-remaining-td";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div";
      newGamesDiv.style.textAlign = "center";

      var isInjured = false;
      // 'O'ut, injured player
      if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
        isInjured = true;
      }
      // Normal player
      if (listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1) {
        if (!isInjured) {
          var teamName =
            listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
          // console.log( "teamName=" + teamName );
          newGamesDiv.textContent = localGamesDataDict[teamName];
          // console.log( localGamesDataDict[teamName] );
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          totalGamesRemaining += parseInt(splitDataIndex[0]);
          totalGamesForWeek += parseInt(splitDataIndex[1]);
          newGamesTd.style.backgroundColor = getBackgroundColor(
            splitDataIndex[0]
          );
        } else {
          newGamesDiv.textContent = "-/-";
        }
      }
      // Don't have empty players in Free Agents, only for Team page
      listOfTeamNameElementsIndex++;
      newGamesTd.style.borderLeft = "1px solid #dcdddf";
      newGamesTd.appendChild(newGamesDiv);
      listOfElementsTr.appendChild(newGamesTd);
    }
  }
}

/*
    addGamesAddedDroppedPage - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesAddedDroppedPage() {
  // console.log( "addGamesAddedDroppedPage" );

  var listOfElements = document.getElementsByClassName("Table2__tr--sm");
  var totalGamesRemaining = 0;
  var totalGamesForWeek = 0;

  var listOfTeamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var listOfTeamNameElementsIndex = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsTr = listOfElements[i];

    if (listOfElementsTr.children.length == 5) {
      var newGamesTd = document.createElement("td");
      var newGamesDiv = document.createElement("div");
      newGamesTd.className =
        "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
      newGamesDiv.style.textAlign = "center";

      var isInjured = false;
      // 'O'ut, injured player
      if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
        isInjured = true;
      }
      // Normal player
      if (listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1) {
        if (!isInjured) {
          var teamName =
            listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;

          newGamesDiv.textContent = localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          totalGamesRemaining += parseInt(splitDataIndex[0]);
          totalGamesForWeek += parseInt(splitDataIndex[1]);
          newGamesTd.style.backgroundColor = getBackgroundColor(
            splitDataIndex[0]
          );
        } else {
          newGamesDiv.textContent = "-/-";
        }
      }
      // Don't have empty players in Free Agents, only for Team page
      listOfTeamNameElementsIndex++;

      newGamesTd.appendChild(newGamesDiv);
      listOfElementsTr.appendChild(newGamesTd);
    }
  }
}

/*
    addGamesBoxscorePage - creates the games remaining cells and
    adds the data to the HTML of the page
*/
function addGamesBoxscorePage() {
  // console.log( "addGamesBoxscorePage" );

  var listOfElements = document.getElementsByClassName("Table2__tr--lg");
  var totalGamesRemaining = 0;
  var totalGamesForWeek = 0;

  var table1;
  var table2;
  var isTable = true;
  var teamOneTotalGamesRemaining = 0;
  var teamOneTotalGamesForWeek = 0;
  var teamTwoTotalGamesRemaining = 0;
  var teamTwoTotalGamesForWeek = 0;

  var listOfTeamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var listOfTeamNameElementsIndex = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsTr = listOfElements[i];
    //console.log(listOfElementsTr)
    if (
      listOfElementsTr.children.length == 4 ||
      listOfElementsTr.children.length == 3
    ) {
      if (isTable == true) {
        table1 = listOfElementsTr.closest("tbody");
        isTable = false;
      } else {
        table2 = listOfElementsTr.closest("tbody");
      }
      var newGamesTd = document.createElement("td");
      var newGamesDiv = document.createElement("div");
      newGamesTd.className =
        "Table2__td Table2__td fbw-games-remaining-td fbw-new-element";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
      newGamesTd.width = "10%";
      newGamesDiv.style.textAlign = "center";

      var isInjured = false;
      // Out, injured player
      if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
        isInjured = true;
      }
      // TOTALS rows
      if (listOfElementsTr.innerHTML.indexOf(">TOTALS</div>") != -1) {
        var parentTable = listOfElementsTr.closest("tbody");
        if ($(table1).is($(parentTable))) {
          newGamesDiv.className += " fbw-team-one-total-games";
        } else if ($(table2).is($(parentTable))) {
          // newGamesDiv.textContent = teamTwoTotalGamesRemaining.toString() + "/" + teamTwoTotalGamesForWeek.toString();
          newGamesDiv.className += " fbw-team-two-total-games";
        }
        // var totalGamesString = totalGamesRemaining.toString() + "/" + totalGamesForWeek.toString();
        // newGamesDiv.textContent = totalGamesString;
        newGamesTd.className += " bg-clr-gray-08";
        newGamesDiv.className += " bg-clr-gray-08";
      }
      // Normal player
      else if (
        listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1
      ) {
        if (!isInjured) {
          var teamName =
            listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
          newGamesDiv.textContent = localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          var parentTable = listOfElementsTr.closest("tbody");
          if ($(table1).is($(parentTable))) {
            teamOneTotalGamesRemaining += parseInt(splitDataIndex[0]);
            teamOneTotalGamesForWeek += parseInt(splitDataIndex[1]);
          } else if ($(table2).is($(parentTable))) {
            teamTwoTotalGamesRemaining += parseInt(splitDataIndex[0]);
            teamTwoTotalGamesForWeek += parseInt(splitDataIndex[1]);
          }
          // totalGamesRemaining += parseInt( splitDataIndex[0] );
          // totalGamesForWeek += parseInt( splitDataIndex[1] );
          newGamesTd.style.backgroundColor = getBackgroundColor(
            splitDataIndex[0]
          );
        } else {
          newGamesDiv.textContent = "-/-";
        }
        listOfTeamNameElementsIndex++;
      }
      // Empty player
      else {
        newGamesDiv.textContent = "-/-";
      }
      newGamesTd.style.borderLeft = "1px solid #dcdddf";
      newGamesTd.appendChild(newGamesDiv);
      listOfElementsTr.appendChild(newGamesTd);
    }
  }

  // Update total games amounts
  var teamOneTotal = document.getElementsByClassName(
    "fbw-team-one-total-games"
  );
  var teamTwoTotal = document.getElementsByClassName(
    "fbw-team-two-total-games"
  );
  teamOneTotal[0].textContent =
    teamOneTotalGamesRemaining.toString() +
    "/" +
    teamOneTotalGamesForWeek.toString();
  teamTwoTotal[0].textContent =
    teamTwoTotalGamesRemaining.toString() +
    "/" +
    teamTwoTotalGamesForWeek.toString();
  requestProjectionsFromServer();
}

/*
    updateGameData - update the game data when the dates have been switched
*/
function updateGameData() {
  // console.log( "updateGameData" );
  var backendIndex = 0;
  var listOfElements = document.getElementsByClassName("Table2__tr--lg");
  var listOfGamesDiv = document.getElementsByClassName(
    "fbw-games-remaining-div"
  );
  var listOfGamesTd = document.getElementsByClassName("fbw-games-remaining-td");
  var listOfTeamNameElements = document.getElementsByClassName(
    "playerinfo__playerteam"
  );
  var listOfTeamNameElementsIndex = 0;
  var listOfGamesIndex = 0;
  var numberOfPlayers = getNumberOfPlayersTeamPage();
  var totalGamesForWeek = 0;
  var totalGamesRemaining = 0;

  for (var i = 0; i < listOfElements.length; i++) {
    var listOfElementsTr = listOfElements[i];

    // console.log( "listOfElementsTr.children.length= " + listOfElementsTr.children.length );
    if (
      listOfElementsTr.children.length == 6 ||
      listOfElementsTr.children.length == 7 ||
      listOfElementsTr.children.length == 13 ||
      listOfElementsTr.children.length == 14
    ) {
      var isInjured = false;
      // 'O'ut, injured player
      if (listOfElementsTr.innerHTML.indexOf('injury-status_medium">O') != -1) {
        isInjured = true;
      }
      // TOTALS row
      if (listOfElementsTr.innerHTML.indexOf(">TOTALS</div>") != -1) {
        var totalGamesString =
          totalGamesRemaining.toString() + "/" + totalGamesForWeek.toString();
        var startersDiv = document.getElementsByClassName(
          "fbw-starters-games-div"
        );
        startersDiv[0].textContent = "S: " + totalGamesString;
      }
      // // Normal player
      else if (
        listOfElementsTr.innerHTML.indexOf("player-column__empty") == -1
      ) {
        // Healthy player
        if (!isInjured) {
          var teamName =
            listOfTeamNameElements[listOfTeamNameElementsIndex].innerHTML;
          listOfGamesDiv[listOfGamesIndex].textContent =
            localGamesDataDict[teamName];
          var splitDataIndex = localGamesDataDict[teamName].split("/");
          totalGamesRemaining += parseInt(splitDataIndex[0]);
          totalGamesForWeek += parseInt(splitDataIndex[1]);
          listOfGamesTd[
            listOfGamesIndex
          ].style.backgroundColor = getBackgroundColor(splitDataIndex[0]);
        }
        // Injured player
        else {
          listOfGamesDiv[listOfGamesIndex].textContent = "-/-";
          listOfGamesTd[listOfGamesIndex].style.backgroundColor = "";
        }
        backendIndex++;
        listOfTeamNameElementsIndex++;
      }
      // Empty player
      else {
        listOfGamesDiv[listOfGamesIndex].textContent = "-/-";
        listOfGamesTd[listOfGamesIndex].style.backgroundColor = "";
      }
      listOfGamesIndex++;
    }
  }
}

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                                Projected Stats 
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

acronymFromPlayerProjections = {};

acronymFromPlayerProjections["ATL"] = "Atl";
acronymFromPlayerProjections["BOS"] = "Bos";
acronymFromPlayerProjections["BKN"] = "Bkn";
acronymFromPlayerProjections["CHA"] = "Cha";
acronymFromPlayerProjections["CHI"] = "Chi";
acronymFromPlayerProjections["CLE"] = "Cle";
acronymFromPlayerProjections["DAL"] = "Dal";
acronymFromPlayerProjections["DEN"] = "Den";
acronymFromPlayerProjections["DET"] = "Det";
acronymFromPlayerProjections["GS"] = "GS";
acronymFromPlayerProjections["HOU"] = "Hou";
acronymFromPlayerProjections["IND"] = "Ind";
acronymFromPlayerProjections["LAC"] = "LAC";
acronymFromPlayerProjections["LAL"] = "LAL";
acronymFromPlayerProjections["MEM"] = "Mem";
acronymFromPlayerProjections["MIA"] = "Mia";
acronymFromPlayerProjections["MIL"] = "Mil";
acronymFromPlayerProjections["MIN"] = "Min";
acronymFromPlayerProjections["NO"] = "NO";
acronymFromPlayerProjections["NY"] = "NY";
acronymFromPlayerProjections["OKC"] = "OKC";
acronymFromPlayerProjections["ORL"] = "Orl";
acronymFromPlayerProjections["PHI"] = "Phi";
acronymFromPlayerProjections["PHO"] = "Phx";
acronymFromPlayerProjections["POR"] = "Por";
acronymFromPlayerProjections["SAC"] = "Sac";
acronymFromPlayerProjections["SA"] = "SA";
acronymFromPlayerProjections["TOR"] = "Tor";
acronymFromPlayerProjections["UTA"] = "Utah";
acronymFromPlayerProjections["WAS"] = "Wsh";

function getProjectionsColor(ratio) {
  if (ratio <= 0.1) {
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
  if (ratio <= 2.5) {
    return "#3bff3b";
  } else {
    return "#dee8f7";
  }
}

function getCategoriesBoxscorePage() {
  // console.log( "getCategoriesBoxscorePage" );
  var tableElements = document.getElementsByClassName(
    "Table2__shadow-scroller"
  );
  var firstTable = tableElements[1];
  var thElements = firstTable.getElementsByClassName("Table2__th");
  var categories = [];

  //Used to hide fgm/fga and ftm/fta
  var fgma =
    '<span data-statid="13" data-defaultsortasc="false" title="Field Goals Made">FGM</span><span style="margin: 0px 3px; text-decoration: none;">/</span><span data-statid="14" data-defaultsortasc="false" title="Field Goals Attempted">FGA</span>';
  var ftma =
    '<span data-statid="15" data-defaultsortasc="false" title="Free Throws Made">FTM</span><span style="margin: 0px 3px; text-decoration: none;">/</span><span data-statid="16" data-defaultsortasc="false" title="Free Throws Attempted">FTA</span>';
  var threema =
    '<span data-statid="17" data-defaultsortasc="false" title="Three Pointers Made">3PM</span><span style="margin: 0px 3px; text-decoration: none;">/</span><span data-statid="18" data-defaultsortasc="false" title="Three Pointers Attempted">3PA</span>';

  for (var i = 1; i < thElements.length; i++) {
    var headerHTML = thElements[i].children[0].children[0].innerHTML;
    if (
      headerHTML != "team" &&
      headerHTML != "score" &&
      headerHTML != "GR/G" &&
      headerHTML != fgma &&
      headerHTML != ftma &&
      headerHTML != threema
    ) {
      categories.push(thElements[i].children[0].children[0].innerHTML);
    }
  }
  return categories;
}

function getTeamNames() {
  // console.log( "getTeamNames" );
  var teamNames = [];
  var teamNameElements = document.getElementsByClassName("teamName truncate");

  teamNames.push(teamNameElements[0].innerHTML);
  teamNames.push(teamNameElements[1].innerHTML);

  return teamNames;
}

function addProjectionsTable(categories, projections) {
  // console.log( "addProjectionsTable" );
  var teamNames = getTeamNames();
  var tableElements = document.getElementsByClassName(
    "Table2__shadow-scroller"
  );
  var firstTable = tableElements[0];
  var newTable = document.createElement("table");
  newTable.className =
    "Table2__table-scroller Table2__table fbw-projections-table fbw-projections-element";
  newTable.cellPadding = "0";
  newTable.cellSpacing = "0";

  var newThead = document.createElement("thead");
  newThead.className =
    "Table2__sub-header Table2__thead fbw-projections-element";
  var newTrHeader = document.createElement("tr");
  newTrHeader.className =
    "Table2__header-row Table2__tr Table2__even fbw-projections-element";
  newThead.appendChild(newTrHeader);

  var fbwProjectionsHeaderTh = document.createElement("th");
  fbwProjectionsHeaderTh.className =
    "team-abbrev Table2__th fbw-projections-element";
  var fbwProjectionsHeaderDiv = document.createElement("div");
  fbwProjectionsHeaderDiv.className =
    "team-abbrev jsx-2810852873 table--cell header fbw-projections-element";
  fbwProjectionsHeaderDiv.innerText = "FBW Projections";
  fbwProjectionsHeaderTh.appendChild(fbwProjectionsHeaderDiv);
  newTrHeader.appendChild(fbwProjectionsHeaderTh);

  for (var i = 0; i < categories.length; i++) {
    var newThHeader = document.createElement("th");
    newThHeader.className = "Table2__th fbw-projections-element";
    var newDiv = document.createElement("div");
    newDiv.className =
      "jsx-2810852873 table--cell tar header fbw-projections-element";
    newDiv.innerText = categories[i];

    newThHeader.appendChild(newDiv);
    newTrHeader.appendChild(newThHeader);
  }

  // Body of Table
  var newTbody = document.createElement("tbody");
  newTbody.className = "Table2__tbody fbw-projections-element";

  var teamOneBodyTr = document.createElement("tr");
  var teamTwoBodyTr = document.createElement("tr");

  // Team One Name
  var teamOneBodyNameTd = document.createElement("td");
  var teamOneBodyNameDiv = document.createElement("div");
  teamOneBodyNameTd.className =
    "pl2 away-team-name team-name truncate Table2__td fbw-projections-element";
  teamOneBodyNameDiv.className =
    "jsx-2810852873 table--cell pl2 away-team-name team-name truncate fbw-projections-element";
  teamOneBodyNameDiv.innerText = teamNames[0];

  var teamTwoBodyNameTd = document.createElement("td");
  var teamTwoBodyNameDiv = document.createElement("div");
  teamTwoBodyNameTd.className =
    "pl2 away-team-name team-name truncate Table2__td fbw-projections-element";
  teamTwoBodyNameDiv.className =
    "jsx-2810852873 table--cell pl2 away-team-name team-name truncate fbw-projections-element";
  teamTwoBodyNameDiv.innerText = teamNames[1];

  teamOneBodyNameTd.appendChild(teamOneBodyNameDiv);
  teamOneBodyTr.appendChild(teamOneBodyNameTd);
  teamTwoBodyNameTd.appendChild(teamTwoBodyNameDiv);
  teamTwoBodyTr.appendChild(teamTwoBodyNameTd);
  newTbody.appendChild(teamOneBodyTr);
  newTbody.appendChild(teamTwoBodyTr);

  // Projected Stats
  var teamOneProjections;
  var teamTwoProjections;
  if (projections[0][projections[0].length - 1] == "TeamOne") {
    teamOneProjections = projections[0];
    teamTwoProjections = projections[1];
  } else {
    teamTwoProjections = projections[0];
    teamOneProjections = projections[1];
  }

  for (var i = 0; i < teamOneProjections.length - 1; i++) {
    var statTd = document.createElement("td");
    var statDiv = document.createElement("div");
    statTd.className = "Table2__td fbw-projections-element";
    statDiv.className =
      "jsx-2810852873 table--cell pl2 pr3 tar fbw-team-one-projection fbw-projections-element";
    statDiv.innerText = teamOneProjections[i];
    statTd.appendChild(statDiv);
    teamOneBodyTr.appendChild(statTd);
  }

  for (var i = 0; i < teamTwoProjections.length - 1; i++) {
    var statTd = document.createElement("td");
    var statDiv = document.createElement("div");
    statTd.className = "Table2__td fbw-projections-element";
    statDiv.className =
      "jsx-2810852873 table--cell pl2 pr3 tar fbw-team-two-projection fbw-projections-element";
    statDiv.innerText = teamTwoProjections[i];
    statTd.appendChild(statDiv);
    teamTwoBodyTr.appendChild(statTd);
  }

  // Colgroups for formatting
  var colgroup = document.createElement("colgroup");
  colgroup.span = "1";
  colgroup.className = "Table2__colgroup fbw-projections-element";
  var col = document.createElement("col");
  col.className = "Table2__col fbw-projections-element";
  colgroup.appendChild(col);

  var colgroup2 = document.createElement("colgroup");
  colgroup2.span = "9";
  colgroup2.className = "Table2__colgroup fbw-projections-element";
  var col2 = document.createElement("col");
  col2.className = "Table2__col fbw-projections-element";
  colgroup2.appendChild(col2);

  newTable.appendChild(colgroup);
  newTable.appendChild(colgroup2);
  newTable.appendChild(newThead);
  newTable.appendChild(newTbody);
  firstTable.appendChild(newTable);
}

function calculateProjections(data, categories) {
  // console.log( "calculateProjections" );
  var projections = [];
  for (var i = 0; i < categories.length; i++) {
    if (categories[i] == "FG%") {
      var totalFgm = 0.0;
      var totalFga = 0.0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalFgm += parseFloat(data[j]["fgmpg"]) * gamesForWeek;
        totalFga += parseFloat(data[j]["fgapg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalFgm / totalFga).toFixed(3));
    } else if (categories[i] == "FT%") {
      var totalFtm = 0;
      var totalFta = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalFtm += parseFloat(data[j]["ftmpg"]) * gamesForWeek;
        totalFta += parseFloat(data[j]["ftapg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalFtm / totalFta).toFixed(3));
    } else if (categories[i] == "3PM") {
      var totalThrees = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalThrees += parseFloat(data[j]["threepm"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalThrees).toFixed(1));
    } else if (categories[i] == "REB") {
      var totalReb = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalReb += parseFloat(data[j]["rpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalReb).toFixed(1));
    } else if (categories[i] == "AST") {
      var totalAst = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalAst += parseFloat(data[j]["apg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalAst).toFixed(1));
    } else if (categories[i] == "STL") {
      var totalStl = 0.0;
      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalStl += parseFloat(data[j]["spg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalStl).toFixed(1));
    } else if (categories[i] == "BLK") {
      var totalBlk = 0.0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalBlk += parseFloat(data[j]["bpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalBlk).toFixed(1));
    } else if (categories[i] == "TO") {
      var totalTO = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalTO += parseFloat(data[j]["topg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalTO).toFixed(1));
    } else if (categories[i] == "PTS") {
      var totalPts = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalPts += parseFloat(data[j]["ppg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalPts).toFixed(1));
    } else if (categories[i] == "MIN") {
      var totalMins = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalMins += parseFloat(data[j]["mpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalMins).toFixed(1));
    } else if (categories[i] == "FGM") {
      var totalFgm = 0;
      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalFgm += parseFloat(data[j]["fgmpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalFgm).toFixed(1));
    } else if (categories[i] == "FGA") {
      var totalFga = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalFga += parseFloat(data[j]["fgapg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalFga).toFixed(1));
    } else if (categories[i] == "FTM") {
      var totalFtm = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalFtm += parseFloat(data[j]["ftmpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalFtm).toFixed(1));
    } else if (categories[i] == "FTA") {
      var totalFta = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalFta += parseFloat(data[j]["ftapg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalFta).toFixed(1));
    } else if (categories[i] == "3PMI") {
      projections.push("-");
    } else if (categories[i] == "3P%") {
      var total3ptm = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        total3ptm += parseFloat(data[j]["threepm"]) * gamesForWeek;
      }

      var total3pta = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        total3pta += parseFloat(data[j]["threepa"]) * gamesForWeek;
      }
      projections.push(parseFloat(total3ptm / total3pta).toFixed(3));
    } else if (categories[i] == "OREB") {
      var oRebs = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        oRebs += parseFloat(data[j]["orpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(oRebs).toFixed(1));
    } else if (categories[i] == "DREB") {
      var dRebs = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        dRebs += parseFloat(data[j]["drpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(dRebs).toFixed(1));
    } else if (categories[i] == "A/TO") {
      var ATO = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        ATO += parseFloat(data[j]["ato"]) * gamesForWeek;
      }
      projections.push(parseFloat(ATO).toFixed(2));
    } else if (categories[i] == "STR") {
      //Steals
      var totalStl = 0.0;
      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalStl += parseFloat(data[j]["spg"]) * gamesForWeek;
      }
      //TO
      var totalTO = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalTO += parseFloat(data[j]["topg"]) * gamesForWeek;
      }

      var totalSTO = totalStl / totalTO;

      projections.push(parseFloat(totalSTO).toFixed(2));
    } else if (categories[i] == "EJ") {
      projections.push("-");
    } else if (categories[i] == "FF") {
      projections.push("-");
    } else if (categories[i] == "PF") {
      projections.push("-");
    } else if (categories[i] == "TF") {
      projections.push("-");
    } else if (categories[i] == "DQ") {
      projections.push("-");
    } else if (categories[i] == "DD") {
      var totalDD = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalDD += parseFloat(data[j]["ddpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalDD).toFixed(1));
    } else if (categories[i] == "TD") {
      var totalTD = 0;

      for (var j = 0; j < data.length; j++) {
        var teamAcronym = acronymFromPlayerProjections[data[j]["team"]];
        var gamesForWeek = localGamesDataDict[teamAcronym].split("/")[1];

        totalTD += parseFloat(data[j]["tdpg"]) * gamesForWeek;
      }
      projections.push(parseFloat(totalTD).toFixed(1));
    } else if (categories[i] == "QD") {
      projections.push("-");
    } else if (categories[i] == "PPM") {
      projections.push("-");
    } else if (categories[i] == "TW") {
      projections.push("-");
    } else if (categories[i] == "GP") {
      projections.push("-");
    } else if (categories[i] == "GS") {
      projections.push("-");
    } else if (categories[i] == "FGMI") {
      projections.push("-");
    } else if (categories[i] == "AFG%") {
      projections.push("-");
    } else if (categories[i] == "FTMI") {
      projections.push("-");
    }
  }
  return projections;
}

function addProjectionsBackgroundColor(categories) {
  var teamOneProjections = document.getElementsByClassName(
    "fbw-team-one-projection"
  );
  var teamTwoProjections = document.getElementsByClassName(
    "fbw-team-two-projection"
  );

  for (var i = 0; i < categories.length; i++) {
    var numerator = parseFloat(teamOneProjections[i].innerHTML);
    var denominator = parseFloat(teamTwoProjections[i].innerHTML);
    if (categories[i] == "TO") {
      var ratio = denominator / numerator;
    } else {
      var ratio = numerator / denominator;
    }
    var backgroundColor = getProjectionsColor(ratio);
    teamOneProjections[i].style.backgroundColor = backgroundColor;

    if (categories[i] == "TO") {
      var ratio = numerator / denominator;
    } else {
      var ratio = denominator / numerator;
    }

    backgroundColor = getProjectionsColor(ratio);
    teamTwoProjections[i].style.backgroundColor = backgroundColor;
  }
}

function requestProjectionsFromServer() {
  // console.log( "requestProjectionsFromServer" );
  var playersRequestStrings = buildPlayerProjectionsStrings();
  var categories = getCategoriesBoxscorePage();
  var projections = [];
  //Gets teamOne's first player abbreviation to keep track of teams
  var teamChecker = playersRequestStrings[0].slice(
    playersRequestStrings[0].indexOf("=") + 1,
    playersRequestStrings[0].indexOf(",")
  );
  for (var i = 0; i < playersRequestStrings.length; i++) {
    //Pass url to background script and get back response data
    chrome.runtime.sendMessage(
      { endpoint: "getplayers", players: playersRequestStrings[i] },
      function(response) {
        var projection = calculateProjections(response.data, categories);
        //Used to determine teamOne or teamTwo
        if (response.data[0].playerID == teamChecker) {
          projection.push("TeamOne");
        } else {
          projection.push("TeamTwo");
        }

        projections.push(projection);
        if (projections.length == 2) {
          addProjectionsTable(categories, projections);
          addProjectionsBackgroundColor(categories);
        }
      }
    );
  }
}

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        HTML Modifying Helper Functions 
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    moveButtonStarterPressed - Add an empty '-/-' cell for the
    EMPTY row created when a starter's 'MOVE' button is pressed.
*/
function moveButtonStarterPressed() {
  // console.log( "moveButtonStarterPressed" );

  var listOfElements = document.getElementsByClassName("Table2__tr--lg");
  for (var i = listOfElements.length - 1; i > 0; i--) {
    var listOfElementsTr = listOfElements[i];
    if (
      listOfElementsTr.children.length == 5 ||
      listOfElementsTr.children.length == 12 ||
      (listOfElementsTr.children.length == 13 && getActiveMenu() != "Schedule")
    ) {
      var newGamesTd = document.createElement("td");
      var newGamesDiv = document.createElement("div");
      newGamesTd.className =
        "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
      newGamesDiv.textContent = "-/-";
      newGamesDiv.style.textAlign = "center";
      newGamesTd.appendChild(newGamesDiv);
      listOfElementsTr.appendChild(newGamesTd);
      break;
    } else if (
      listOfElementsTr.children.length == 6 &&
      getActiveMenu() != "Stats"
    ) {
      var newCell = listOfElementsTr.insertCell(5);
      var newGamesDiv = document.createElement("div");
      newCell.className =
        "Table2__td Table2__td--fixed-width fbw-games-remaining-td fbw-new-element";
      newGamesDiv.className =
        "jsx-2810852873 table--cell fbw-games-remaining-div fbw-new-element";
      newGamesDiv.style.textAlign = "center";
      newGamesDiv.textContent = "-/-";
      newCell.appendChild(newGamesDiv);
      break;
    }
  }
}

/*
    removeGamesColumn - removes the games data column to allow new data to be filled
*/
function removeGamesColumn() {
  // console.log( "removeGamesColumn" );
  var elements = document.getElementsByClassName("fbw-games-remaining-td");

  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

/*
    removeEntireColumn - removes the games data column to allow new data to be filled
*/
function removeEntireColumn() {
  // console.log( "removeEntireColumn" );
  var elements = document.getElementsByClassName("fbw-new-element");

  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function removeProjectionsElements() {
  var elements = document.getElementsByClassName("fbw-projections-element");

  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Team - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */
/*
    Adjusting the roster by moving players around
*/
$("body").on("click", "a.move-action-btn", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    var className = this.className;
    var closestTd = $(this).closest("td")[0];
    var slotTd = $(closestTd).siblings("td")[0];
    var slotTdInnerDiv = slotTd.getElementsByClassName("table--cell")[0];
    var benchOrStarter = slotTdInnerDiv.innerHTML;

    if ($(this).text() == "MOVE") {
      // A Starter Player's 'MOVE' button has been pressed
      if (benchOrStarter != "BE" && className.indexOf("isActive") == -1) {
        // Need a small delay for the new EMPTY bench spot to be created dynamically
        setTimeout(moveButtonStarterPressed, 200);
      }
      // A Bench Player's 'MOVE' button has been pressed
      else {
      }
    }

    if ($(this).text() == "HERE") {
      // removeGamesColumn();
      requestGameDataFromServer("Update");
    }
  }
});

/*
    For showing the features after switching dates for daily leagues
*/
$("body").on("click", "div.custom--day", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    var className = this.className;
    if (className.indexOf("is-current") == -1) {
      renderGamesNoSleep(PAGE_TYPE_TEAM_SWITCH_DATES);
    }
  }
});

/*
    For showing the features after switching dates for weekly leagues
*/
$("body").on("click", "div.custom--week", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    var className = this.className;
    if (className.indexOf("is-current") == -1) {
      renderGamesNoSleep(PAGE_TYPE_TEAM_SWITCH_DATES);
    }
  }
});

/*
    For showing the features after switching tab menus
*/
$("body").on("click", "button.tabs__link", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    var className = this.className;
    var menuSelected = $(this).text();
    if (className.indexOf("tabs__list__item--active") == -1) {
      if (menuSelected == PAGE_TYPE_TEAM_STATS) {
        currentPageType = PAGE_TYPE_TEAM;
        renderGamesNoSleep(menuSelected);
      } else if (menuSelected == PAGE_TYPE_TEAM_TRENDING) {
        currentPageType = PAGE_TYPE_TEAM_TRENDING;
        renderGamesNoSleep(menuSelected);
      } else if (menuSelected == PAGE_TYPE_TEAM_SCHEDULE) {
        currentPageType = PAGE_TYPE_TEAM_SCHEDULE;
        renderGamesNoSleep(menuSelected);
      } else if (menuSelected == PAGE_TYPE_TEAM_NEWS) {
        currentPageType = PAGE_TYPE_TEAM_NEWS;
        renderGamesNoSleep(menuSelected);
      }
    } // Do nothing, same menu
    else {
    }
  }
});

/*
    Current button that returns to the current date
*/
$("body").on("click", "a.scoring--period-today", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    var className = this.className;
    if (className.indexOf("is-current") == -1) {
      renderGamesNoSleep(PAGE_TYPE_TEAM_SWITCH_DATES);
    }
  }
});

/*
    Changing dates with the calendar
*/
$("body").on("click", "button.dateCarousel__MonthTrigger", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    var className = this.className;
    if (
      className.indexOf("monthContainer__day--disabled") == -1 &&
      className.indexOf("monthContainer__day--selected") == -1
    ) {
      renderGamesNoSleep(PAGE_TYPE_TEAM_SWITCH_DATES);
    }
  }
});

/*
    Changing options with Show Stats dropdown
*/
$("body").on("change", "select.dropdown__select", function() {
  if (
    currentPageType == PAGE_TYPE_TEAM ||
    currentPageType == PAGE_TYPE_TEAM_TRENDING ||
    currentPageType == PAGE_TYPE_TEAM_NEWS ||
    currentPageType == PAGE_TYPE_TEAM_SCHEDULE ||
    currentPageType == PAGE_TYPE_TEAM_STATS
  ) {
    removeEntireColumn();
    localGamesDataDict = {};
    requestGameDataFromServer("Add");
    requestHeaderFromServer("Add");
  }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Players - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    Changing pages
*/
$("body").on("click", "li.PaginationNav__list__item", function() {
  if (currentPageType == PAGE_TYPE_PLAYERS) {
    // console.log( $( this ).text() );
    var className = this.className;

    if (className.indexOf("PaginationNav__list__item--active") == -1) {
      removeGamesColumn();
      requestGameDataFromServer("Add");
    }
  }
});

/*
    Changing positions of available free agents
*/
$("body").on("click", "label.picker-option", function() {
  if (currentPageType == PAGE_TYPE_PLAYERS) {
    // console.log( $( this ).text() );
    var className = this.className;

    if (className.indexOf("checked") == -1) {
      removeGamesColumn();
      setTimeout(requestGameDataFromServer("Add"), 2000);
    }
  }
});

/*
    Filters
*/
$("body").on("change", "select.dropdown__select", function() {
  if (currentPageType == PAGE_TYPE_PLAYERS) {
    removeGamesColumn();
    setTimeout(requestGameDataFromServer("Add"), 2000);
  }
});

/*
    Sortable
*/
$("body").on("click", "div.sortable", function() {
  if (currentPageType == PAGE_TYPE_PLAYERS) {
    if (
      $(this)
        .parent()
        .attr("class") == "Table2__th"
    ) {
      removeGamesColumn();
      setTimeout(requestGameDataFromServer("Add"), 2000);
    }
  }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Added Dropped - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    Changing pages
*/
$("body").on("click", "label.control--radio", function() {
  if (currentPageType == PAGE_TYPE_ADDED_DROPPED) {
    var className = this.className;

    if (className.indexOf("checked") == -1) {
      removeGamesColumn();
      setTimeout(requestGameDataFromServer("Add"), 3000);
    }
  }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                    Fantasy Cast Points - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

$("body").on("change", "select.dropdown__select", function() {
  if (currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS) {
    removeEntireColumn();
    localGamesDataDict = {};
    requestGameDataFromServer("Add");
  }
});

$("body").on("click", "li.carousel__slide", function() {
  if (currentPageType == PAGE_TYPE_FANTASY_CAST_POINTS) {
    // console.log( "change menu" );
    var className = this.className;
    if (className.indexOf("selected") == -1) {
      removeEntireColumn();
      setTimeout(requestGameDataFromServer("Add"), 1000);
    }
  }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                    Fantasy Cast Categories - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

$("body").on("change", "select.dropdown__select", function() {
  if (currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES) {
    removeEntireColumn();
    localGamesDataDict = {};
    requestGameDataFromServer("Add");
    requestHeaderFromServer("Add");
  }
});

$("body").on("click", "button.btn", function() {
  if (currentPageType == PAGE_TYPE_FANTASY_CAST_MOST_CATEGORIES) {
    removeEntireColumn();
    localGamesDataDict = {};
    requestGameDataFromServer("Add");
  }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                    Boxscore - HTML Object Changes 

------------------------------------------------------------------------------------------------------------------------------------------ */

$("body").on("change", "select.dropdown__select", function() {
  if (currentPageType == PAGE_TYPE_BOXSCORE) {
    removeEntireColumn();
    removeProjectionsElements();
    localGamesDataDict = {};
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  }
});

$("body").on("click", "li.carousel__slide", function() {
  if (currentPageType == PAGE_TYPE_BOXSCORE) {
    // console.log( "change menu" );
    var className = this.className;
    if (className.indexOf("selected") == -1) {
      removeEntireColumn();
      removeProjectionsElements();
      buildPlayerProjectionsStrings();
      setTimeout(requestHeaderFromServer("Add"), 2000);
      setTimeout(requestGameDataFromServer("Add"), 3000);
    }
  }
});

/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Page Handlers 
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

/*
    renderGamesSleep - 
*/
async function renderGamesSleep(type) {
  // console.log( "renderGamesSleep - type=" + type );
  // console.log( "renderGamesSleep - typeof type=" + typeof type );
  await sleep(6000);
  if (type == PAGE_TYPE_UNDEFINED || typeof type == "undefined") {
    return;
  }
  if (type == PAGE_TYPE_TEAM) {
    isLeagueDailyOrWeekly();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_PLAYERS) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_ADDED_DROPPED) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_BOXSCORE) {
    await sleep(5000);
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_FANTASY_CAST) {
    isFantasyCastMostCatsOrPoints();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_NEWS) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_TRENDING) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_SCHEDULE) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_STATS) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if ((type = PAGE_TYPE_TEAM_SWITCH_DATES)) {
    removeGamesColumn();
    requestHeaderFromServer("Update");
    requestGameDataFromServer("Add");
  } else if (type == WEEKLY_LEAGUE) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  }
}

/*
    renderGamesNoSleep - 
*/
async function renderGamesNoSleep(type) {
  // console.log( "renderGamesNoSleep - type=" + type );
  // console.log( "renderGamesNoSleep - typeof type=" + typeof type );
  await sleep(2000);
  if (type == PAGE_TYPE_UNDEFINED || typeof type == "undefined") {
    return;
  }
  if (type == PAGE_TYPE_TEAM) {
    isLeagueDailyOrWeekly();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_PLAYERS) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_ADDED_DROPPED) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_BOXSCORE) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_FANTASY_CAST) {
    isFantasyCastMostCatsOrPoints();
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_NEWS) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_TRENDING) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_SCHEDULE) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if (type == PAGE_TYPE_TEAM_STATS) {
    isLeagueDailyOrWeekly();
    removeEntireColumn();
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  } else if ((type = PAGE_TYPE_TEAM_SWITCH_DATES)) {
    removeGamesColumn();
    requestHeaderFromServer("Update");
    requestGameDataFromServer("Add");
  } else if (type == WEEKLY_LEAGUE) {
    requestHeaderFromServer("Add");
    requestGameDataFromServer("Add");
  }
}

// var observer = new MutationObserver( callLater );
var observer = new MutationObserver(function(mutations) {
  var currentUrl = getCurrentUrl();
  // console.log( currentUrl );
  // console.log( getPageTypeFromUrl( currentUrl ) );
  var pageType = getPageTypeFromUrl(currentUrl);
  localGamesDataDict = {};
  renderGamesNoSleep(pageType);
});

var observerConfig = {
  attributes: true,
  characterData: true,
  childList: true
};

var targetNode = document.getElementById("__next");

function waitForAddedNode(params) {
  new MutationObserver(function(mutations) {
    var element = document.getElementById(params.id);
    if (element) {
      var currentUrl = getCurrentUrl();
      // console.log( currentUrl );
      // console.log( getPageTypeFromUrl( currentUrl ) );
      var pageType = getPageTypeFromUrl(currentUrl);
      renderGamesSleep(pageType);
      this.disconnect();
      params.done(element);
    }
  }).observe(params.parent || document, {
    subtree: !!params.recursive,
    childList: true
  });
}

waitForAddedNode({
  id: "__next",
  parent: document.body,
  recursive: false,
  done: function(el) {
    observer.observe(targetNode, observerConfig);
  }
});
