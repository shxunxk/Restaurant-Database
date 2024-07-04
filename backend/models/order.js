const {sequelize} = require('../config/config');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('Bill', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING,
  },
  bill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_time: {
    type: DataTypes.TIME,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;
