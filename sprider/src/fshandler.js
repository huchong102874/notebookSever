const fs = require("fs");

//写文件
const writeFile = (filiName, data) => {
  let date = fs.writeFileSync(filiName, data);
};
//读文件的内容
const readFile = (filiName) => {
  let data = fs.readFileSync(filiName, "utf-8");
  return data;
};
//读文件夹里面所有文件
const readdir = (folderName) => {
  let files = fs.readdirSync(folderName);
  return files;
};
//创建文件夹
const mkdirSync = (folderName) => {
  fs.mkdirSync(folderName, { recursive: true });
};


module.exports = {
  writeFile,
  readFile,
  readdir,
  mkdirSync,
};
