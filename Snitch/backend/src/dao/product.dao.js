import productModel from "../model/product.model.js";

export const stockOfVariant = async (productId,variantId) => {
    const product = await  productModel.findOne({
        _id:productId,
        "variants_id":variantId
    })

    const stock =  product.variants.find(variant => variant._id.toString() === variantId).stock

    return stock
}