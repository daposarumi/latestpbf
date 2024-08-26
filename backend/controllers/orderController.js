import axios from 'axios';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const placeOrder = async (req, res) => {
    const { userId, items, address } = req.body;
    const { email } = address;

    // Log received items to check their structure and prices
    console.log('Received items:', items);

    try {
        // Calculate total amount directly here, including delivery charge
        const itemsTotalAmount = calculateTotalAmount(items);
        const deliveryCharge = 600000; // 6000 NGN in kobo
        const totalAmount = itemsTotalAmount + deliveryCharge;

        // Save the new order to the database
        const newOrder = new orderModel({
            userId,
            items,
            amount: totalAmount, // Store total amount including delivery charge
            address
        });
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line_items array for Paystack
        const line_items = items.map(item => ({
            name: item.name,
            amount: item.price * 100, // Convert price to kobo
            quantity: item.quantity || 1, // Default quantity to 1 if not provided
            currency: 'NGN' // Nigerian Naira
        }));

        // Add delivery charge as a separate line item
        line_items.push({
            name: 'Delivery Charges',
            amount: deliveryCharge,
            quantity: 1,
            currency: 'NGN' // Nigerian Naira
        });

        // Log the request payload to Paystack
        console.log('Paystack Request Payload:', {
            email,
            amount: totalAmount,
            callback_url: `${process.env.FRONTEND_URL}/verify?orderId=${newOrder._id}&success=true`,
            metadata: {
                orderId: newOrder._id.toString(),
                items: line_items.map(item => item.name).join(', ')
            },
            line_items
        });

        // Initialize transaction with Paystack
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email, // Ensure email is included
                amount: totalAmount,
                callback_url: `${process.env.FRONTEND_URL}/verify?orderId=${newOrder._id}&success=true`,
                metadata: {
                    orderId: newOrder._id.toString(),
                    items: line_items.map(item => item.name).join(', ')
                },
                line_items
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        // Return Paystack transaction initialization response
        res.json({ success: true, session_url: response.data.data.authorization_url });
    } catch (error) {
        console.error('Error placing order with Paystack:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Helper function to calculate total amount from items
const calculateTotalAmount = (items) => {
    let totalAmount = 0;
    for (const item of items) {
        // Ensure item.price is a valid number
        if (isNaN(item.price)) {
            throw new Error(`Invalid price for item: ${item.name}`);
        }
        totalAmount += item.price * (item.quantity || 1) * 100; // Convert to kobo
    }
    if (isNaN(totalAmount)) {
        throw new Error(`Total amount calculation resulted in NaN`);
    }
    return totalAmount;
};

const verifyOrder = async (req,res) => {
const {orderId, success} = req.body;

try {
    if (success=="true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,meessage:"Error"})
    }
}

// api for updating order status

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// listing orders on admin panel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}





export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
