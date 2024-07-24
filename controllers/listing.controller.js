import Listing from "../model/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing=async(req, res, next)=>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

//Delete a listing
 export const deleteListing = async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing is not found'));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listings!!!!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing deleted successfully!!!');
    } catch (error) {
        next(error);
    }
}

export const updateListing=async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404, 'Listing is not found'));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can update only your own listings!!!!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id);
    
    if(!listing){
        return next(errorHandler(404, 'Listing is not found'));
    }

    try {
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
    
    