const { writeFile, readFile, readdir, mkdirSync } = require("./src/fshandler");
const { startDown, getPathList } = require("./src/utils");

const handlgetPathList = (pathFile, pathPage) => {
  return new Promise(async (resolve, reject) => {
    let { _pd, title } = require(pathFile)
    let { arr, imgname } = getPathList(_pd)
    let newPath = pathFile.split(".js")[0].replace("submenu", 'dist');
    mkdirSync(newPath)
    let result = await startDown(arr, newPath);
    resolve(1)
  })
}
const readPageList = (pathPage) => {

  return new Promise(async (resolve, reject) => {
    let basePath = __dirname + "/submenu/" + pathPage
    let imgPathList = readdir(basePath); //['0062979.js','0062980.js'....]
    for (const item of imgPathList) {
      let result = await handlgetPathList(basePath + '/' + item, pathPage)
    }
    resolve(1)
  })

};
const entry = async () => {
  let dirList = readdir(__dirname + "/submenu/"); //['page1','page2'....]
  for (const item of dirList) {
    let result = await readPageList(item)
    console.log(item + '结束啦');

  }
  console.log('全部结束啦');
};
entry();
