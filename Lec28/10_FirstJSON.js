// npm init           // jb bhi hm naye folder m honge 
// nmp install minimist
// node 10_FirstJSON.js --dest=student.json

let minimist = require("minimist");
let fs = require("fs");

let args =minimist(process.argv);

//JSON-->JavaScript Notation
//Json means saving data in the same format as of javascript objects


//without class object bn jaata hai yaha
let s1 ={                   
    name:"Seb",
    age:34
};  // s1 is an javascipt object (JSO), name and age are properties or data members

let s2={
    name:"Yamaha",
    age:20
};
// console.log(s1);  // output-->{ name: 'Seb', age: 34 }
// console.log(s2.name);  // output-->Yamaha

 let s=[s1,s2];   //array of objects which is also a object can be called javascript object (JSO)
// console.log(s);  //output-->[ { name: 'Seb', age: 34 }, { name: 'Yamaha', age: 20 } ]

let json = JSON.stringify(s);   // it converts JSO to JSON
console.log(json); //output --> [{"name":"Seb","age":34},{"name":"Yamaha","age":20}]
fs.writeFileSync(args.dest, json,"utf-8");