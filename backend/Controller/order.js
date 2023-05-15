// Controllers/orderController.js

const Order = require('../Models/order');
const Product = require('../Models/product');
const Brand = require('../Models/brand');




const orderController = {

    async create(req, res) {
        try {
          const order = new Order({
            ...req.body,
            customer: req.user._id,
          });
      
          await order.save();
          res.status(201).send(order);
        } catch (error) {
          res.status(500).send({ error: 'Error creating order.' });
        }
      },
  async getAll(req, res) {
    try {
      const orders = await Order.find({});
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send({ error: 'Error getting orders.' });
    }
  },

  async update(req, res) {
    try {
      const orderId = req.params.orderId;
      const updates = req.body;
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).send({ error: 'Order not found.' });
      }
  
      const product = await Product.findById(order.product);
      
      if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
      }
  
      const brand = await Brand.findById(product.brand);
  
      if (!brand) {
        return res.status(404).send({ error: 'Brand not found.' });
      }
  
      // Check if the seller of the brand is the same as the currently logged in user
      if (brand.seller.toString() !== req.user._id.toString()) {
        return res.status(403).send({ error: 'Not authorized to update this order.' });
      }
  
      Object.keys(updates).forEach((update) => order[update] = updates[update]);
  
      await order.save();
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send({ error: 'Error updating order.' });
    }
  },

  async delete(req, res) {
    try {
      const orderId = req.params.orderId;

      const order = await Order.findByIdAndDelete(orderId);

      if (!order) {
        return res.status(404).send({ error: 'Order not found.' });
      }

      res.status(200).send({ message: 'Order deleted successfully.' });
    } catch (error) {
      res.status(500).send({ error: 'Error deleting order.' });
    }
  },
};

module.exports = orderController;
