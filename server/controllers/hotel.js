import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      next(err);
    }
}

export const updateHotel = async (req,res,next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
          $set: req.body
        },{new:true});
        res.status(200).json(updatedHotel);
      } catch (err) {
        next(err);
      }
}

export const deleteHotel = async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
         res.status(200).json("Hotel has been deleted");
       } catch (err) {
         next(err);
       }
}

export const getHotel = async (req,res,next)=>{

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
      } catch (err) {
        next(err);
      }
}

export const getHotels = async (req,res,next)=>{
  const {limit,min,max,...ohters}=req.query;
  // console.log(req.query)
    try {
        const hotels = await Hotel.find({...ohters,cheapestPrice:{$gt: min || 1 ,$lt:max ||999}}).limit(limit);
       
        res.status(200).json(hotels);
      } catch (err) {
       next(err);
      }
}
export const countByCity = async (req,res,next)=>{
  const cities = req.query.cities.split(",")
  // console.log(cities)
    try {
      const list = await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city})
      }))
        res.status(200).json(list);
      } catch (err) {
       next(err);
      }
}
export const countByType = async (req,res,next)=>{

    try {
      const hotelsCount = await Hotel.countDocuments({type:"hotel"})
      const apartmentsCount = await Hotel.countDocuments({type:"apartment"})
      const resortsCount = await Hotel.countDocuments({type:"resort"})
      const villasCount = await Hotel.countDocuments({type:"villa"})
      const cabinsCount = await Hotel.countDocuments({type:"cabin"})
        res.status(200).json([
         {type:"hotel",count:hotelsCount},
         {type:"apartment",count:apartmentsCount},
         {type:"resort",count:resortsCount},
         {type:"villa",count:villasCount},
         {type:"cabin",count:cabinsCount},
        ]);
      } catch (err) {
       next(err);
      }
}

export const getHotelRooms = async (req,res,next)=>{

    try {
         const hotel = await Hotel.findById(req.params.id);
         const list  = await Promise.all(hotel.rooms.map((room)=>{
          return Room.findById(room);
         }))
         res.status(200).json(list);
      } catch (err) {
       next(err);
      }
}