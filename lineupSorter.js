tabURL = window.location.href;
var origBtn = innerHTML("a", "Start Active Players");

var regexTeam = /https?:\/\/basketball[.]fantasysports[.]yahoo[.]com\/nba\/\d{3,7}\/\d{1,2}/;
var urlMatch = tabURL.match(regexTeam);
if(tabURL.indexOf(urlMatch) !== -1 && origBtn != null){
	var div = document.createElement('div');
    div.innerHTML = "<div class='selectContainer'>\
            <select required class='form-control' name='dayselect' id='days'>\
                <option value='1'>1 Day</option>\
                <option value='2'>2 Days</option>\
                <option value='3'>3 Days</option>\
                <option value='4'>4 Days</option>\
                <option value='5'>5 Days</option>\
                <option value='6'>6 Days</option>\
                <option value='7'>7 Days</option>\
            </select>\
            <button id='submit'>Sort</button>\
        </div>";
    document.getElementsByClassName("Grid-u Px-med Fz-sm Va-mid")[0].appendChild(div);
    document.getElementsByClassName("Grid-u Px-med Fz-sm Va-mid")[0].style.display = '-webkit-inline-box';
	}
document.getElementById('submit').addEventListener('click', function (event) {
    var url = origBtn.href.toString();
	submitted(url);
}, false);

function submitted(urlString){
	var days = -1;
	var today = new Date();
	var year = today.getFullYear();
	var days = document.getElementById("days").value;

	if(urlString.indexOf(year) != -1 || urlString.indexOf(year+1) != -1){
		var start = urlString.indexOf(year);
		if(start < 0) start = urlString.indexOf(year+1); //if user uses during end of December
		var date = urlString.substring(start,start+10);
		var oldDate = "";
		var i;
		window.open(urlString,"_self");
		for(i = 0; i < days-1; i++){
			oldDate = date;
			date = nextDate(date);
			try{
				urlString = urlString.replace(oldDate,date);
				window.open(urlString);
			}catch (err){
				console.log(err);
			}
		}
	}else{
		alert("Error. Sorting Failed.");
	}
}

function innerHTML(type, str){
  var elmList = document.getElementsByTagName(type);
    for(var i=0; i < elmList.length; i++){
      if(elmList[i].innerHTML == str){
      var parent = elmList[i];
      return parent;
      }
    }
    return null;
}
/* ex: 
https://basketball.fantasysports.yahoo.com/nba/105100/6/startactiveplayers?date=2016-02-17&crumb=NOiQuYBDyF2
*/
function nextDate(date){
  var parts = date.split("-");
  var dt = new Date(
    parseInt(parts[0], 10),      // year
    parseInt(parts[1], 10) - 1,  // month (starts with 0)
    parseInt(parts[2], 10)       // date
  );
  dt.setDate(dt.getDate() + 1);
  parts[0] = "" + dt.getFullYear();
  parts[1] = "" + (dt.getMonth() + 1);
  if (parts[1].length < 2) {
    parts[1] = "0" + parts[1];
  }
  parts[2] = "" + dt.getDate();
  if (parts[2].length < 2) {
    parts[2] = "0" + parts[2];
  }
  return parts.join("-");
}
