import axios from "axios"

const cartAPIInstance = axios.create({
    baseURL:"/api/cart",
    withCredentials:true
})

export const addItems = async ({ productId, variantId, quantity }) => {
    const response = await cartAPIInstance.post(`/add/${productId}/${variantId}`, { quantity })
    return response.data
}

export const getCart = async () => {
    const response = await cartAPIInstance.get('/')
    return response.data
}

