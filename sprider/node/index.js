const axios = require("axios");
const cheerio = require("cheerio");
const { writeFile, readFile, appendFileSync } = require("../src/fshandler");
const { pLimit } = require("../../src/utils/p-limit");
const videoListAll = require("../nodemenu");
const limit = pLimit(2);
// 获取目录生成js
const getData = async (url, num) => {
  let res = await axios.get(url);
  var str = res.data;
  const $ = cheerio.load(str);
  let list = [];
  $("#archive a").each((index, item) => {
    let o = {};
    o.url = $(item).attr("href");
    o.title = $(item).find("h2[itemprop='headline']").text();
    let x = $(item).find("h2[itemprop='headline']");
    list.push(o);
  });
  appendFileSync(__dirname + "menu.js", `page${num}:${JSON.stringify(list)}`);
};
// 获取视频url,生成js
const getDataVideoUrl = async (data) => {
  let { url, title } = data;
  let res = await axios.get(url);
  const $ = cheerio.load(res.data);
  // appendFileSync(__dirname + "menu233.html", res.data);
  let data2 = $(".dplayer");
  $(".dplayer").each((index, item) => {
    let o = $(item).attr("data-config");
    let data = JSON.parse(o);
    let url = data?.video?.url;
    let str = Math.random().toString().substring(3, 7);
    appendFileSync(
      __dirname + "menu2.js",
      `${JSON.stringify({ url, title })},`
    );
  });
};

const submitData = async (pageIndex) => {
  let index = 'page'+pageIndex
  let videoList = videoListAll[index]
  let len = videoList.length;
  let getCount = 0;
  let timer = setInterval(() => {
    if (getCount < len) {
      let data = videoList[getCount];
      let reslut = getDataVideoUrl(data);
      getCount++;
    } else {
      console.log("结束");
      clearInterval(timer);
      if(pageIndex<1){
        pageIndex++
        submitData(pageIndex)
      }else{
        console.log("全部结束了");
      }
    }
  }, 6000);
};

const startUrl = function () {
  let getCount = 0;
  let timer = setInterval(() => {
    if (getCount < len) {
      let data = url + (getCount + 1);
      getData(data, getCount);
      getCount++;
    } else {
      console.log("结束");
      clearInterval(timer);
    }
  }, 4000);
};
