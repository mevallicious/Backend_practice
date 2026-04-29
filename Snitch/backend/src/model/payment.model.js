import mongoose from "mongoose";
import priceSchema from "./price.schema.js";


const paymentSchema = new mongoose.Schema({
    status:{
        type:String,
        enum:["pending","paid","failed"],
        default:"pending"
    },
    price:{
        type:priceSchema,
        required:true
    },
    razorpay:{
        orderId:String,
        paymentId:String,
        signature:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    orderItems:[
        {
            title:String,
            quantity:Number,
            price:priceSchema,
            productId:mongoose.Schema.Types.ObjectId,
            
            variantId:mongoose.Schema.Types.ObjectId,
            description:String
        }
    ]
}, { timestamps: true });

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel