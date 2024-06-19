import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const CartContext = createContext()



export default function CartContextProvider(props) {


    const cartURL = 'https://ecommerce.routemisr.com/api/v1/cart'


    let [headers,setHeaders] = useState({
        token: localStorage.getItem('userToken')
    })

    console.log(headers);




    function updateCount(item_id, count) {
        return axios.put(cartURL + `/${item_id}`, { count }, { headers })
            .then((response) => response)
            .catch((err) => err)
    }
    function addToCart(productId) {
        return axios.post(cartURL, { productId }, { headers })
            .then((response) => {
                return response
            })
            .catch((err) => err)
    }


    function getLoggedUserCart() {
        return axios.get(cartURL, { headers })
            .then((response) => {
                console.log(headers);
                return response
            })
            .catch((error) => error);
    }

    function removeItem(item_id) {
        return axios.delete(cartURL + `/${item_id}`, { headers })
            .then((response) => {
                return response
            })
            .catch((err) => err)
    }

    function clearCart() {
        return axios.delete(cartURL, { headers })
            .then((response) => response)
            .catch((err) => err)
    }


    const [count, setCount] = useState(0)

    const [cartId, setCartId] = useState(null);

    // async function getCartId() {
    //     const { data } = await getLoggedUserCart();
    //     setCartId(data?.data._id);
    //     console.log(cartId);

    //     console.log(data?.data._id);
    //     if (data?.numOfCartItems) {
    //         setCount(data?.numOfCartItems);
    //     } else if (!data?.numOfCartItems) {
    //         setCount(0);
    //     }
    // }



    return <CartContext.Provider value={{ cartId, count, setCount, addToCart, getLoggedUserCart, removeItem, updateCount, clearCart ,setHeaders}}>
        {props.children}
    </CartContext.Provider>
}