
import './App.css';
import React, { useState } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cart } from './Pages/Cart';
import { Product } from './Pages/Product';
import { ShopCategory } from './Pages/ShopCategory';
import { Shop } from './Pages/Shop';
import { Footer } from './Components/Footer/Footer';
import { PlaceOrder } from './Pages/Placeorder/PlaceOrder';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import  {Verify} from './Pages/Verify/verify';
import MyOrders from './Pages/MyOrders/MyOrders';
import SearchComponent from './Components/SearchResults/SearchResults';
import all_products from './Components/Assets/all_products';


function App() {

  const [showLogin,setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm) {
      const results = all_products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  
  // const [items, setItems] = useState([
  //   { name: 'Yimika Jumpsuit' },
  //   { name: 'Yemisi' },
  //   { name: 'Borokinni' },
  //   { name: 'Date' },
  //   { name: 'Elderberry' },
  //   { name: 'Fig' },
  //   { name: 'Grape' }
  // ]);
  return (
  <>
    {showLogin?<LoginSignup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <BrowserRouter>
        <Navbar setShowLogin={setShowLogin}
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         handleSearch={handleSearch}/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/women' element={<ShopCategory category="Women"/>}/>
          <Route path='/men' element={<ShopCategory category="Men"/>}/>
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>} />
          <Route path='/search' element={<SearchComponent items={searchResults}/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
    </>
  );
}

export default App;
