// node 1_HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let fs = require("fs");
let puppeteer= require("puppeteer");  //Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol
const { start } = require("repl");


let args= minimist(process.argv);
let configJSON = fs.readFileSync(args.config,"utf-8");
let config = JSON.parse(configJSON);

(async () =>{
    let browser = await puppeteer.launch(
        {headless:false,
        args:[
            '--start-maximized'],
        defaultViewport:null
        }); //headfull chahiye, mtlb browser khulta hua dikhega
    let page= await browser.newPage(); // chrome ka naya page khola
    await page.goto(args.url); // uspe url daala
    await page.screenshot({path: "exapmple.png"});  // uska screenshot lia aur example.png m daal dia

    // IKHATTHA TOH PAGE LOAD HOTA NHI H, JB B=VOH ATTRIBUTE LOAD HO JAE JB TAK WAIT KRO
    // wait and then click on login on page 1
    await page.waitForSelector("li#menu-item-2887");  //jb tk select nhi ho jaata tb tk wait kro
    await page.click("li#menu-item-2887");
   
    // wait and then click on login in page 2
    await page.waitForSelector("a[href='https://www.hackerrank.com/login'");
    await page.click("a[href='https://www.hackerrank.com/login'");

    //type userid
    await page.waitForSelector("input#input-1");
    await page.type("input#input-1",config.userid,{delay:30});

    //type password
    await page.waitForSelector("input#input-2");
    await page.type("input#input-2",config.password,{delay:30});

    //wait and then click on login on page3
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    //click on compete
    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click("a[data-analytics='NavBarContests']");

    //click on mamnage contests
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");

    await page.waitFor(3000);

    //click on moderators tab

    await page.waitForSelector("li[data-tab='moderators']");
    await page.click("li[data-tab='moderators']");

    //type in moderator
    await page.waitForSelector("input#moderator");
    await page.type("input#moderator",config.moderator,{delay:50});

    await page.keyboard.press("Enter");


    


    

 //   await browser.close();  // browser ko close kr dia
})();






