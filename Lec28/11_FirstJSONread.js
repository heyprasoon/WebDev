// node 11_FirstJSONRead.js --source=teams.json

let minimist =require("minimist");
let fs=require("fs");

let args =minimist(process.argv);

fs.readFile(args.source,"utf-8", function(err,json)
{
    if(err){
        console.log("Read nahi hua -->error");
    }
    else {
        console.log(json);
        // ye json jo aaya h voh string k format m aaya h, because remember one thing "Everything comes as a string"
        // toh hm uske ander ka access nhi kr paenge
        // JSON ko waapis JSO bnaana padega
        let teams = JSON.parse(json); // JSON to JSO so that you can manipulate object
        console.log(teams[2].matches[1].opponent);  //output-->Austrlia
    }
})
//if you want to save JSO , then you have to convert JSO to JSON usung JSON.stringify;
//if you want to manipulate JSON convert the to JSO using JSON.parse