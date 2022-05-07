import React from 'react';
import { Table } from 'react-bootstrap';
import useAllItems from '../hooks/useAllItems';

const ManageInventories = () => {
    const {items, setItems} = useAllItems();
    // console.log(items);

    const handleDeleteButton = id => {
        const proceed = window.confirm('Are you sure you want to delete the item?');
        if (proceed) {
            const url =`http://localhost:5000/items/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                const remainingItems = items.filter(item=>item._id !== id);
                setItems(remainingItems);
            })
        }
    }
    return (
        <div className='container'>
            <h2 className='my-3'>Manage Inventories</h2>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th style={{width:'200px'}}> Book Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th className='d-none d-md-block'>Supplier</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
        items.map(item=><>
        <tr>
      <td className='text-start'><img src={item.picture} alt="" style={{width:'18px'}}/> {item.name}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td className='d-none d-md-block' style={{paddingBottom:'14px'}}>{item.supplierName}</td>
      <td><button onClick={()=>handleDeleteButton(item._id)}>Delete</button></td>
    </tr>
        </>)
    }
  </tbody>
</Table>
        </div>
    );
};

export default ManageInventories;