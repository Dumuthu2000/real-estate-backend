import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';
import User from '../model/user.model.js';

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