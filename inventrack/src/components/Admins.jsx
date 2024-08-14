import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', status: '' });

    useEffect(() => {
        axios.get('/api/admins')
            .then(response => setAdmins(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAdminAction = (id, action) => {
        if (action === 'add') {
            axios.post('/api/admins', newAdmin)
                .then(response => setAdmins([...admins, response.data]))
                .catch(error => console.error('Error adding admin:', error));
        }
        // Handle deactivate and delete similarly
    };

    return (
        <div className="admins-container">
            <h1>Admin Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td>{admin.name}</td>
                            <td>{admin.status}</td>
                            <td>
                                <button onClick={() => handleAdminAction(admin.id, 'deactivate')}>Deactivate</button>
                                <button onClick={() => handleAdminAction(admin.id, 'delete')}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input
                    type="text"
                    placeholder="Admin Name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newAdmin.status}
                    onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
                />
                <button onClick={() => handleAdminAction(null, 'add')}>Add New Admin</button>
            </div>
        </div>
    );
};

export default Admins;



