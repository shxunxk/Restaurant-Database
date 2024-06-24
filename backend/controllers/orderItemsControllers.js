const Order_Items = require('../models/order_items');

const getOrderforOrderID = async (req, res) => {
  const { order_id } = req.query;  // Use req.query to get query parameters
  try {
    if (!order_id) {
      return res.status(400).json({ error: 'order_id is required' });
    }
    const orderItems = await Order_Items.findAll({
      where: { order_id: order_id }
    });
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrderforOrderID,
};
