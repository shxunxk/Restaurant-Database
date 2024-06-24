const {sequelize} = require('../config/config')
const { DataTypes } = require('sequelize');

const Order_Items = sequelize.define('Order_Items', {
  order_id: {
    type: DataTypes.INTEGER,
  },
  order_items_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'order_items',
  timestamps: false,
});

module.exports = Order_Items;
