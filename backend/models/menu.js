const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Menu = sequelize.define('Menu', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  item_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'items',
  timestamps: false
});

module.exports = Menu;