const {sequelize} = require('../config/config');
const { DataTypes } = require('sequelize');

const Bill = sequelize.define('Bill', {
  bill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
    default: 'Not Paid'
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bill_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'bills',
  timestamps: false,
});
module.exports = Bill;
