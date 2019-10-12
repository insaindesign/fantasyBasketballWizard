function displayGamesToday(data) {
  var div = document.createElement("p");
  isMatchupTotals()
    ? (div.innerText = "NBA games this week: ")
    : (div.innerText = "NBA games today: ");
  div.innerText += data;
  div.setAttribute("class", "Ta-c C-grey Mt-10");
  div.style.color = "#0078FF";
  div.style.fontSize = "13px";
  div.style.marginTop = "0px";
  var className =
    "felo-matchup-button yfa-rapid-beacon yfa-rapid-module-felo-matchup-button F-link Cur-p Fz-m";
  var parentDiv = document.getElementsByClassName(className)[0].parentNode;
  parentDiv.appendChild(div);
}

function getFormattedQueryFromURL() {
  var url = window.location.href;
  var start = url.indexOf("date");
  var end = url.indexOf("&", start);
  var str = url.substring(start + 5, end);
  if (str == "totals" || start == -1) {
    var weekNum = "weekNum=";
    weekNum += document
      .getElementsByClassName("flyout-title")[0]
      .innerText.split(" ")[1];
    //console.log(weekNum);
    return weekNum;
  }
  return "date=" + str;
}

function getGamesToday() {
  var query = getFormattedQueryFromURL();
  chrome.runtime.sendMessage({ endpoint: "gamestoday", query: query }, function(
    response
  ) {
    var data = response.data;
    displayGamesToday(data);
  });
}

function isMatchupTotals() {
  var url = window.location.href;
  var start = url.indexOf("date");
  var end = url.indexOf("&", start);
  var str = url.substring(start + 5, end);
  return str == "totals" || start == -1;
}

getGamesToday();
