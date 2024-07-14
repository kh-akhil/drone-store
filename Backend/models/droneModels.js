import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required: true},
    price:{type: Number, required: true},
    image:{type: String, required: true},
    category: {type: String, required: true}
})

const droneModel = mongoose.models.drone || mongoose.model("drone", droneSchema);

export default droneModel;