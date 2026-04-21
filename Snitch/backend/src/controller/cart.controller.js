import cartModel from "../model/cart.model.js";  
import productModel from "../model/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";

export async function addToCart(req,res){
    const {productId ,variantId} = req.params
    const {quantity = 1} = req.body

    const product = await productModel.findOne({
        _id:productId,
        "variants._id":variantId
    })

    if(!product){
        return res.status(404).json({
            message:"Product or variant not found",
            success:false
        })
    }

    const stock = await stockOfVariant(productId ,variantId)

    const cart = (await cartModel.findOne({ user :  req.user._id })) || 
        (await cartModel.create({user:req.user._id}))

    const isProductAlreadyInCart = cart.item.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if(isProductAlreadyInCart){
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId).quantity
        
        if(quantityInCart + qauntity > stock){
            return res.status(400).json({
                message: ` Only ${stock - quantityInCart} items left in  the stock. and you already have ${quantityInCart} items in your cart`,
                success:false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart updated Successfully",
            success:true
        })

        if (quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock`,
                success: false
            })
        }  
        
        cart.item.push({
            product:productId,
            variant: variantId,
            qauntity,
            price:product.price
        })

        await cart.save()

        return res.status(200).json({
            message:'Product added to cart successfully',
            success:true
        })
    }
}

export async function getCart(req,res){
    const user = req.user 

    let cart = await cartModel.findOne({user:user._id}).populate("items.product")

    if(!cart){
        cart = await cartModel.create({user:user._id})
    }

    return res.status(200).json({
        message:"Cart fetched successfully",
        success:true,
        cart
    })
}