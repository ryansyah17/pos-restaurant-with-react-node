const createHttpError = require('http-errors');
const User = require('../models/userModel');

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;

        if (!name || !phone || !email || !password || !role) {
            return next(createHttpError(400, "All fields are required"));
        }

        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            return next(createHttpError(400, "User already exists"));
        }

        const user = new User({ name, phone, email, password, role });
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully", data: user });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    // Implementasi login
};

module.exports = { register, login };
