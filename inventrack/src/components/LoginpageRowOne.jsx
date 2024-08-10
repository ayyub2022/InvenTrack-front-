import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { profile } from './api/api'; // Adjust the path if necessary
import "./Auth.css"

const libraries = ["places"];

function Login() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBQxT3xBni2UvXtvfH4nhqKuUVrY5gte1s",
        libraries: libraries,
    });

    const [addclass, setaddclass] = useState("");
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [showContactInput, setShowContactInput] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-page');

        // Clean up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        location: "",
        contact: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "role") {
            setFormData({
                ...formData,
                [name]: value
            });
            setShowLocationInput(value === "delivery"); 
            setShowContactInput(value === "delivery"); 
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            if (name in loginData) {
                setLoginData({
                    ...loginData,
                    [name]: value
                });
            }
        }
    };

    // SIGNUP PAGE 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match", { position: "top-right" });
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5555/adduser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                toast.success("Account created successfully!", { position: "top-right", className: "toast-message" });
                console.log("this is the data when signing up", data);
                const { access_token } = data;
                localStorage.setItem('access_token', access_token);
                console.log('User registered:', data);

                // Fetch the profile data to determine the role
                const profileResponse = await profile();
                const userRole = profileResponse.data.role;
                console.log("this is the role", userRole);

                if (userRole === 'buyer') {
                    navigate('/my_banda');
                } else if (userRole === 'seller') {
                    navigate('/sellerdash');
                } else if (userRole === 'delivery') {
                    navigate('/driverAnalytics');
                } else {
                    console.log("Message after all roles");
                    navigate('/banda_admin');
                }

                console.log('Successful');
                navigate("/home");
            } else {
                toast.error("Signup failed. Please try again.", { position: "top-right", className: "toast-message" });
                console.error('Signup failed:', response.statusText);
            }
        } catch (error) {
            toast.error("Signup failed. Please try again.", { position: "top-right", className: "toast-message" });
            console.error('Signup failed:', error);
        }
    };

    // LOGIN PAGE 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5555/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Login successful!", { position: "top-right", className: "toast-message" });
                console.log("this is the data", data);
                const { access_token } = data;
                localStorage.setItem('access_token', access_token);

                // Fetch the profile data to determine the role
                const profileResponse = await profile();
                const userRole = profileResponse.data.role;
                console.log("this is the role", userRole);

                const newSeller = profileResponse.data.isNewSeller;
                console.log("newSeller", newSeller);

                if (userRole === 'buyer') {
                    navigate('/my_banda');
                } else if (userRole === 'seller' && newSeller) {
                    navigate('/sellerdash');
                } else if (userRole === 'seller' && !newSeller) {
                    navigate('/oldsellerdash');
                } else if (userRole === 'delivery') {
                    navigate('/driverAnalytics');
                } else if (userRole === 'banda_admin') {
                    navigate('/banda_admin');
                } else {
                    console.log("this user has no route");
                }

                console.log('Successful');
                navigate("/home");
            } else {
                toast.error("Login failed. Please check your credentials.", { position: "top-right", className: "toast-message" });
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.", { position: "top-right", className: "toast-message" });
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="center-container">
            <div id="container" className={`container ${addclass}`}>
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <h4 id="form-title">Create Account!</h4>
                        <label id="form-label" htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username"
                            placeholder="Username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                        <label id="form-label" htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <label id="form-label" htmlFor="role">Role:</label>
                        <select name="role" id="role" value={formData.role} onChange={handleChange}>
                            <option value="">Select...</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            <option value="delivery">Delivery person</option>
                        </select>
                        <label id="form-label" htmlFor="password">Password:</label>
                        <input  
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                        <label id="form-label" htmlFor="confirmPassword">Confirm password:</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword"
                            placeholder="Confirm password" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                        
                        {showLocationInput && (
                            <>
                                <label id="form-label" htmlFor="location">Location:</label>
                                {isLoaded && (
                                    <Autocomplete>
                                        <input 
                                            type="text" 
                                            name="location" 
                                            id="location" 
                                            placeholder="Location" 
                                            value={formData.location} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </Autocomplete>
                                )}
                            </>
                        )}
                        {showContactInput && (
                            <>
                                <label id="form-label" htmlFor="contact">Contact:</label>
                                <input 
                                    type="tel" 
                                    name="contact" 
                                    id="contact"
                                    placeholder="Contact"  
                                    value={formData.contact} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </>
                        )}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container log-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <label id="form-label" htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={loginData.email}
                            onChange={handleChange}
                            required 
                        />
                        <label id="form-label" htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={loginData.password}
                            onChange={handleChange}
                            required 
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="login-overlay">
                        <div className="overlay-panel overlay-left">
                            <div className="overlay-log-in">
                                <h1>Welcome Back</h1>
                                <p>To keep connected with us please login with your personal info</p>
                            </div>
                            <div className="overlay-login-signup">
                                <button className="ghost" id="signUp" onClick={() => setaddclass("")}> Go Signup</button>
                            </div>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <div className="overlay-signup">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                            </div>
                            <div className="overlay-signup-login">
                                <p>Already have an account?</p>
                                <button className="ghost" id="login" onClick={() => setaddclass("right-panel-active")}> Go Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
