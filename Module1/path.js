let inputArr=process.argv.slice(2);
let path = require("path");
let fs=require("fs");
fs.mkdirSync(inputArr[0]);
let joinedPath= path.join(process.cwd(),inputArr[0]);
for(let i=1; i<=3;i++ )
{
    let newFolder=path.join(joinedPath,inputArr[i]);
    fs.mkdirSync(newFolder);
    for(let j=1;j<=5;j++)
    {
        let newPath= path.join(newFolder,inputArr[4]+j);
        fs.mkdirSync(newPath);
        let filePath=path.join(newPath,inputArr[5]);
        fs.writeFileSync(filePath,inputArr[6]);
    }
}
