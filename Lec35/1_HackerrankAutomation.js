// node 1_HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let fs = require("fs");
let puppeteer= require("puppeteer");  //Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol

let args= minimist(process.argv);
let configJSON = fs.readFileSync(args.config,"utf-8");
let config = JSON.parse(configJSON);


//method 1

// (async () =>{
//     let browser = await puppeteer.launch({headless:false}); //headfull chahiye, mtlb browser khulta hua dikhega
//     let page= await browser.newPage(); // chrome ka naya page khola
//     await page.goto(args.url); // uspe url daala
//     await page.screenshot({path: "exapmple.png"});  // uska screenshot lia aur example.png m daal dia
//     await browser.close();  // browser ko close kr dia
// })();

// method 2

// async function run(){
//     let browser = await puppeteer.launch({headless:false}); //headfull chahiye, mtlb browser khulta hua dikhega
//     let page= await browser.newPage(); // chrome ka naya page khola
//     await page.goto(args.url); // uspe url daala
//     await page.screenshot({path: "exapmple.png"});  // uska screenshot lia aur example.png m daal dia
//     await browser.close();  // browser ko close kr dia
// }
// run();


//method 3

let browserKaPromise= puppeteer.launch({headless:false});// chrome launch kr ke do puppeteer behen
browserKaPromise.then(function(browser){

    let pageKaPromise= browser.newPage();
    pageKaPromise.then(function(page){
        let urlOpenKapromise = page.goto(args.url);
        urlOpenKapromise.then(function(){
            let screenshotKaPromise=page.screenshot({path:"exmple2.png"});
            screenshotKaPromise.then(function(){
                let browserCloseKaPromise=browser.close();
                browserCloseKaPromise.then(function(){

                })
            })
        })
    })
})

//note--> working of all methods is same





