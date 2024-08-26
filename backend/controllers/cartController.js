

import userModel from '../models/userModel.js';




//add to cart 
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData =  await userData.cartData;
        if (!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({ success: true, message: "Added to cart" });

       
       

       
    } catch (error) {
        console.log("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

export default addToCart;



//remove from cart 
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        else{
            console.log("No such product in cart")
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}




//clear all items
const clearCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        let cartData = userData.cartData;

        if (cartData[req.body.itemId]) {
            delete cartData[req.body.itemId];
        } 
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing item from cart", error: error.message });
    }
}


// fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,clearCart,getCart}