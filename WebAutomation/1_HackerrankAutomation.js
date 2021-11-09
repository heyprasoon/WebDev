// node 1_HackerrankAutomation.js --url=https://www.hackerrank.com --config=config.json

// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let fs = require("fs");
let puppeteer= require("puppeteer");  //Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol



let args= minimist(process.argv);
// read config.JSON
let configJSON = fs.readFileSync(args.config,"utf-8");
let config = JSON.parse(configJSON);

(async () =>{
    // start the browser
    let browser = await puppeteer.launch(
        {headless:false,
        args:[
            '--start-maximized'],
        defaultViewport:null       // isse full view aayega, nhi toh voh mobile jese open krega
        }); //headfull chahiye, mtlb browser khulta hua dikhega
    let pages= await browser.pages(); // chrome ka naya page khola
    let page=pages[0];
    await page.goto(args.url); // uspe url daala
  //  await page.screenshot({path: "exapmple.png"});  // uska screenshot lia aur example.png m daal dia

    // IKHATTHA TOH PAGE LOAD HOTA NHI H, JB tk VOH ATTRIBUTE LOAD HO JAE JB TAK WAIT KRO
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

    //click on manage contests
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");

    //select all the contests URL Link and put it into urls array
    await page.waitForSelector("a.backbone.block-center");
    //curls==> contest URL's
    let curls =await page.$$eval("a.backbone.block-center", function(atags){   // just like a query selecter all 
        let urls=[];
        for(let i=0;i<atags.length;i++)
        {
            let url=atags[i].getAttribute("href");
            urls.push(url);
        }
        return urls;
    })

    console.log(curls);
    for(let i=0;i<curls.length;i++)
    {
        let ctab= await browser.newPage();
        let taburl=args.url+curls[i];
        await ctab.bringToFront(); //activates the tab
        await ctab.goto(taburl);
        await ctab.waitFor(2000);


        // //click on moderators tab

        await ctab.waitForSelector("li[data-tab='moderators']");
        await ctab.click("li[data-tab='moderators']");

    // //type in moderator
        await ctab.waitForSelector("input#moderator");
        await ctab.type("input#moderator",config.moderator,{delay:50});

        await ctab.keyboard.press("Enter");
        await ctab.waitFor(2000);

        await ctab.close();
        await page.waitFor(2000);
    }
    await page.close();
  


    // await page.waitForSelector("a[href='/administration/contests/edit/154556']");
    // await page.click("a[href='/administration/contests/edit/154556']");

    // await page.waitFor(3000);
    // //click on moderators tab

    // await page.waitForSelector("li[data-tab='moderators']");
    // await page.click("li[data-tab='moderators']");

    // //type in moderator
    // await page.waitForSelector("input#moderator");
    // await page.type("input#moderator",config.moderator,{delay:50});

    // await page.keyboard.press("Enter");


    


    

 //   await browser.close();  // browser ko close kr dia
})();






