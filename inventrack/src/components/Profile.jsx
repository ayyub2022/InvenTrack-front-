// import React, { useState, useEffect } from 'react';
// import axios from 'axios';  
// import './Profile.css'; // Import the CSS file for styling
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//     const [loggedIn,setLoggedIn]=useState(false);
//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get('/api/user/profile'); // Adjust the API endpoint as needed
//                 setUser(response.data);
//                 setFormData({
//                     name: response.data.name,
//                     email: response.data.email,
//                     password: ''
//                 });
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSave = async () => {
//         try {
//             await axios.put('/api/user/profile', formData); // Adjust the API endpoint as needed
//             setUser(formData);
//             setIsEditing(false);
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };


//     const login = sessionStorage.getItem("User")



//     return (
//         <div className="profile-container">
//             {user ? (
//                 <>
//                     <h2>User Profile</h2>
//                     {isEditing ? (
//                         <div className="profile-form">
//                             <label htmlFor="name">Name:</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                             <button onClick={handleSave}>Save</button>
//                             <button onClick={() => setIsEditing(false)}>Cancel</button>
//                         </div>
//                     ) : (
//                         <div className="profile-info">
//                             <p><strong>Name:</strong> {user.name}</p>
//                             <p><strong>Email:</strong> {user.email}</p>
//                             <button onClick={handleEdit}>Edit Profile</button>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Profile;
