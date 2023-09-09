const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
