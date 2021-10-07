//npm init
//npm minimist

// node 13_FirstFolderCreation.js --source=teams.json --dest=root

let minimist=require("minimist");
let fs=require("fs");
let path=require("path"); 

let args = minimist(process.argv);

let teamsJSON=fs.readFileSync(args.source,"utf-8");
let teams= JSON.parse(teamsJSON);

for(let i=0;i<teams.length;i++)
{
    let folderpath=path.join(args.dest,teams[i].name);
    console.log(folderpath)// root\India    root\Australia    root\England
    

    fs.mkdirSync(folderpath);
}

