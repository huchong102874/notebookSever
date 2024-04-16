var fs = require('fs');
var request = require("request");
var { pLimit } = require("p-limit");
const limit = pLimit(35);


const download = (url, imgName) => {
  return new Promise((resolve, reject) => {
    let fileName = url.split("/").pop();//044.jpg
    const process = fs.createWriteStream(imgName + fileName);
    let option = {
      url,
      timeout: 20000
    }
    request(option, (error, response, body) => {
      if (error) {
        console.log(`error:${imgName + fileName}`);
        resolve()
      }
    }).pipe(process);

    process.on("finish", () => {
      process.close()
      resolve()
    });
    process.on("error", err => {
      process.close()
      resolve()
    });
  })
}


const startDown = (imglist, imgNamePath) => {
  //let baseDir = __dirname + 
  return new Promise(async (resolve, reject) => {
    let downloadList = imglist.map((item, index) => limit(() => download(item, imgNamePath + `/`)))
    const result = await Promise.allSettled(downloadList)
    resolve(result)
  })
}

// 将得到的数组全部转化为详细的图片地址
function getPathList(_pd, foldername) {
  var fileurl = 'https://i.tuiimg.net/' + _pd[0];
  let arr = []
  for (var i = _pd[1]; i <= _pd[2]; i++) {
    arr.push(fileurl + i + '.jpg')
  }
  let imgname = _pd[0].replace(/\//g, '')
  return { arr, imgname }
}

module.exports = {
  startDown,
  getPathList
}