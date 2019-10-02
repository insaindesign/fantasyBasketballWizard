/* ------------------------------------------------------------------------------------------------------------------------------------------

                                                        Background Script - ESPN
                                                        
------------------------------------------------------------------------------------------------------------------------------------------ */

// Accepts a message from a content script in espn.js then fetches and returns the response
console.log("running");
chrome.runtime.onMessage.addListener(function(
  request,
  sender,
  sendResponse,
  callback
) {
  let url = request.url;
  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("response status: " + response.status);
        return;
      }
      response.json().then(function(data) {
        sendResponse({ data: data });
      });
    })
    .catch(function(err) {
      console.log("EXCEPTION", err);
      return false;
    });
  return true;
});
