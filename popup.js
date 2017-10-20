function render() {

    var url = window.location.href;
    var regexTeam = "/https?:\/\/basketball[.]fantasysports[.]yahoo[.]com\/nba\/\d{3,7}\/\d{1,2}/";
    var urlMatch = url.match(regexTeam);
    var players = {}
    var table_opp;
    
    
    //init stats table
    table = document.getElementById("statTable0");
    
    //init table dimensions
    num_cols = table.rows[1].cells.length;
    num_rows = table.rows.length;

    //replace Rankings headers
    table.rows[0].cells[5].innerText = "Games";
    table.rows[1].cells[6].innerText = "Remaining";
    table.rows[1].cells[7].innerText = "Total";
    
    
    //create opponent page url
    url_post = "?date="
    date = new Date()
    year = date.getYear() + 1900;
    month = date.getMonth() + 1;
    date.getDate() - date.getDay() + 1;
    day = date.getDay()
    url_post = url_post + year + "-" + month + "-" + day + "&stat1=O";
    url_full = url + url_post;
    
    
    
    //request opponent page
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url_full, true);
    console.log(url_full)
    xhr.responseType = 'document';
    xhr.send();
    xhr.onload = function(e, write) {
        
        //download opponent doc and table
        doc = e.target.responseXML;
        table_opp = doc.getElementById("statTable0")
        
    }
    
    write = function(){
        for(row = 2; row < num_rows - 5; row++){
            var rem = 0;
            var total = 0;
            for (col = 6; col < 13; col++){
                console.log(table_opp.rows[row].cells[col].innerText)
                var hasGame = Boolean(table_opp.rows[row].cells[col].innerText) ? 1 : 0;
                total = total + hasGame;
                if (col - 6 > day)
                    rem = rem + hasGame;
            }
            //write to cells
            console.log("write")
            table.rows[row].cells[6].innerText = rem
            table.rows[row].cells[7].innerText = total
        }
        

    }

}
var url = window.location.href;
render()
