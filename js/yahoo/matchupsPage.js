function getFormattedDateFromURL() {
    var url = window.location.href;
    var start = url.indexOf("date");
    
    //check to see if date is in url
    //if its not in url, make request with the week


    var end = url.indexOf("&", start);
    return url.substring(start+5, end);


}
function getGames() {
    var dateString = getFormattedDateFromURL();
    var url = 'https://www.fantasywizard.site/gamestoday/?'+'&format=json&date='+dateString;
    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            displayGamesToday(data);
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function displayGamesToday(data) {
    var p = document.createElement("p");
    p.innerText = " NBA games today: " + data;
    p.setAttribute("class", "Ta-c C-grey Mt-10");
    p.style.color = "#0078FF";
    var section = document.getElementById("matchup-wall-header");
    section.appendChild(p);
    

}
getGames();