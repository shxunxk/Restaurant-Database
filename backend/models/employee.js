const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Employee = sequelize.define('Employee', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.NUMBER,
  },
  email: {
    type: DataTypes.STRING,
  },
  employee_position: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'employees',
  timestamps: false
});

module.exports = {Employee};