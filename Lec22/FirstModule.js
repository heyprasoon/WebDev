// npm install minimist
let minimist = require('minimist');
let args = minimist(process.argv);

if(args.age > 30){
    console.log("Hello " + args.name + ". You must go home.");
} else {
    console.log("Heya " + args.name + ". Where is the party tonight?");
}

// node FirstModule.js --name="Sumeet Malik" --age=34