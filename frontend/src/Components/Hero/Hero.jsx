import React from 'react'
import './Hero.css'
import shalewa from '../Assets/shalewa.jpg'

export const Hero = () => {
  return (
    <div className='hero' class="columns-2 gap-0">
        <div className="top" class='pl-20 '>
            <h1 class="pt-40">The Bọ̀rọ̀kínní Collection</h1>    
            <p>an exquisite fusion of trendsetting designs, premium fabrics, and timeless elegance</p>
            <button class="bg-teal-500 hover:transparent text-white font-semibold mt-9 py-4 px-14 rounded-full">SHOP NOW</button>
        <div/>
        <div>
            <img src={shalewa} className="" alt=""/>
        </div>
    </div>
       
    </div>
  )
}
