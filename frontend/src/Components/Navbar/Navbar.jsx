import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { PiShoppingCartSimpleThin, PiUserThin } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/blue logo.png';
import "./Navbar.css";
import all_products from '../Assets/all_products';

export const Navbar = ({ setShowLogin, searchTerm, setSearchTerm }) => {
  const [menu, setMenu] = useState("shop");
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to control search visibility
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const { getTotalCartItems, token, setToken } = useContext(ShopContext); // Remove products from context
  const menuRef = useRef();
  const navigate = useNavigate();
  

  const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
  };

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleIconClick = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search input visibility
  };

  // Live search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim()) {
      const filtered = all_products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchTerm(""); // Clear search term
    navigate(`/product/${productId}`); // Navigate to the product detail page
    setFilteredProducts([]); // Clear suggestions after selection
  };

  return (
    <div className='navbar'>
      <Link to="/"><img src={logo} width="80" alt="PBF logo" /></Link>
      <ul className='nav-menu'>
        <li onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}>
          <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
        </li>
        <li onClick={() => setMenu("women")} className={menu === "women" ? "active" : ""}>
          <Link to='/women' style={{ textDecoration: 'none' }}>Women</Link>
        </li>
        <li onClick={() => setMenu("men")} className={menu === "men" ? "active" : ""}>
          <Link to='/men' style={{ textDecoration: 'none' }}>Men</Link>
        </li>
      </ul>
      <div className='login'>
        {isSearchVisible && (
          <div className='search-bar'>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {filteredProducts.length > 0 && (
              <div className="search-suggestions">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="search-suggestion"
                    onClick={() => handleSuggestionClick(product.id)}
                  >
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <CiSearch
          style={{ fontSize: '1.7rem', cursor: 'pointer' }}
          onClick={handleIconClick}
          className="navbar-search-button"
        />
        {!token ? (
          <PiUserThin onClick={() => setShowLogin(true)} style={{ fontSize: '1.8rem' }} className='user-icon' />
        ) : (
          <div className='navbar-profile'>
            <PiUserThin style={{ fontSize: '1.8rem' }} />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>Orders</li>
              <hr />
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <PiShoppingCartSimpleThin style={{ fontSize: '1.8rem', color: 'black' }} />
        </Link>
        <div className='cart-count'>{getTotalCartItems()}</div>
      </div>
      <RxHamburgerMenu
        style={{ fontSize: '1.3rem', color: 'black' }}
        onClick={dropdown_toggle}
        className='nav-dropdown'
      />
    </div>
  );
};

export default Navbar;