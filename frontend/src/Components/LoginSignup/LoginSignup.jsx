import React, { useState, useContext } from 'react';
import "./LoginSignup.css";
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const LoginSignup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(ShopContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userMessage, setUserMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        setLoading(true);  // Start loading

        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            setLoading(false);  // Stop loading

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setUserMessage({ text: "Login successful", type: "success" });

                // Delay closing the modal to allow the user to see the success message
                setTimeout(() => {
                    setShowLogin(false);
                }, 2000); // Adjust the delay as needed
            } else {
                setUserMessage({ text: "Login unsuccessful", type: "error" });
            }
        } catch (error) {
            setLoading(false);  // Stop loading
            setUserMessage({ text: "Error during login", type: "error" });
            console.error("Login error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="loginsignup">
            <form onSubmit={onLogin} className="loginsignup-container">
                <div className='title'>
                    <h1>{currState}</h1>
                    <RxCross1 onClick={() => setShowLogin(false)} style={{ marginTop: '35px', cursor: "pointer" }} />
                </div>

                <div className="loginsignup-fields">
                    {currState === "Login" ? null : <input type="text" name='name' placeholder="Your name" onChange={onChangeHandler} value={data.name} required />}
                    <input name='email' type='email' placeholder="Your email" onChange={onChangeHandler} value={data.email} required />
                    <div className='password-container'>
                        <input name='password' type={passwordVisible ? 'text' : 'password'} placeholder="Password" onChange={onChangeHandler} value={data.password} required />
                        <button type="button" className='toggle-password' onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>

                <button className='logsign-button' type="submit">
                    {loading ? <div className="loading-indicator"></div> : null}
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                <div className='popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login"
                    ? <p className="loginsignup-login">Create a new account?<span onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
                    : <p className="loginsignup-login">Already have an account?<span onClick={() => setCurrState("Login")}>Login</span></p>
                }

                {userMessage && (
                    <div className={`user-message ${userMessage.type}`}>
                        {userMessage.text}
                    </div>
                )}
            </form>
        </div>
    );
};
