// 在ORM框架中建模型其实就是建表的过程，一个模型就是一张表
const sequelize = require("./seq.js");
const { Sequelize,DataTypes  } = require("sequelize"); //所有的数据类型放在dataTypes库中,用于指定字段类型的库

// id，账号，密码，姓名，设置id为主键，ORM框架会自动生成主键，无需定义
// define(表名,{配置字段},{配置})
const resourcesCode = sequelize.define(
  "resources_code",
  {
    // 配置每个字段
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, //主键
      autoIncrement: true, //自增
      comment: "自增id",
    },
    code_title: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    code_content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mark: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tags: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    father_id:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    father_title:{
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, //启用时间戳
    // createdAt : false,
    // updatedAt :false,
    // freezeTableName: true, //强制将模型名和表名一样
    // tableName: "test", //直接指定表名
  }
);
module.exports = { resourcesCode };
