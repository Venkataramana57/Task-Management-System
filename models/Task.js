const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM,
    values: ['Low', 'Medium', 'High']
  },
  dueDate: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.ENUM,
    values: ['To Do', 'In Progress', 'Done']
  }
});
User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;