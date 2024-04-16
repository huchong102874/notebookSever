const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs')
return
// const baseurl = 'https://www.tuiimg.com/meinv/list_5.html';
const baseurl = 'https://www.tuiimg.com/meinv/list_';
let reg2 = /\[(.+?)\]/gi; // 匹配中括号正则

let pagecurrent = 1;//页码数
let page = 1;//总页码数
let pageList = [];//page生成的menulist文件

let jsCurrent = 0;

// 读取page的主目录
function quest(url) {
  let questCallback = function () {
    if (page > pagecurrent) {
      pagecurrent++;
      quest(baseurl + pagecurrent + '.html')
    } else {
      // 页面路径获取完后开始解读路径
      fs.readdir(__dirname + '/menu/', (err, files) => {
        if (err) {
          console.log(err);
        } else {
          // files.length = 2;
          pageList = files;
          jsCurrent++;
          beginDown(0)
        }
      })

    }
  }
  request.get({
    url: url,
    strictSSL: false, // allow us to use our self-signed cert for testing
    rejectUnauthorized: false
  }, function (error, response, body) {
    // 如果请求成功且状态码为 200
    let imgUrl = []
    if (!error && response.statusCode == 200) {
      // 使用 cheerio 加载 HTML 文档
      const $ = cheerio.load(body);
      $('.beauty ul a.title').each(function (index, item) {
        let { children, attribs } = item;
        imgUrl.push({
          title: children[0].data,
          url: attribs.href,
        })
      })
      let stream = `module.exports = { img : ${JSON.stringify(imgUrl)},pageNum:${pagecurrent}}`;
      createfolder(`/submenu/page${pagecurrent}/`)
      writeFs('/menu/page' + pagecurrent + '.js', stream, questCallback)
    } else {
      console.log(error, 'error')
    }
  });
}
quest(baseurl + pagecurrent + '.html')

// 读取的子目录
function subquest(urlList, pagecurrent) {
  let count = 0;
  let len = urlList.length - 1;
  function countquest() {
    if (len >= count) {
      count++;
      subquestURL(urlList[count - 1])
    } else {
      if (jsCurrent <= pageList.length - 1) {
        jsCurrent++;
        beginDown(jsCurrent - 1)
      }
      console.log('结束了')
    }
  }
  function subquestURL({ url, title }) {
    request.get({
      url: url,
      strictSSL: false, // allow us to use our self-signed cert for testing
      rejectUnauthorized: false
    }, function (error, response, body) {
      // 如果请求成功且状态码为 200
      if (!error && response.statusCode == 200) {
        // 使用 cheerio 加载 HTML 文档
        const $ = cheerio.load(body);
        // 存储获取到的数据
        let totalData = []
        $('script').each(function (index, value) {
          // 向数组中存放数据
          if (value.children && value.children.length > 0) {
            let str = value.children[0].data;
            // 

            let template = str.match(reg2);
            if (template && template.length > 0) {
              let arr = template[0].split(',')
              totalData = [arr[1], arr[2], arr[3]];
            }

          }
        })
        let stream = `module.exports = {  _pd : [${totalData.toString()}],title:"${title}"}`;
        let nameFile = totalData[0].replace(/\"/g, '').replace(/\//g, '')//0062968

        writeFs(`/submenu/page${pagecurrent}/` + nameFile + '.js', stream, countquest)

        // 打印结果
      } else {
        console.log(error, 'error')
      }
    });
  }
  countquest()
}
function writeFs(name, stream, callback) {
  fs.writeFile(__dirname + `${name}`, stream, function (err, data) {
    if (err) {
      throw err
    }
    console.log('数据保存成功');
    if (callback) {
      callback()
    }
  })

}
function beginDown(num) {
  let requestPath = __dirname + '/menu/' + pageList[num];
  let { img, pageNum: pagecurrent } = require(requestPath);
  subquest(img, pagecurrent)
}
function createfolder(foldername) {
  try {
    //同步操作创建css文件夹
    fs.mkdirSync(__dirname + foldername);
  } catch (error) {
    // 处理所有异常的代码
    // console.log(error)
  }
}