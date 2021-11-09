// node 1_HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let fs = require("fs");
let puppeteer= require("puppeteer");  //Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol
const { PageSizes } = require("pdf-lib");

let args= minimist(process.argv);
let configJSON = fs.readFileSync(args.config,"utf-8");
let config = JSON.parse(configJSON);

(async () =>{
    let browser = await puppeteer.launch({
        headless:false,
        args: ['--start-maximized'],
        defaultViewport:null
    }); //headfull chahiye, mtlb browser khulta hua dikhega
    let page= await browser.newPage(); // chrome ka naya page khola
    await page.goto(args.url); // uspe url daala
    await page.screenshot({path: "exapmple.png"});  // uska screenshot lia aur example.png m daal dia

    await page.click("li#menu-item-2887");
    await page.waitForNavigation();  //wait uptil next page loaded fully

    await page.click("a.f1-button[href='https://www.hackerrank.com/login'");
    await page.waitForNavigation();


    await browser.close();  // browser ko close kr dia
})();






