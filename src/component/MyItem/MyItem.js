import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAllItems from '../hooks/useAllItems';
const axios = require('axios');

const MyItem = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [items, setItems] = useState([]);

    // load item 
    useEffect(() => {
        const getItems = async () => {
            const url = `https://calm-sea-17054.herokuapp.com/my-item?email=${email}`;
            const { data } = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setItems(data);
        }
        getItems();
    }, []);

    // handle delete button 
    const handleDeleteButton = id => {
        const proceed = window.confirm('Are you sure you want to delete the item?');
        if (proceed) {
            const url = `https://calm-sea-17054.herokuapp.com/items/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remainingItems = items.filter(item => item._id !== id);
                    setItems(remainingItems);
                })
        }
    }

    return (
        <div className='container'>
            <h2 style={{ color: '#b98632' }} className='my-3'>My Items</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '200px' }}> Book Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className='d-none d-md-block'>Supplier</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {/* map on items  */}
                    {
                        items.map(item =>
                            <tr key={item._id}>
                                <td className='text-start'><img src={item.picture} alt="" style={{ width: '18px' }} /> {item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td className='d-none d-md-block' style={{ paddingBottom: '14px' }}>{item.supplierName}</td>
                                <td><button className='border-0 bg-danger px-3 py-1 text-white rounded' onClick={() => handleDeleteButton(item._id)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default MyItem;