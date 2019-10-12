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
  let { endpoint, date, week, teams, pageName, leagueID } = request;
  let domain = "https://www.sportswzrd.com";
  let url = `${domain}/${endpoint}?format=json&teams=${teams}&date=${date}&pageName=${pageName}&leagueID=${leagueID}`;
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
