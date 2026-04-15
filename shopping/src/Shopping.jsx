import React from 'react';
import data from './database.json';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Shopping = () => {
    var {products} = data;
    var {orders} = data;
  return (
    <div className='container'>
      <h1>Shopping System</h1>
      <div>
    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
      </div>
    </div>
  )
}



export default Shopping
