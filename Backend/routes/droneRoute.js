import express from "express"
import { addPart, listDrone, removeParts } from "../controllers/droneController.js"
import multer from "multer";

const droneRouter = express.Router();

//Image storage enginer 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

droneRouter.post("/add", upload.single("image"), addPart);
droneRouter.get("/list", listDrone)
droneRouter.post("/remove", removeParts)

export default droneRouter;