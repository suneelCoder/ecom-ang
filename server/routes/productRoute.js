const express = require('express');
const multer = require('multer');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

const productRouter = express.Router();

// Use Multer's memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Routes for product CRUD operations
productRouter.post('/', upload.array('images'), createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;
