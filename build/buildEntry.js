const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
let viewsPath = "./src/singleViews/";
let entryName = "main.js";
let filesObj = {};
if(process.env.NODE_ENV === 'production'){
  filesObj = {
    app: './src/main.js',
  };
}else{
  filesObj = {
    app: './src/main.js',
    example:'./src/example/main.js'
  };
}


exports.build = function (context) {
  let _filesObj = Object.assign({},filesObj);
  let files = fs.readdirSync(path.resolve(context, viewsPath));
  if (files.length == 0) {
    console.log(path.resolve(context, viewsPath) + "文件夹下没有文件");
    return _filesObj;
  }
  files.forEach(function (fileName) {
    let name = path.resolve(context, viewsPath + fileName + "/" + entryName);
    try {
      fs.accessSync(name);
      _filesObj[fileName] = viewsPath + fileName + "/" + entryName;
    } catch (err) {
      console.log(chalk.bgRedBright.bold(name + " 不存在")); //不存在，则抛错
    }
  });
  return _filesObj;
}

