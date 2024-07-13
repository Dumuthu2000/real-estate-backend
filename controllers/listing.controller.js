import Listing from "../model/listing.model.js";

export const createListing=async(req, res, next)=>{
    try {
        const listing = Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}