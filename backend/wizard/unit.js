function gamesRemaining() {
    console.log("clicked")
    const Http = new XMLHttpRequest();
    const url='http://localhost:8000/gamesRemaining/?format=json&team=teamAcronym&/';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log(Http.responseText)
        }
    };
}

function getAllTeams() {
    console.log("clicked get all teams")
    var Http = new XMLHttpRequest();
    var url='http://localhost:8000/teams/?format=json';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("teamsDiv").innerText = Http.responseText;
            var teams = JSON.parse(Http.responseText.toString());
            for(var i=0; i<teams.length; i++) {
                console.log(teams[i]);
            }

        }   
    }

}

function gamesToday() {
    console.log("clicked gamesToday")
    var Http = new XMLHttpRequest();
    var date = "2018-08-26" //must be in this format. we need to pull from the matchups screen to display number of games
    var url = 'http://localhost:8000/gamestoday/?format=json&date='+date;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("gamesTodayDiv").innerText = Http.responseText;
            var day = JSON.parse(Http.responseText.toString());
            console.log("Number of games on " + date + ": " + day[0].numberOfGames)
        }
    }
}


