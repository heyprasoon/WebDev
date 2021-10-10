// the purpose of this project is to extract information of worldcup 2019 from cricinfo 
// that is in the form of excel and pdf scorecards
// the real purpose is to learn how to extract information and get experience with js
// a very good reason to ever make a project is to have good fun

// npm init 
// npm install minimist
// npm install axios  // module used to download from web
// npm install jsdom  //module to process data from HTML
// npm install excel4node
// npm install pdf-lib

// node 1_CricinfoExtracter.js  --excel=Worldcup.csv --dataFolder=data --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results

//tasks to do
//download using axios
// extract information using jsdom
// manipualate data
// create JSON
// create excelfile
// create folders of each team and then put each opponent in the folder
let minimist=require("minimist");
let axios =require("axios");
let jsdom = require("jsdom");
let excel =require("excel4node");
let pdf=require("pdf-lib");
let fs=require("fs");
let path =require("path");

let args=minimist(process.argv);

let responseKaPromise= axios.get(args.source);
responseKaPromise.then(function(response)
{
    let html=response.data;
    // fs.writeFileSync("download.html",html,"utf-8");

    // now we will process HTML data and extract useful information from that
    let dom = new jsdom.JSDOM(html); 
    let document = dom.window.document;
    let matchScoredivs =document.querySelectorAll("div.match-score-block");
    let matchesarr=[];
    //console.log(matchScoredivs.length);  // --> 48 total blocks
    for(let i=0;i<matchScoredivs.length;i++)
    {
        let match={

        }
        let teams=matchScoredivs[i].querySelectorAll("p.name");
        
        match.t1=teams[0].textContent;
        match.t2=teams[1].textContent; 
        
        let scoresdiv= matchScoredivs[i].querySelectorAll("div.score-detail > span.score ");
        match.t1score="";
        match.t2score="";
        if(scoresdiv.length==2)            //if both team played
        {
            match.t1score=scoresdiv[0].textContent;
            match.t2score=scoresdiv[1].textContent;
        }
        else if(scoresdiv.length==1){                // if only one team played then rain happened
            match.t1score=scoresdiv[0].textContent;
            match.t2score="";
        }
        else
        {                                              // match abonded
            match.t1score="";
            match.t2score="";
        }

        let resultdiv= matchScoredivs[i].querySelector("div.status-text > span")
        match.result=resultdiv.textContent;
        matchesarr.push(match);
    }
    // console.log(matchesarr);
    let json =JSON.stringify(matchesarr);
    fs.writeFileSync("matches.json",json,"utf-8");  // it will save matches.json in which we have details of all 48 matches


    let teamsarrayobj=[];


    for(let i=0;i<matchesarr.length;i++)
    {
        putTeaminTeamArrayIfMissing(teamsarrayobj,matchesarr[i])  // total 10 teams ka array banega
    }
    for(let i=0;i<matchesarr.length;i++)
    {
        putMatchInAppropriateTeam(teamsarrayobj,matchesarr[i]);   // this function will put matches in their appropriate teams

    }
    // console.log(teamsarrayobj);
    let teamjson= JSON.stringify(teamsarrayobj);
    
    
    fs.writeFileSync("teams.json",teamjson,"utf-8"); // it will create teams.json
    createExcelFile(teamsarrayobj);  // it will create WorldCup.csv in current folder
    createFolders(teamsarrayobj);     // it will  create folders team wise and then put their respective opponents in form of pdf
    
    
    function putTeaminTeamArrayIfMissing(teamsarrayobj,match)
    {
        let t1idx=-1;
        for(let j=0;j<teamsarrayobj.length;j++)
        {
            if(teamsarrayobj[j].name==match.t1)
            {
                t1idx=j;
                break;
            }
        }
        if(t1idx==-1)
        {
            teamsarrayobj.push({
                name:match.t1,
                matches: []
            });
        }
     

        let t2idx=-1;
        for(let j=0;j<teamsarrayobj.length;j++)
        {
            if(teamsarrayobj[j].name==match.t2)
            {
                t2idx=j;
                break;
            }
        }
        if(t2idx==-1)
        {
            teamsarrayobj.push({
                name:match.t2,
                matches: []
            });
        }
        
    }
    function putMatchInAppropriateTeam(teamsarrayobj,match)   
    {   
        let t1idx=-1;
        
        for(let j=0;j<teamsarrayobj.length;j++)
        {
           
            if(teamsarrayobj[j].name==match.t1)
            {
                t1idx=j;
                break;
            }
        }
        let team1=teamsarrayobj[t1idx];
        
            team1.matches.push({
                    selfscore: match.t1score,
                    vs:match.t2,
                    opponentscore: match.t2score,
                    result: match.result
            })
        

        let t2idx=-1;
        for(let j=0;j<teamsarrayobj.length;j++)
        {
            if(teamsarrayobj[j].name==match.t2)
            {
                t2idx=j;
                break;
            }
        }
        
            teamsarrayobj[t2idx].matches.push({
                    selfscore: match.t2score,
                    vs:match.t1,
                    opponentscore: match.t1score,
                    result: match.result
            })
        
    }
    function createExcelFile(teamsarrayobj) //jo JSO hoga vohi lenge na, JSON nhi lenge
    {
        let wb = new excel.Workbook();
        // console.log(teamsarrayobj);
        for(let i=0;i<teamsarrayobj.length;i++)
        {
            let sheet = wb.addWorksheet(teamsarrayobj[i].name); // it returns sheet like india, aus..
            sheet.cell(1,1).string("VS");
            sheet.cell(1,2).string("Self Score");
            sheet.cell(1,3).string("Opp Score");
            sheet.cell(1,4).string("Result");
            for(let j=0; j<teamsarrayobj[i].matches.length;j++)
            {
                sheet.cell(2+j,1).string(teamsarrayobj[i].matches[j].vs);
                sheet.cell(2+j,2).string(teamsarrayobj[i].matches[j].selfscore);
                sheet.cell(2+j,3).string(teamsarrayobj[i].matches[j].opponentscore);
                sheet.cell(2+j,4).string(teamsarrayobj[i].matches[j].result);
                
            }

        }
        wb.write("WorldCup.csv");

    }
    function createFolders(teamsarrayobj)
    {
        fs.mkdirSync(args.dataFolder);
        for(let i=0;i<teamsarrayobj.length;i++)
        {
            let folderpath=path.join(args.dataFolder,teamsarrayobj[i].name);
            fs.mkdirSync(folderpath);
            for(let j=0;j<teamsarrayobj[i].matches.length;j++)
            {
                let filename=path.join(folderpath,teamsarrayobj[i].matches[j].vs+".pdf");
                createScoreCard(teamsarrayobj[i].name,teamsarrayobj[i].matches[j],filename);
            }

        }
    }
    function createScoreCard(teamname, match, filename)
    {
    let t1=teamname;
    let t2=match.vs;
    let t1score=match.selfscore;
    let t2score=match.opponentscore;
    let result=t1+" "+match.result;


    let originalbytes=fs.readFileSync("Template.pdf"); //hme ise bytes m hi chahiye tha isilie hmne "utf-8" nhi likha
    let prmtoloadpdf=pdf.PDFDocument.load(originalbytes);  //it returns promise
    prmtoloadpdf.then(function(pdfdoc)
    {
        let page = pdfdoc.getPage(0);

        page.drawText(t1, {
            x: 320,
            y: 729,
            size: 8
        });
        page.drawText(t2, {
            x: 320,
            y: 715,
            size: 8
        });
        page.drawText(t1score, {
            x: 320,
            y: 701,
            size: 8
        });
        page.drawText(t2score, {
            x: 320,
            y: 687,
            size: 8
        });
        page.drawText(result, {
            x: 320,
            y: 673,
            size: 8
        });

        //ye sb RAM pr change hua h, ab hme harddisk m bhi toh change krna hai....

        let changedByteskaPromise=pdfdoc.save();   // pdf m jo changes hue hai uski Changed hui bytes lelo
        
        changedByteskaPromise.then(function(changedBytes)
        {
            fs.writeFileSync(filename,changedBytes);
        })

    })
  



}

    
}).catch(function(err){
    console.log(err);
})


