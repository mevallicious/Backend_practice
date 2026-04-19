import {getSellerProducts,createproduct} from "../service/product.api.js"
import { useDispatch } from "react-redux"
import { setSellerProducts } from "../store/product.slice.js"

export const useProducts = () =>{

    const dispatch = useDispatch()

    async function handleCreateProduct(formdata){
        const data = await createproduct(formdata)
        return data.product
    }

    async function handleGetSellerProduct(){
        const data = await getSellerProducts()
        dispatch(setSellerProducts(data.products))
        return data.products    
    }
}