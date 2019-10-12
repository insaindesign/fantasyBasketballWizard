/* -----------------
Background Script
-------------------- */

// Accepts a message from any of our content scripts then fetches and returns the response data back
console.log("running");
chrome.runtime.onMessage.addListener(function(
  request,
  sender,
  sendResponse,
  callback
) {
  let {
    endpoint,
    date,
    teams,
    pageName,
    leagueID,
    query,
    players,
    week
  } = request;
  let domain = "https://www.sportswzrd.com";
  let queryString = "format=json&";
  switch (endpoint) {
    case "gamesremaining": {
      queryString += `teams=${teams}&date=${date}&pageName=${pageName}&leagueID=${leagueID}`;
      queryString += week ? "&weekNum=" + week : "";
      break;
    }
    case "getplayers": {
      queryString += `players=${players}`;
      break;
    }
    case "gamestoday": {
      queryString += `${query}`;
      break;
    }
  }
  let url = `${domain}/${endpoint}/?${queryString}`;
  console.log(url);
  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("response status: " + response.status);
        return false;
      }
      response.json().then(function(data) {
        sendResponse({ data: data });
      });
    })
    .catch(function(err) {
      console.log("fetch failed", err);
      return false;
    });
  return true;
});
