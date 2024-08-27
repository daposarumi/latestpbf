import React from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                
            </div>
            <div className="productdisplay-img">
                <img src={product.image} className='productdisplay-main-img' alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-prices">
                <div className="price">&#8358;{product.price.toLocaleString()}</div>
            </div>
            <div className="productdisplay-right-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officia, obcaecati iure culpa eveniet rem laboriosam tempore autem at excepturi odit dolorem eius eligendi doloribus dicta cumque perferendis! Blanditiis, aut.
            </div>
            <div className="productdisplay-right-size">
                <h2>Select Size</h2>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                    </div>
            </div>
            <button onClick={()=> addToCart(product.id)}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category: </span>Women, T-shirt, Crop top</p>
            <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
        </div>
    </div>
  )
}



// import React from 'react'
// import './ProductDisplay.css'
// import { ShopContext } from '../../Context/ShopContext';
// import { useContext } from 'react';

// export const ProductDisplay = (props) => {
//     const {product} = props;
//     const {addToCart} = useContext(ShopContext);
//   return (
//     <div className='productdisplay'>
//         <div className="productdisplay-left">
//             <div className="productdisplay-img-list">
//                 <img src={product.image} alt=""/>
//                 <img src={product.image} alt=""/>
//                 <img src={product.image} alt=""/>
                
//             </div>
//             <div className="productdisplay-img">
//                 <img src={product.image} className='productdisplay-main-img' alt="" />
//             </div>
//         </div>
//         <div className="productdisplay-right">
//             <h1>{product.name}</h1>
//             <div className="productdisplay-right-prices">
//                 <div className="price">&#8358;{product.price.toLocaleString()}</div>
//             </div>
//             <div className="productdisplay-right-desc">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officia, obcaecati iure culpa eveniet rem laboriosam tempore autem at excepturi odit dolorem eius eligendi doloribus dicta cumque perferendis! Blanditiis, aut.
//             </div>
//             <div className="productdisplay-right-size">
//                 <h2>Select Size</h2>
//                 <div className="productdisplay-right-sizes">
//                     <div>S</div>
//                     <div>M</div>
//                     <div>L</div>
//                     <div>XL</div>
//                     <div>XXL</div>
//                 </div>
//             </div>
//             <button onClick={()=> addToCart(product.id)}>ADD TO CART</button>
//             <p className="productdisplay-right-category"><span>Category: </span>Women, T-shirt, Crop top</p>
//             <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
//         </div>
//     </div>
//   )
// }
