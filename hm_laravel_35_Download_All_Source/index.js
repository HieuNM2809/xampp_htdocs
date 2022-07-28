const fs = require("fs");
const {exec} = require('child_process')
// const websiteUrl = 'https://nodejs.org/';
// const websiteUrl = 'https://stackoverflow.com/';
// const websiteUrl = 'https://hieunm47.github.io/';
// const websiteUrl = 'https://www.huytruong.design/';
const websiteUrl = 'https://tinhte.vn/';
var directoryPath = 'tinhte-'+Date.now();


exec(`node-site-downloader download -s ${websiteUrl} -d ${websiteUrl} -o ${directoryPath} -v --include-images`,(err,stdout,stderr) =>{
  if(err){
    console.log(err)
  }
})

  //node-site-downloader download -s https://google.com -d https://google.com -v --include-images -o websitefiles