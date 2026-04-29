import cartModel from "../model/cart.model.js";  
import productModel from "../model/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";
import { createOrder } from "../service/payment.service.js";
import paymentModel from "../model/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";
import crypto from "crypto";

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

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if(isProductAlreadyInCart){
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId).quantity
        
        if(quantityInCart + quantity > stock){
            return res.status(400).json({
                message: `Only ${stock - quantityInCart} items left in the stock, and you already have ${quantityInCart} items in your cart`,
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
    } else {
        if (quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock`,
                success: false
            })
        }  
        
        cart.items.push({
            product:productId,
            variant: variantId,
            quantity,
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

export async function updateCartItem(req, res) {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
        return removeFromCart(req, res);
    }

    const stock = await stockOfVariant(productId, variantId);

    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items available in stock.`,
            success: false
        });
    }

    const cart = await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variant": variantId },
        { $set: { "items.$.quantity": quantity } },
        { new: true }
    ).populate("items.product");

    if (!cart) {
        return res.status(404).json({ message: "Item not found in cart", success: false });
    }

    return res.status(200).json({ message: "Cart updated successfully", success: true, cart });
}

export async function removeFromCart(req, res) {
    const { productId, variantId } = req.params;

    const cart = await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { items: { product: productId, variant: variantId } } },
        { new: true }
    ).populate("items.product");

    return res.status(200).json({ message: "Item removed from cart", success: true, cart });
}


export const createOrderController = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty", success: false });
        }

        let totalAmount = 0;
        cart.items.forEach(item => {
            totalAmount += (item.price.amount * item.quantity);
        });

        const order = await createOrder(totalAmount, "INR");

        
        await paymentModel.create({
            user: req.user._id,
            price: {
                amount: totalAmount,
                Currency: "INR"
            },
            status: "pending",
            razorpay: {
                orderId: order.id
            }
        });

        return res.status(200).json({
            message: "Order created successfully",
            success: true,
            order
        });

    } catch (error) {
        console.error("Razorpay Error:", error);
        return res.status(400).json({ message: "Failed to create payment order", success: false });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        // 1. ACCEPT BOTH FORMATS (This prevents any frontend typo issues!)
        const razorpay_orderId = req.body.razorpay_orderId || req.body.razorpay_order_id;
        const razorpay_paymentId = req.body.razorpay_paymentId || req.body.razorpay_payment_id;
        const razorpay_signature = req.body.razorpay_signature;

        // 2. Log what the frontend actually sent
        console.log("Verifying Payment Data:", { razorpay_orderId, razorpay_paymentId, razorpay_signature });

        if (!razorpay_orderId || !razorpay_paymentId || !razorpay_signature) {
            return res.status(400).json({ 
                message: "Missing Razorpay payment details from frontend", 
                success: false 
            });
        }

        // 3. Find the pending payment
        const payment = await paymentModel.findOne({ 
            "razorpay.orderId": razorpay_orderId,
            status: "pending"
        });

        if (!payment) {
            return res.status(400).json({ 
                message: "Payment order not found in database", 
                success: false 
            });
        }

        // 4. BULLETPROOF SIGNATURE VERIFICATION (Native Node.js approach)
        const bodyText = razorpay_orderId + "|" + razorpay_paymentId;
        const expectedSignature = crypto
            .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
            .update(bodyText.toString())
            .digest("hex");
        
        const isPaymentValid = expectedSignature === razorpay_signature;

        if (!isPaymentValid) {
            payment.status = "failed";
            await payment.save();

            return res.status(400).json({ 
                message: "Payment verification failed (Invalid Signature)", 
                success: false 
            });
        }

        // 5. Success! Update DB and return
        payment.status = "paid";
        payment.razorpay.paymentId = razorpay_paymentId;
        payment.razorpay.signature = razorpay_signature;

        await payment.save();    
        
        return res.status(200).json({
            message: "Payment verified successfully",
            success: true
        });

    } catch (error) {
        console.error("Verification Server Error:", error);
        return res.status(500).json({ message: "Server error during verification", success: false });
    }
}
