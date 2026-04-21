import { addItems, getCart } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { setItems, addItem as addItemToCart, removeItem } from "../store/cart.slice";

export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddItems({ productId, variantId, quantity = 1 }){
        const data = await addItems({productId, variantId, quantity})
        return data
    }

    async function handleGetCart(){
        const data = await getCart();
        dispatch(setItems(data.cart.items || []))
        return data.cart
    }

    return { handleAddItems, handleGetCart }
}
