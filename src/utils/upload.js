const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const UtilType = require("./type");
const UtilDatetime = require("./datetime");

function mkdirsSync(dirname) {
  // console.log(dirname)
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function getSuffixName(fileName) {
  let nameList = fileName.split(".");
  return nameList[nameList.length - 1];
}

function uploadPicture(ctx, options) {
  let req = ctx.req;
  let res = ctx.res;
  let busboy = Busboy({ headers: req.headers });

  let pictureType = "common";
  if (UtilType.isJSON(options) && UtilType.isString(options.pictureType)) {
    pictureType = options.pictureType;
  }

  let picturePath = path.join(
    __dirname,
    "/../../static/",
    pictureType,
    UtilDatetime.parseStampToFormat(null, "YYYYMM/DD")
  );

  let mkdirResult = mkdirsSync(picturePath);

  return new Promise((resolve, reject) => {
    let result = {
      success: false,
      code: "",
      message: "",
      data: null,
      filename: "",
      uploadFilePath: "",
    };

    busboy.on("file", function (fieldname, file, fileData) {
      let { filename, encoding, mimetype } = fileData;
      let pictureName =
        Math.random().toString(16).substring(2) + "." + getSuffixName(filename);
      let _uploadFilePath = path.join(picturePath, pictureName);

      let saveTo = path.join(_uploadFilePath);
      file.pipe(fs.createWriteStream(saveTo));

      // file.on('data', function(data) {
      //   console.log('File-data [' + fieldname + '] got ' + data.length + ' bytes')
      // })

      file.on("end", function () {
        let url = picturePath.split("static")[1].replace(/\\/g,'/');
        result.success = true;
        result.filename = filename;
        result.uploadFilePath = pictureName;
        result.picturePath = url;
        resolve(result);
      });
    });

    // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    //   console.log('Field-field [' + fieldname + ']: value: ' + inspect(val))
    // })
    // busboy.on('finish', function() {
    //   console.log('Done parsing form!')
    // })

    busboy.on("error", function (err) {
      console.log("File-error");
      reject(result);
    });

    req.pipe(busboy);
  });
}

module.exports = {
  uploadPicture,
};
