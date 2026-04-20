import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        unique:true
    },
    description: {
        type:String,
        required:true
    },
    seller: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    price: {
        amount:{
            type:Number,
            required:true
        },
        Currency:{
            type:String,
            enum:['USD','INR','GBP','EUR'],
            default:'INR'
        }
    },
    images: [
        {
            url:{
                type:String,
                required:true
            },
            
        }
    ],
    variants: [
        {
            images:[
                {
                    url:{
                        type:String,
                        required:true
                    }
                }
            ],
            size: {
                type: String,
                required: true,
                trim: true 
            },
            stock: {
                type: Number,
                required: true,
                min: [0, 'Stock cannot be negative'],
                default: 0
            }
        }
    ]
},{timestamps:true}
)

const productModel = mongoose.model('product',productSchema)

export default productModel