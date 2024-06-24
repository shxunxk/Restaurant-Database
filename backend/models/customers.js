const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.NUMBER,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'customers',
  timestamps: false
});

module.exports = Customer;