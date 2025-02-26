const createHttpError = require('http-errors');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

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
   try{

    const {email, password} = req.body;
    if(!email || !password){
        return next(createHttpError(400, "All fields are required"));
    }

    const isUserPresent = await User.findOne({email});
    if(!isUserPresent){
        return next(createHttpError(401, "Invalid Credentials"));
    }

    const isMatch = await bcrypt.compare(password, isUserPresent.password);
    if(!isMatch){
        return next(createHttpError(401, "Invalid Credentials"));
    }

    const accessToken = jwt.sign({_id: isUserPresent._id}, config.accessTokenSecret,{
        expiresIn: '1d'
    });

    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })

    res.status(200).json({success: true, message: "User Login Successfully!", data: isUserPresent});


   }catch (error){
    next(error);
   }
}

const getUserData = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id);
        res.status(200).json({success: true, data:user});

    } catch (error) {
        next(error);
    }
}

module.exports = { register, login , getUserData};
