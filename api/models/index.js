const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    dialectModule: require("pg"),
    logging: false,
  },
);

const User = require("./User")(sequelize, Model, DataTypes);
const Movement = require("./Movement")(sequelize, Model, DataTypes);

module.exports = {
  sequelize,
  User,
  Movement,
};
