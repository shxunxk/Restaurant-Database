const Order = require('../models/order');
const Bill = require('../models/bill');

const getOrder = async (req, res) => {
  try {
    const billItems = await Order.findAll();
    res.status(200).json(billItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  const { bill_id } = req.body;
  try {
    const bill = await Bill.findByPk(bill_id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    const order = await Order.create({
      bill_id: bill_id,
    });

    res.status(200).json(order);
  } catch (error) {
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

module.exports = {
  getOrder,
  createOrder,
  updateStatus
};
