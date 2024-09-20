const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_management', 'username', 'Password@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;