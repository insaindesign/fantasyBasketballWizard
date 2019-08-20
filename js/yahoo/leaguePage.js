
//including player NBA team names
var text = document.evaluate('//*[@class="Bd"]', document, null, XPathResult.ANY_TYPE, null);
var thisPar = text.iterateNext();
var paragraph = thisPar.textContent.split('\n');
paragraph = paragraph.filter(function(str){return /\S/.test(str.trim());});
paragraph = paragraph.map(Function.prototype.call, String.prototype.trim);

league = {}
teams = {}
textSamples = []
p = 0

while (p < paragraph.length-1) {
    //console.log("league: ", league);
    //textSamples.push(thisTag.textContent);
    
    if (paragraph[p+1].includes('PosPlayer')){
        teamName = paragraph[p];
        console.log("new team found: ", teamName);
        league[teamName] = {}
        league[teamName]['players'] = [];
        league[teamName]['url'] = "https://www.fantasywizard.site/getplayers/?players=";
        p++;
    } else if (paragraph[p].toLowerCase().includes('layer note')){
        console.log("player note found: ", paragraph[p]);
        p++;
        player = paragraph[p];
        console.log("player name: ", player);
        player = player.split(' - ')[0];
        player = player.split(' ');
        firstName = player[0][0];
        player.shift();
        player = firstName + player.join("");
        league[teamName]['players'].push(player);
        league[teamName]['url'] = league[teamName]['url'] + player + ",";
    }
    p++;
}
