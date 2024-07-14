import droneModel from "../models/droneModels.js";
import fs from 'fs';

// add drone part 
const addPart = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const drone = new droneModel({
        name: req.body.name,
        description : req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    console.log(drone);
    try {
        await drone.save();
        res.json({success: true, message: "Part Added"})
    } catch (error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}
//get list of parts
const listDrone = async(req, res) =>{
    try{
        const drones = await droneModel.find({});
        res.json({success: true, data: drones})
    }catch(error){
        console.log("error");
        res.json({success: false, message: "Error"})
    }
}

const removeParts = async (req, res) =>{
    try{
        const drone = await droneModel.findById(req.body.id)
        fs.unlink(`uploads/${drone.image}`, () => {})
        await droneModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Part Deleted"})
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}
export {addPart, listDrone, removeParts}