import { createBrowserRouter } from "react-router";
import App from "./App";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CreateProduct";

export const routes = createBrowserRouter([
    {
        path:"/",
        element: <h1>Hello ji hello</h1>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/seller/create",
        element:<CreateProduct/>
    },
])