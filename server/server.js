const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors")
const cookieParser = require("cookie-parser");
const productRouter = require('./routes/productRoute');
dotenv.config();
require("./config/cloudinary.config")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' })); // Increase payload size limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))


// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
