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
