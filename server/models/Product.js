const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, maxlength: 500 },
    stock: { type: Number, required: true },
    images: [String], // Array of image URLs from Cloudinary
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
