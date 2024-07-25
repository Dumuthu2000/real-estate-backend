import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';
import User from '../model/user.model.js';
import Listing from "../model/listing.model.js";

//Update user
export const updateUser=async(req, res, next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can update only your own account!!!'));
    }
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});

        const{password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

//Delete User
export const deleteUser=async(req, res, next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can delete your own account!!'));
    }
    try {
        await User.findByIdAndDelete(req.user.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!!');
    } catch (error) {
        next(error);
    }
}

//Get user listings
export const getUserListings=async(req, res, next)=>{
    console.log(req.user)
    if(req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    }else{
        next(errorHandler(401, 'You can only view your own listings'))
    }
}

//Get user details
export const getUser=async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return next(errorHandler(404, 'User not found!!'));
        }
        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}