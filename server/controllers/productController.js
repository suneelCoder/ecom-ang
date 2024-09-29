const Product = require('../models/Product');
const cloudinary = require('cloudinary')
// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, images } = req.body;

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ message: 'No images provided' });
        }

        // Array to hold the Cloudinary URLs
        const imageUrls = [];

        // Upload each base64 image to Cloudinary
        for (const base64Image of images) {
            const uploadResponse = await cloudinary.v2.uploader.upload(base64Image, {
                folder: 'products', // Optional folder to organize uploads
                resource_type: 'image',
            });

            // Push the secure URL to the imageUrls array
            imageUrls.push(uploadResponse.secure_url);
        }

        // Create a new product in the database
        const product = new Product({
            name,
            price,
            description,
            stock,
            images: imageUrls, // Store the Cloudinary URLs in the database
        });

        // Save the product to MongoDB
        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Failed to create product' });
    }
};


// Fetch all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedData = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
