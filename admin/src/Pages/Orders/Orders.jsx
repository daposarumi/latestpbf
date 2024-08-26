// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const Orders = ({url}) => {

    const [orders,setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url+"/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        }
            else{
                toast.error("Error")
            }
        }

        const statusHandler = async (event,orderId) => {
                const response = await axios.post(url+"/api/order/status",{
                    orderId,
                    status:event.target.value
                })
                if (response.success) {
                    await fetchAllOrders
                }
        }

        useEffect(()=>{
            fetchAllOrders();
        })
  return (
    <div className='order add'>
        <h3>Orders</h3>
        <div className="order-list">
            {orders.map((order,index)=>(
                <div key={index} className="order-item">
                    <div>
                    <p className='order-item-dress'>
                        {order.items.map((item,index)=>{
                        if (index===order.items.length-1) {
                            return item.name + " x " + item.quantity
                        }
                        else{
                            return item.name + " x " + item.quantity + ", "
                        }
                    })}
                    </p>
                    <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                    <div className="order-item-address">
                        <p>{order.address.street+","}</p>
                        <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                    </div>
                    <p className="order-item-phone">{order.address.phone}</p>
                    </div>
                    <p>Items: {order.items.length}</p>
                    <p>&#8358;{order.amount}</p>
                    <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                        <option value="Order Processing">Order Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders