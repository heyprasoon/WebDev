// read a file, capitlize every word, write the file
let minimist = require("minimist");
let args = minimist(process.argv);

// node FirstFiles.js --source=f1.txt --dest=f2.txt
// args.source (f1.txt) and args.dest (f2.txt)
let fs = require("fs");
let stext = fs.readFileSync(args.source, "utf-8");

let words = stext.split(" "); // string has split
for(let i = 0; i < words.length; i++){
    words[i] = words[i].toUpperCase();
}

let dtext = words.join(" "); // array has join
console.log(dtext);
//fs.writeFileSync(args.dest, dtext, "utf-8");

