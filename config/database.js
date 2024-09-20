const { Sequelize } = require('sequelize');

require('dotenv').config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;