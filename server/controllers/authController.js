const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("x-auth-token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 10 })
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
