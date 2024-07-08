const Order = require('../models/order');
const Bill = require('../models/bill');
const {Customer} = require('../models/customers');
const generateIntId = require('../generateId');

const getOrder = async (req, res) => {
  try {
    const billItems = await Order.findAll();
    res.status(200).json(billItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  const { bill_id, customer_id } = req.body;
  try {
    const cust = await Customer.findByPk(customer_id);
    if (cust) {
      let order = null;
      if (bill_id) {
        const bill = await Bill.findByPk(bill_id);
        console.log('Bill found:', bill);
        if (bill) {
          const intId = generateIntId(5);
          order = await Order.create({ order_id: intId, bill_id: bill_id });
        } else {
          console.log('Bill not found');
          return res.status(404).json({ error: 'Bill not found' });
        }
      } else {
        const newBill = await Bill.create({ customer_id: customer_id });
        console.log('New bill created:', newBill);
        order = await Order.create({ bill_id: newBill.bill_id });
      }
      console.log('Order created:', order);
      res.status(200).json(order);
    } else {
      console.log('Customer not found');
      return res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};


const updateStatus = async (req, res) => {
  const { order_id, status } = req.body;

  if (!order_id || !status) {
    return res.status(400).json({ error: 'order_id and status are required' });
  }

  try {
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.order_status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({ error: 'order_id and status are required' });
  }

  try {
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!order) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await order.destroy();

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrder,
  createOrder,
  updateStatus,
  deleteOrder
};
