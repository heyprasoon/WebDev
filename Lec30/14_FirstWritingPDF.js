// npm init
// npm minimist

// node 14_FirstWritingPDF.js --source=teams.json --dest=root

let minimist = require("minimist");
let fs= require("fs");
let path=require("path");

let args= minimist(process.argv);

let teamsJSON =fs.readFileSync(args.source,"utf-8");
let teams= JSON.parse(teamsJSON);

fs.mkdirSync(args.dest);

for(let i=0;i<teams.length;i++)
{
    let folderName= path.join(args.dest,teams[i].name);
    fs.mkdirSync(folderName);
    for(let j=0;j<teams[i].matches.length;j++)
    {
        let filename=path.join(folderName,teams[i].matches[j].opponent+".pdf");
        fs.writeFileSync(filename,"","utf-8");
    }
}