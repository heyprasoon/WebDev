// npm init           // jb bhi hm naye folder m honge 
// nmp install minimist
// node 10_FirstWritingJSON.js --dest=teams.json

let minimist = require("minimist");
let fs = require("fs");

let args =minimist(process.argv);

//JSON-->JavaScript Notation
//Json means saving data in the same format as of javascript objects

let teams =[
    {
        name:"India",
        rank:1,
        matches:[
            {
                opponent: "England",
                result:"win"
            },
            
            {
                opponent: "Austrlia",
                result:"win"
            }
        ]
    },
    {
        name:"Australia",
        rank:3,
        matches:[
            {
                opponent: "England",
                result:"win"
            },
            
            {
                opponent: "India",
                result:"lose"
            }
        ]
    },
    {
        name:"England",
        rank:2,
        matches:[
            {
                opponent: "India",
                result:"lose"
            },
            
            {
                opponent: "Austrlia",
                result:"lose"
            }
        ]
    }
    
]


let json = JSON.stringify(teams);   // it converts JSO to JSON
console.log(json); //output --> [{"name":"Seb","age":34},{"name":"Yamaha","age":20}]
fs.writeFileSync(args.dest, json,"utf-8");