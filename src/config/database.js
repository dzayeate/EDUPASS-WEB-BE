const { config } = require("dotenv");
const { Sequelize } = require("sequelize");

config();

const database = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database.sync().then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.error("Error connecting to the database: ", err);
});

module.exports = database;
