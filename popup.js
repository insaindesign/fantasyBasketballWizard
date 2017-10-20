document.getElementById("mainButton").onclick = test;
var url = window.location.href;
print(url);
function test() {
    //need to access current tab and change something. 
    console.log("hello world");
    document.getElementById("h1").text("testing");
    document.getElementById("gb_P").innerHTML("ugly");
}