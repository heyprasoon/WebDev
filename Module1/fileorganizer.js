let fs = require("fs");

let srcFilePath = "D:\\PP_DEV\\Module_1\\f1.txt";
let destDir="D:\\PP_DEV\\f11.txt";

fs.copyFileSync(srcFilePath,destDir);
