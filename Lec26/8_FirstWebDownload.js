// npm install axios
// node .\8_FirstWebDownload.js --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --dest="download.html"
let minimist = require("minimist");
let axios=require("axios");  // moddule used to download from web
let fs=require("fs");

let args=minimist(process.argv);
let dwnldPromise = axios.get(args.url);   // axios givimg promise that he will download from web
dwnldPromise.then(function(response){     // if promiss got fulfilled the download data from web and give it to respose variable
    let html=response.data;
    fs.writeFileSync(args.dest,html,"utf-8");
})

