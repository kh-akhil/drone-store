import userModel from "../models/userModels.js";

const addToCart = async (req, res) =>{
    try{
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemID]){
            cartData[req.body.itemID] = 1;
        }else{
            cartData[req.body.itemID] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const removeFromCart = async (req, res) =>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        if(cartData[req.body.itemID]>0){
            cartData[req.body.itemID] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const getCart = async (req, res) =>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export {addToCart, removeFromCart, getCart};
