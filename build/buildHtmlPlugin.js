const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../src/config/htmlConfig')
const fs = require('fs');

module.exports = function (files) {
  let htmlArrays = [];
  let defaultConfig = config["defaultConfig"] || {};
  for( let index in files){
    let htmlConfig = config[index] || defaultConfig;
    let template = "index.html";
    if(index != "app"){
      try {
        fs.accessSync(files[index].replace("main.js","index.html"));
        template = files[index].replace("main.js","index.html");
      } catch (err) {
      }
    }
    console.log("生成 "+index +".html"+"   title: "+htmlConfig["title"]);
    htmlArrays.push(
      new HtmlWebpackPlugin({
        filename: "html/"+index+".html",
        template: template,
        inject: true,
        chunks:[index],
        title:htmlConfig["title"],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        //necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      })

    )
  }
  return htmlArrays;
}
