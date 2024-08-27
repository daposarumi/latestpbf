import React, {createContext, useEffect} from "react";
import all_products from "../Components/Assets/all_products";
import { useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {};
    for (let index = 0; index < all_products.length+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState(null);


    
    const addToCart = async (itemId) => {
        if (!itemId) {
            console.error('Invalid itemId');
            return;
        }
    
            setCartItems((prev) => ({
                ...prev,
            [itemId]: (prev[itemId] || 0) + 1,  // Initialize to 0 if undefined, then increment
            }));
    
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error('Add to cart error:', error.response?.data || error.message);
            }
        } else {
            console.error('No token available');
        }
    };
    
    // const addToCart = async (itemId) => {
    //     if (!cartItems[itemId]) {
    //         setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    //     } else {
    //         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    //     }
    
    //     if (token) {
    //         console.log('Token being sent:', token);
    //         try {
    //             await axios.post(
    //                 `${url}/api/cart/add`,
    //                 { itemId },
    //                 {
                        
    //                     headers: {
    //                         Authorization: `Bearer ${token}`, // Correct format for Authorization header
    //                     },
    //                 }
                    
    //             );
                
                
    //         } catch (error) {
    //             console.error('Add to cart error:', error.response?.data || error.message);
    //         }
    //     } else {
    //         console.error('No token available');
    //     }
    // };
    
        // if(localStorage.getItem('token')){
        //     fetch('http://localhost:5000/addtocart', {
        //         method:'POST',
        //         headers:{
        //             Accept:'application/form-data',
        //             'token':`${localStorage.getItem('token')}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({"itemId":itemId})
        //     })
        //     .then((response)=>response.json())
        //     .then((data)=>console.log(data))
        // }
        

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] > 1) {
                newCartItems[itemId] -= 1;
            } else {
                delete newCartItems[itemId];
            }
            return newCartItems;
        });
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };
    

       
        // if(localStorage.getItem('token')){
        //     fetch('http://localhost:5000/removefromcart', {
        //         method:'POST',
        //         headers:{
        //             Accept:'application/form-data',
        //             'token':`${localStorage.getItem('token')}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({"itemId":itemId})
        //     })
        //     .then((response)=>response.json())
        //     .then((data)=>console.log(data))
        // }
    

        const clearCart = async (itemId) => {
            setCartItems((prevCartItems) => {
                const updatedCartItems = { ...prevCartItems };
                delete updatedCartItems[itemId];
                return updatedCartItems;
            });
        
            if (token) {
                try {
                    await axios.post(url + "/api/cart/clear", { itemId }, { headers: { token } });
                    console.log("Product removed from cart successfully.");
                } catch (error) {
                    console.error("Error removing product from cart:", error);
                }
            }
        };
        
    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item]>0)
    //         {
    //             let itemInfo = all_products.find((product)=>product.id===Number(item))
    //             totalAmount += itemInfo.price * cartItems[item];
    //         }
            
    //     }
    //     return totalAmount;

    // }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
            
        }
        return totalItem;
    }

     const loadCartData = async (token) => {
         const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
         setCartItems(response.data.cartData)
     }

    //   useEffect(() => {
    //       async function loadData() {
    //         if (localStorage.getItem("token")) {
    //              setToken(localStorage.getItem("token"));
                 
    //             await loadCartData(localStorage.getItem("token"));
    //          }
    //      }
    //       loadData();
    //   }, []);


    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                try {
                    // Decode token to get userId
                    const decodedToken = jwtDecode(token);
                    setUserId(decodedToken.id);
                    
                    await loadCartData(token);
                } catch (error) {
                    console.error("Error decoding token or loading cart data:", error);
                }
            } else {
                console.log("No token found, please log in.");
            }
        };

        loadData();
    }, []); // Empty dependency array ensures this runs only once on mount

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         fetch('http://localhost:4000/api/cart/get', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'token': localStorage.getItem('token'),
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({}), // Pass an empty object as the body
    //         })
    //         .then((response) => response.json())
    //         .then((data) => setCartItems(data))
    //         .catch((error) => console.error('Error fetching cart data:', error));
    //     }
    // }, []); // Empty dependency array to run the effect only once
    

    const contextValue = {setCartItems, getTotalCartItems, clearCart, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart, url, token, setToken, userId};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;