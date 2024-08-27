// import React, { useContext, useState, useEffect, useCallback } from 'react';
// import { ShopContext } from '../../Context/ShopContext';
// import axios from 'axios';
// import './MyOrders.css';

// const MyOrders = () => {
//     const [ url, token ] = useContext(ShopContext);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchOrders = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 `${url}/api/order/userorders`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching orders:', error.response ? error.response.data : error.message);
//         }
//     finally {
//         setLoading(false);
//     }
//     }, [url, token]); // Dependencies of fetchOrders

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token, fetchOrders]); 

//     // return (
//     //     <div className='my-orders'>
//     //         <h2>My Orders</h2>
//     //         <div className="container">
//     //             {data.map((order, index) => (
//     //                 <div key={index} className="my-orders-order">
//     //                     <p>{order.items.map((item, index) => (
//     //                         index === order.items.length - 1
//     //                             ? `${item.name} x ${item.quantity}`
//     //                             : `${item.name} x ${item.quantity}, `
//     //                     ))}</p>
//     //                     <p>&#8358;{order.amount}</p>
//     //                     <p>Items: {order.items.length}</p>
//     //                     <p><span>&#x25cf;</span><b>{order.status}</b></p>
//     //                     <button onClick={fetchOrders}>Track Order</button>
//     //                 </div>
//     //             ))}
//     //         </div>
//     //     </div>
//     // );

//     return (
//         <div className='my-orders'>
//             <h2>My Orders</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div className="container">
//                     {Array.isArray(data) && data.length > 0 ? (
//                         data.map((order, index) => (
//                             <div key={index} className="my-orders-order">
//                                 <p>{order.items.map((item, index) => (
//                                     index === order.items.length - 1
//                                         ? `${item.name} x ${item.quantity}`
//                                         : `${item.name} x ${item.quantity}, `
//                                 ))}</p>
//                                 <p>&#8358;{order.amount}</p>
//                                 <p>Items: {order.items.length}</p>
//                                 <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                                 <button onClick={fetchOrders}>Track Order</button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No orders found.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
    
// };

// export default MyOrders;


// Import statements at the top
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import './MyOrders.css';

// Component definition
const MyOrders = () => {
    const { url, token } = useContext(ShopContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch orders
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
            setData(response.data.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    }, [url, token]);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [fetchOrders, token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((order, index) => (
                            <div key={index} className="my-orders-order">
                                <p>{order.items.map((item, idx) => (
                                    idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                ))}</p>
                                <p>&#8358;{order.amount}</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

// Export statement at the bottom
export default MyOrders;
