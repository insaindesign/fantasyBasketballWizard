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
  if (isMatchupTotals) {
    var weekNum = "weekNum=";
    weekNum += document
      .getElementsByClassName("flyout-title")[0]
      .innerText.split(" ")[1];
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
  return (
    document.getElementsByClassName("Navitem Ta-c No-py Fz-xs Selected")[0]
      .firstElementChild.innerText === "Matchup Totals"
  );
}

getGamesToday();
