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

    