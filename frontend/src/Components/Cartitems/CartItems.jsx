import React from 'react'
import './CartItems.css'
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { TfiClose } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

export const CartItems = () => {


const {getTotalCartAmount, all_products, cartItems, removeFromCart,clearCart, addToCart} = useContext(ShopContext);

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {all_products.map((item,index) => {
            if(cartItems[item.id]>0)
            {
                return (

                  <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={item.image} width='50' alt="" className='carticon-producticon'/>
                    <p>{item.name}</p>
                    <p>&#8358;{item.price.toLocaleString()}</p>
                    <div className='item-counter'>
                    <button className='cartitems-quantity'>
                    <AiOutlineMinus onClick={() => removeFromCart(item.id)} className='icon' />
                    
                    <span className='quantity'>{cartItems[item.id]}</span>
                    <BsPlusLg onClick={() => addToCart(item.id)} className='icon' />
                    </button>
                </div>
                    <p>&#8358;{item.price*cartItems[item.id]}</p>
                    <TfiClose className='cartitems-remove-icon' onClick={()=>{clearCart(item.id)}}/>
                </div>
            </div>
            )
            }
            return null;
        })}
        <div className="cartitems-down">
    <div className="cartitems-total">
        <h1>Cart Total</h1>
        <div>
            <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>&#8358;{getTotalCartAmount()}</p> {/* Subtotal without delivery fee */}
            </div>
            <hr />
            <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>&#8358;{getTotalCartAmount() === 0 ? 0 : 6000}</p> {/* Shipping fee only if there are items in the cart */}
            </div>
            <hr />
            <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>&#8358;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6000}</h3> {/* Total amount including shipping fee */}
            </div>
        </div>
        <Link to='/order'><button>PROCEED TO CHECKOUT</button></Link>
    </div>
</div>

    </div>
  )
}


// import React from 'react';
// import './CartItems.css';
// import { useContext } from 'react';
// import { ShopContext } from '../../Context/ShopContext';
// import { TfiClose } from "react-icons/tfi";
// import { Link } from 'react-router-dom';
// import { BsPlusLg } from "react-icons/bs";
// import { AiOutlineMinus } from "react-icons/ai";

// export const CartItems = () => {
//     const { getTotalCartAmount, all_products, cartItems, removeFromCart, clearCart, addToCart } = useContext(ShopContext);

//     return (
//         <div className='cartitems'>
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Size</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_products.map((product, index) => {
//                 const productSizes = cartItems[product.id]; // Get the array of sizes and quantities

//                 if (productSizes && productSizes.length > 0) {
//                     return productSizes.map((item, sizeIndex) => (
//                         <div key={`${product.id}-${sizeIndex}`}>
//                             <div className="cartitems-format cartitems-format-main">
//                                 <img src={product.image} width='50' alt="" className='carticon-producticon' />
//                                 <p>{product.name}</p>
//                                 <p>{item.size}</p> {/* Display the size */}
//                                 <p>&#8358;{product.price.toLocaleString()}</p>
//                                 <div className='item-counter'>
//                                     <button className='cartitems-quantity'>
//                                         <AiOutlineMinus onClick={() => removeFromCart(product.id, item.size)} className='icon' />
//                                         <span className='quantity'>{item.quantity}</span>
//                                         <BsPlusLg onClick={() => addToCart(product.id, item.size)} className='icon' />
//                                     </button>
//                                 </div>
//                                 <p>&#8358;{product.price * item.quantity}</p>
//                                 <TfiClose className='cartitems-remove-icon' onClick={() => clearCart(product.id, item.size)} />
//                             </div>
//                         </div>
//                     ));
//                 }
//                 return null;
//             })}
//             <div className="cartitems-down">
//                 <div className="cartitems-total">
//                     <h1>Cart Total</h1>
//                     <div>
//                         <div className="cartitems-total-item">
//                             <p>Subtotal</p>
//                             <p>&#8358;{getTotalCartAmount()}</p> {/* Subtotal without delivery fee */}
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>&#8358;{getTotalCartAmount() === 0 ? 0 : 6000}</p> {/* Shipping fee only if there are items in the cart */}
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <h3>Total</h3>
//                             <h3>&#8358;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 6000}</h3> {/* Total amount including shipping fee */}
//                         </div>
//                     </div>
//                     <Link to='/order'><button>PROCEED TO CHECKOUT</button></Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
