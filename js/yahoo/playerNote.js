Teams = [
  "Atl",
  "Bos",
  "Bkn",
  "Cha",
  "Chi",
  "Cle",
  "Dal",
  "Den",
  "Det",
  "GS",
  "Hou",
  "Ind",
  "LAC",
  "LAL",
  "Mem",
  "Mia",
  "Mil",
  "Min",
  "NO",
  "NY",
  "OKC",
  "Orl",
  "Phi",
  "Pho",
  "Por",
  "Sac",
  "SA",
  "Tor",
  "Uta",
  "Was"
];
let notes = document.getElementsByClassName("playernote");
var visited = [];

for (note of notes) {
  note.addEventListener("click", function(e) {
    key = makePlayerKey(
      e.target.parentElement.parentElement.children[1].innerText
    );

    //first time opening this players modal
    if (!visited.includes(key)) {
      visited.push(key);
      setTimeout(() => {
        let modal = document.getElementsByClassName(
          "yui3-ysplayernote-content"
        )[0];
        chrome.runtime.sendMessage(
          { endpoint: "getplayers", players: key + "," },
          function(response) {
            if (response.data.length === 0) {
              return;
            }
            var data = response.data;
            let statBox = modal.getElementsByClassName("seasonstats")[0];
            appendFullStats(statBox, data);
          }
        );
      }, 800);
    }
  });
}
const appendFullStats = (statbox, data) => {
  let stats = data[0];
  adjustStatBoxStyle(statbox);
  let li_fgp = generateLIForStatBox("FG%", stats.fgpct);
  let li_ftpct = generateLIForStatBox("FT%", stats.ftpct);
  let li_spg = generateLIForStatBox("SPG", stats.spg);
  let li_bpg = generateLIForStatBox("BPG", stats.bpg);
  let li_threepm = generateLIForStatBox("3PM", stats.threepm);

  statbox.insertBefore(li_fgp, statbox.children[1]);
  statbox.insertBefore(li_ftpct, statbox.children[2]);
  statbox.insertBefore(li_threepm, statbox.children[3]);
  statbox.appendChild(li_spg);
  statbox.appendChild(li_bpg);
  statbox.appendChild(generateLIForStatBox("TO", stats.topg));
};

const adjustStatBoxStyle = statbox => {
  statbox.lastElementChild.setAttribute("class", "");
  for (let i = 0; i < statbox.children.length; i++) {
    statbox.children[i].style.paddingRight = "13px";
  }
};

const generateLIForStatBox = (category, average) => {
  let li = document.createElement("li");
  let dl = document.createElement("dl");
  let dt = document.createElement("dt");
  let dd = document.createElement("dd");

  dt.innerText = category;
  dd.innerText = average;

  dl.appendChild(dt);
  dl.appendChild(dd);
  li.appendChild(dl);
  li.style.paddingRight = category !== "TO" ? "10px" : "0px";
  return li;
};

const makePlayerKey = str => {
  str = str.replace(/\./g, "");
  str = str.replace(/\-/g, "");
  let arr = str.split(" ");
  let key = arr[0].length > 1 ? `${arr[0][0]}${arr[1]}` : `${arr[0]}${arr[1]}`;
  for (let i = 2; i < arr.length; i++) {
    key += arr[i];
    if (Teams.includes(arr[i])) {
      return key;
    }
  }
};
