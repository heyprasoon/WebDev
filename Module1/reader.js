let fs = require("fs");
let path=require("path");

let inputDir=process.argv.slice(2)[0];
let allElement = fs.readdirSync(inputDir);
//console.log(allElement);
let content ="";
for(let i=0;i<allElement.length;i++)
{
    let stateOfPath = fs.lstatSync(allElement[i]);
    let ext = path.extname(allElement[i])
    if(stateOfPath.isFile() && ext==".txt")
    {
        content+=fs.readFileSync(allElement[i]);
    }

}
//console.log(content);
fs.writeFileSync("summary.txt",content);