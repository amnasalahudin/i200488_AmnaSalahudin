// Controllers/brandController.js

const Brand = require('../Models/brand');


const brandController = {

    //create a brand for a seller
  async create(req, res) {
    try {
      const { name, logo, description, contact } = req.body;
      const seller = req.user._id;

      const brand = new Brand({
        name,
        logo,
        description,
        contact,
        seller,
      });

      await brand.save();
      res.status(201).send(brand);
    } catch (error) {
      res.status(400).send({ error: 'Error creating brand.' });
    }
  },

  //edit a brand
  async update(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'logo', 'description', 'contact'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {

      // getting the seller id from the token
      // getting the brand id from the params
      
      const brandId = req.params.id;
      const sellerId = req.user._id;
      const brand = await Brand.findOne({ _id: brandId, seller: sellerId });

      if (!brand) {
        return res.status(404).send({ error: 'Brand not found.' });
      }

      updates.forEach((update) => (brand[update] = req.body[update]));
      await brand.save();

      res.status(200).send(brand);
    } catch (error) {
      res.status(400).send({ error: 'Error updating brand.' });
    }
  },

  //view all brands of a seller
  async getAllBySeller(req, res) {
    try {

      // getting the seller id from the token
      const sellerId = req.user._id;
      const brands = await Brand.find({ seller: sellerId });

      if (!brands) {
        return res.status(404).send({ error: 'No brands found for this seller.' });
      }

      res.status(200).send(brands);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching brands.' });
    }
  },

  //delete a brand
  async delete(req, res) {
    try {
      const brandId = req.params.id;
      const sellerId = req.user._id;
      const brand = await Brand.findOneAndDelete({ _id: brandId, seller: sellerId });

      if (!brand) {
        return res.status(404).send({ error: 'Brand not found.' });
      }

      res.status(200).send(brand);
    } catch (error) {
      res.status(500).send({ error: 'Error deleting brand.' });
    }
  },

  //view all brands
  async getAll(req, res) {
    try {
      const brands = await Brand.find({});

      res.status(200).send(brands);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching brands.' });
    }
  },

  //view a brand by id
  async getById(req, res) {
    try {
      const brandId = req.params.id;
      const brand = await Brand.findById(brandId);

      if (!brand) {
        return res.status(404).send({ error: 'Brand not found.' });
      }

      res.status(200).send(brand);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching brand.' });
    }
  },
};

module.exports = brandController;
