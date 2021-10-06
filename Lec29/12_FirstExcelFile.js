// npm init
// npm minimist
// npm install excel4node
// node 12_FirstExcelFile.js --source=teams.json --dest=teams.csv

let minimist=require("minimist");
let fs=require("fs");

// require library
let excel=require("excel4node");


let args= minimist(process.argv);

let json=fs.readFileSync(args.source,"utf-8");
let teams = JSON.parse(json);

// Create a new instance of a Workbook class
let wb = new excel.Workbook();


// Add Worksheets to the workbook
// for(let i=0;i<teams.length;i++)
// {
//     wb.addWorksheet(teams[i].name);      // make 3 sheets in teams.csv
// }
// wb.write(args.dest);

//Add Worksheets to the workbook and make columns according to seb's copy

let hdstyle=({
    font: {
        color:"red"
    }
});
for(let i=0;i<teams.length;i++)
{
    let sheet = wb.addWorksheet(teams[i].name); // it returns sheet like india, aus..
    // Set value of cell A1 to 'string' 
    sheet.cell(1, 1).string("Rank").style(hdstyle);
    sheet.cell(1,2).number(teams[i].rank);
    sheet.cell(2,1).string("Opponent").style(hdstyle);
    sheet.cell(2,2).string("Result").style(hdstyle);
    for(let j=0;j<teams[i].matches.length;j++)
    {
        sheet.cell(3+j,1).string(teams[i].matches[j].opponent);
        sheet.cell(3+j,2).string(teams[i].matches[j].result);
    }
}
wb.write(args.dest);

