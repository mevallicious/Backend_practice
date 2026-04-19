import { getSellerProducts, createproduct } from "../service/product.api.js";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../store/product.slice.js";
// Assuming you have these actions in your slice
import { setLoading, setError } from "../../auth/store/auth.slice.js"; 

export const useProducts = () => {
    const dispatch = useDispatch();

    async function handleCreateProduct(productData) {
        const formData = new FormData();
        
        // Append text fields
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("priceAmount", productData.priceAmount);
        formData.append("priceCurrency", productData.priceCurrency);

        // 2. Append files
        productData.images.forEach((imgObj) => {
            formData.append("images", imgObj.file);
        });

        try {
            dispatch(setLoading(true));
            // 3. Pass the FormData instance to your API call
            const data = await createproduct(formData);
            return data.product;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to create product"));
            throw error; // Rethrow so the component can handle failure
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetSellerProduct() {
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
            return data.products;
        } catch (error) {
            dispatch(setError("Failed to fetch products",error));
        } 

    }

    return { handleCreateProduct, handleGetSellerProduct };
};