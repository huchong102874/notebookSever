// 数据库连接
const { Sequelize } = require("sequelize");
const config = require("../../sqlConfig");
let { host, port, database, username, password } = config;
const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  pool: {
    //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000,
  },
  define: {
    underscored: false,
    freezeTableName: true,
    // createdAt : false,
    // updatedAt :false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
});
module.exports = sequelize;
