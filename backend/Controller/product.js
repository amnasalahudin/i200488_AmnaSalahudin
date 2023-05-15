const Product = require('../Models/product');
const Brand = require('../Models/brand');

const productController = {

    //create a product for a brand
    //first check if the brand exists and belongs to the seller
    async create(req, res) {
      try {
        const brandId = req.params.brandId;
        const sellerId = req.user._id;
  
        // check if the brand exists and belongs to the seller
        const brand = await Brand.findOne({ _id: brandId, seller: sellerId });
  
        if (!brand) {
          return res.status(404).send({ error: 'Brand not found or you do not have permission.' });
        }
  
        // create the product
        const product = new Product({
          ...req.body,
          brand: brandId,
        });
  
        await product.save();
        res.status(201).send(product);
  
      } catch (error) {
        res.status(400).send({ error: 'Error creating product.' });
      }
    },

    //view all products
    async getAll(req, res) {
        try {
          const products = await Product.find({});
    
          res.status(200).send(products);
        } catch (error) {
          res.status(500).send({ error: 'Error fetching products.' });
        }
      },

      //view all products of a brand
      async getAllByBrand(req, res) {
        try {
          const brandId = req.params.brandId;
          const products = await Product.find({ brand: brandId });
    
          if (!products) {
            return res.status(404).send({ error: 'No products found for this brand.' });
          }
    
          res.status(200).send(products);
        } catch (error) {
          res.status(500).send({ error: 'Error fetching products.' });
        }
      },

      //updates the product, fetches the brand id from the db
      // and checks if the brand belongs to the seller who is
      //currently logged in

      async update(req, res) {
        try {
          const productId = req.params.productId;
          const sellerId = req.user._id;
    
          // fetch the product
          const product = await Product.findById(productId);
    
          if (!product) {
            return res.status(404).send({ error: 'Product not found.' });
          }
    
          // fetch the brand
          const brand = await Brand.findOne({ _id: product.brand, seller: sellerId });
    
          if (!brand) {
            return res.status(404).send({ error: 'Brand not found or you do not have permission.' });
          }
    
          // update the product
          const updates = Object.keys(req.body);
          updates.forEach((update) => product[update] = req.body[update]);
          await product.save();
    
          res.status(200).send(product);
    
        } catch (error) {
          res.status(400).send({ error: 'Error updating product.' });
        }
      },

     // Controllers/productController.js

async delete(req, res) {
    try {
      const productId = req.params.productId;
      const sellerId = req.user._id;
  
      // fetch the product
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
      }
  
      // fetch the brand
      const brand = await Brand.findOne({ _id: product.brand, seller: sellerId });
  
      if (!brand) {
        return res.status(404).send({ error: 'Brand not found or you do not have permission.' });
      }
  
      // delete the product
      await Product.findOneAndDelete({ _id: productId });
      res.status(200).send({ message: 'Product deleted successfully.' });
  
    } catch (error) {
      res.status(500).send({ error: 'Error deleting product.' });
    }
  },
  
  };
  
  module.exports = productController;
