// import React from 'react'
// import './Newsletter.css'

// export const Newsletter = () => {
//   return (
//     <div className='newsletter'>
//         <h1>Subscribe and never miss a thing</h1>
//         <p>From sales to newsletters and latest happening in our HQ</p>
//         <div>
//             <input type="email" placeholder="Email address"/>
//             <button>Subscribe</button>
//         </div>
//     </div>
//   )
// }


import React, { useState } from 'react';
import './Newsletter.css';
import axios from 'axios';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error.response ? error.response.data : error.message);
      setMessage('Failed to subscribe. Please try again later.');
    }
  };
  

  return (
    <div className='newsletter'>
      <h1>Subscribe and never miss a thing</h1>
      <p>From sales to newsletters and latest happenings in our HQ</p>
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};
