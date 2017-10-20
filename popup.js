function test() {
    //need to access current tab and change something. 
    var url = window.location.href;
    var regexTeam = "/https?:\/\/basketball[.]fantasysports[.]yahoo[.]com\/nba\/\d{3,7}\/\d{1,2}/";
    var urlMatch = url.match(regexTeam);
    var div = document.createElement('div');
    div.innerHTML = "<h1>TEST</h1>";
    //document.getElementById("team-card-info").appendChild(div);
    document.getElementsByClassName("Grid-u Px-med Fz-sm Va-mid")[0].appendChild(div);
    document.getElementsByClassName("Grid-u Px-med Fz-sm Va-mid")[0].style.display = '-webkit-inline-box';
    console.log("hello world");
}
var url = window.location.href;
console.log(url);
test()