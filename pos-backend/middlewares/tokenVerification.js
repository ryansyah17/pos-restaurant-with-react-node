const config = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const createHttpError = require('http-errors');


const isVerifiedUser = async(req, res, next) => {
    try{

        const  { accessToken } = req.cookies;

        if(!accessToken){
            const error = createHttpError(401, "Please provide Token!");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        const user = await User.findById(decodeToken._id);
        if(!user){
            const error = createHttpError(401, "User Not Exist!");
            return next(error);
        }

        req.user = user;
        next();

    }catch (error){
        const err = createHttpError(401, "Invalid Token!");
        next(err);
    }
}

module.exports = { isVerifiedUser };