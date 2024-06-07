const { config } = require("dotenv");
const { Sequelize } = require("sequelize");

config();

const database = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

database.sync().then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log("Error: " + err);
});

module.exports = database;
