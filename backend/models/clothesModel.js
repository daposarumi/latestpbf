import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String, required:true},
    category:{type:String, requierd:true}
})

const ClothesModel = mongoose.models.clothes || mongoose.model("clothes", ClothesSchema)

export default ClothesModel;