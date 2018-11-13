var fs = require('fs');
var path = require('path');
var marked = require('marked');
// 同步使用 highlight.js 转换代码
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

var root = path.join(__dirname + '\\mooc');
var moocList = [];
var dirCount = 0;
var fileCount = 0;

readDirSync(root, moocList);
fs.writeFileSync('mooc.json', JSON.stringify(moocList));


function readDirSync(path, f){
  var pa = fs.readdirSync(path);
  pa.forEach(function(ele,index){
    var info = fs.statSync(path+"/"+ele)  
    if(info.isDirectory()){
      dirCount ++;
      let item = { id: dirCount, name: ele, list: [] };
      f.push(item);
      fileCount = 0;
      readDirSync(path+"/"+ele, item.list);
    }else{
      fileCount ++;
      let item = { id:`${dirCount}-${fileCount}`, name: ele.split('-')[2].split('.')[0], file: ele };
      f.push(item);
    } 
  })
}





// var id = '5-1';

// var file = getFileName(id)

// function getFileName( id ) {
//   var arr = id.split('-');
//   var idp = parseInt(arr[0]-1);
//   var idc = parseInt(arr[1]-1);
//   var path = root + '\\' +  moocList[idp].name + '\\' +moocList[idp].list[idc].name
//   return path;
// }

// var markData = fs.readFileSync(file,'utf-8');
// var htmlData = marked(markData);

// var $htmlTmpl = `<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link href="markdown.css" rel="stylesheet"><link rel="stylesheet" href="github.css"></head><body><div class="markdown-body">${htmlData}</div></body></html>`
// fs.writeFileSync('a.html', $htmlTmpl);
