Teams = ["Atl", "Bos", "Bkn", "Cha", "Chi", "Cle", "Dal", "Den", "Det", "GS", "Hou", "Ind", "LAC", "LAL", "Mem", "Mia", "Mil", "Min", "NO", "NY", "OKC", "Orl", "Phi", "Pho", "Por", "Sac", "SA", "Tor", "Uta", "Was"]

Schedule = {}

teams = Teams.join(",") + ","

function getFormattedQueryFromURL() {
    var url = window.location.href;
    var start = url.indexOf("date");
    
    var end = url.indexOf("&", start);

    var str = url.substring(start+5, end);
    if(str == "totals" || start == -1) {
        var weekNum = "weekNum=";
        weekNum+=document.getElementsByClassName("flyout-title")[0].innerText.split(" ")[1];
        console.log(weekNum);
        return weekNum;
    }
    return "date="+str;
}
function getGames() {
    var query = getFormattedQueryFromURL();
    var url = 'https://www.fantasywizard.site/gamestoday/?'+'&format=json&'+query;
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

function serialize_player(player_string){
    
}

function getStats(teams) {
    //init stats table
    table = document.getElementById("statTable3");
    
    //find stats headers
    header = table.rows[0].innerText.split("\n");
    header = header.slice(0, len(header)/2)
    
    num_rows = table.rows.length;
    
    players_left = []
    players_right = []
    for (var i = 1; i < num_rows; i++){
        row = table.rows[i].innerText.split('\n')
        player_left = row[row.indexOf("Player Note")+1]
        player_left = serialize_player(player_left)
        players_left.push(player_left)
        
        row = row.slice(row.indexOf("Player Note")+2, row.length))
        
        player_right = row[row.indexOf("Player Note")+1]
        player_right = serialize_player(player_right)
        players_right.push(player_right)
        
        
        
    }
    var dateString = getFormattedDate();
    var url = 'https://www.fantasywizard.site/gamesremaining/?pageName=yTeamsPage&teams='+team+'&format=json&date='+dateString;
    fetch(url)
        .then(function(response){
        if (response.status !== 200) {
            console.log('Called to backend failed: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            displayProjections(data);
            
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
function displayGamesToday(data) {
    var div = document.createElement("p");
    div.innerText = " NBA games today: " + data;
    div.setAttribute("class", "Ta-c C-grey Mt-10");
    div.style.color = "#0078FF";
    div.style.fontSize = "13px";
    div.style.marginTop = "0px";
    var className = "felo-matchup-button yfa-rapid-beacon yfa-rapid-module-felo-matchup-button F-link Cur-p Fz-m";
    var parentDiv = document.getElementsByClassName(className)[0].parentNode;
    parentDiv.appendChild(div);
}

function displayStats(data){
    
}
getGames();
