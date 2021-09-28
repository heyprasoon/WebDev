// t1=Read a file(disk)
// t2=Calculate Primes

// t2 is done in paraller with t1
//node .\FirstCallback.js --source=f1.txt --dest=f2.txt --n=50000


let minimist = require("minimist");
let fs=require("fs");

function IsPrime(x)
{
    for(let div=2;div<x;div++)
    {
        if(x%div==0)
        {
            return false;
        }
    }
    return true;
}

let args=minimist(process.argv); 

// task 1 area begins

// let stext = fs.readFileSync(args.source); //reading file
let t1=Date.now();
console.log("Starting task1 at"+t1);
fs.readFile(args.source,function(stext)
{
    
    //date.now()-->total miliseconds from 1 january 1970
    
    let t2=Date.now();
    console.log("Finishing task1 at"+ t2);

    console.log(t2-t1);

})


//task1 area ends

// task 2 area begins

let t3=Date.now();
//date.now()-->total miliseconds from 1 january 1970
console.log("Starting task2 at"+t3);

let data = fs.readFileSync(args.source);
let arr=[];
for( let i=2;i<args.n;i++)
{
    let isPrime=IsPrime(i);
    if(isPrime == true)
    {
       arr.push(i); 
    }
}
let t4=Date.now();
console.log("Finishing task2 at"+ t4);

console.log(t4-t3);  //--> 500 ms

console.log(t4-t1); // total time = 40+2(time required to start task2)+500 =542ms

//task 2 area ends


//output
// Starting task1 at1632769268929
// Starting task2 at1632769268936
// Finishing task2 at1632769269387
// 451
// 458
// Finishing task1 at1632769269390
// 461
