// npm install jsdom
// node 9_FirstProcessingHTML.js --source=download.html 
let minimist=require("minimist");
let fs=require("fs");
let jsdom=require("jsdom");
// will load html and prepare the dom for programmer just like a browser would have been
 let args = minimist(process.argv);

//for practice with sample.html

//  fs.readFile(args.source,"utf-8",function(err,html){
//     let dom =new jsdom.JSDOM(html);
//     let document =dom.window.document;
//     let elements=document.querySelectorAll(".b")
//     console.log(document.title) ; // if --source=sample.html then the output will be title of sample.html i.e. "My Sample Page"
   
//  })

fs.readFile(args.source,"utf-8" ,function(err,html){
    let dom = new jsdom.JSDOM(html);
    let document=dom.window.document;
    
    // let descs=document.querySelectorAll("div.description");
    // for(let i=0 ; i<descs.length;i++)
    // {
    //     console.log(descs[i].textContent);
    // }
    /*3rd match, Cardiff, Jun 1 2019, ICC Cricket World Cup
Check Pakistan vs West Indies, ICC Cricket World Cup 2019, 2nd match Match Timings, scoreboard, ball by ball commentary, updates only on ESPNcricinfo.com. Check Pakistan vs West Indies 2nd match Videos, Reports Articles Online.
2nd match, Nottingham, May 31 2019, ICC Cricket World Cup
Check England vs South Africa, ICC Cricket World Cup 2019, 1st match Match Timings, scoreboard, ball by ball commentary, updates only on ESPNcricinfo.com. Check England vs South Africa 1st match Videos, Reports Articles Online.
1st match, The Oval, May 30 2019, ICC Cricket World Cup*/

// output is like this ,,, we have to select only 1st match waali chhecz like

    let descs=document.querySelectorAll("div.match-info  >  div.description");  // div.match-info k under div.description
    
    
    for(let i=0 ; i<descs.length;i++)
    {
        console.log(descs[i].textContent);
    }

// 4th match (D/N), Bristol, Jun 1 2019, ICC Cricket World Cup
// 3rd match, Cardiff, Jun 1 2019, ICC Cricket World Cup
// 2nd match, Nottingham, May 31 2019, ICC Cricket World Cup
// 1st match, The Oval, May 30 2019, ICC Cricket World Cup



})