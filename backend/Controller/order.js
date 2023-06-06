// Controllers/orderController.js

const Order = require('../Models/order');
const Product = require('../Models/product');
const Brand = require('../Models/brand');


const orderController = {

  //create an order for a product
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

  //view all orders
  async getAll(req, res) {
    try {
      const orders = await Order.find({});
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send({ error: 'Error getting orders.' });
    }
  },

  // get all orders for a specific seller
async getBySeller(req, res) {
  try {
    const sellerId = req.user._id;
    const brands = await Brand.find({ seller: sellerId });

    if (!brands || brands.length === 0) {
      return res.status(404).send({ error: 'No brands found for this seller.' });
    }

    const brandIds = brands.map((brand) => brand._id);

    const products = await Product.find({
      brand: { $in: brandIds },
    });

    if (!products || products.length === 0) {
      return res.status(404).send({ error: 'No products found for this seller.' });
    }

    const productIds = products.map((product) => product._id);

    const orders = await Order.find({
      product: { $in: productIds },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).send({ error: 'No orders found for this seller.' });
    }

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: 'Error getting orders.' });
  }
},


  //update an order
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

  //delete an order
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
