/*
//including player NBA team names
var text = document.evaluate('//*[@class="Bd"]//a', document, null, XPathResult.ANY_TYPE, null);
var thisPar = text.iterateNext();
var paragraph = thisPar.textContent.split("\n");
*/

//league team name and player names only
function initLeague(){
    var text = document.evaluate('//*[@class="Bd"]//a', document, null, XPathResult.ANY_TYPE, null);
    var thisTag = text.iterateNext();

    league = {}
    teams = {}
    textSamples = []
    
    while (thisTag) {
        console.log("league: ", league);
        //textSamples.push(thisTag.textContent);
        teamName = thisTag.textContent;
        league[teamName] = []
        thisTag = text.iterateNext();
        isTeam = false;
        while (!isTeam && thisTag){
            console.log("teamName: ", teamName);
            t = thisTag.textContent;
            if (t.toLowerCase().includes('layer note')){
                console.log("player found: ", t);
                thisTag = text.iterateNext();
                t = thisTag.textContent;
                console.log("player name: ", t);
                league[teamName].push(t);
                thisTag = text.iterateNext();
            } else if ((t.includes('W') || t.includes('L')) && (t.includes('vs') || t.includes('@'))){ //improve with regex
                console.log("game log found: ", t);
                thisTag = text.iterateNext();
            } else {
                console.log("new team found: ", t);
                isTeam = true;
            }
        }
        //thisTag = text.iterateNext();
    }

}

