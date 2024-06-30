const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const billRoutes = require('./routes/bill');
const orderRoutes = require('./routes/order');
const {sequelize} = require('./config/config');
const orderItemsRoutes = require('./routes/order_items');
const customerRoutes = require('./routes/customers');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/menu', menuRoutes);
app.use('/bill', billRoutes);
app.use('/order', orderRoutes);
app.use('/orderitems', orderItemsRoutes);
app.use('/customers', customerRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });