import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import styled from "styled-components";
import "./viewOrder.css";
import img94 from "./img94.jpg";
import logo from "./logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function ViewOrder() {

    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(0); // new state for order count
    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSmsModal, setShowSmsModal] = useState(false);
    const [smsRecipient, setSmsRecipient] = useState('');
    const [smsMessage, setSmsMessage] = useState('');




    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const options = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                try {
                    const response = await axios.get('http://localhost:3001/api/order/orders/seller', options);
                    setOrders(response.data);
                    // filter the delivered orders and count the rest
                    const nonDeliveredCount = response.data.filter(order => order.status !== 'delivered').length;
                    setOrderCount(nonDeliveredCount);
                } catch (error) {
                    console.error('Error while fetching orders: ', error);
                }
            } else {
                alert('Please authenticate.');
            }
        };

        fetchOrders();
    }, []);

    const handleOpenSmsModal = (order) => {
      setSmsRecipient(order.contact);
      setSmsMessage(`Your order has been ${order.status}`);
      setShowSmsModal(true);
  };

   
   const handleCloseSmsModal = () => {
    setSmsRecipient('');
    setSmsMessage('');
    setShowSmsModal(false);
};

 
 const handleSendSms = async () => {
  const token = localStorage.getItem('token');
  const options = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
      await axios.post(
          'http://localhost:3001/api/twilio/send-sms',
          { to: smsRecipient, message: smsMessage },
          options
      );
      alert('Message has been sent.'); 
      handleCloseSmsModal();
  } catch (error) {
      console.error('Error sending SMS: ', error);
  }
};


    const handleOpenModal = (order) => {
      setOrderToUpdate(order);
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setOrderToUpdate(null);
      setNewStatus('');
      setShowModal(false);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const options = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.patch(
            `http://localhost:3001/api/order/orders/${orderToUpdate._id}`,
            { status: newStatus },
            options
        );
        // Update the orders state with the new order status
        setOrders(orders.map(order =>
            order._id === orderToUpdate._id ? response.data : order
        ));
        alert('Status has been updated!'); 
        handleCloseModal();
        window.location.reload();
    } catch (error) {
        console.error('Error updating order: ', error);
    }
};

const signOut = () => {
  localStorage.clear();
  navigate("/login");
};
 
    const NotificationBadge = styled.span`
        background-color: #ff0000;
        color: #fff;
        border-radius: 4px;
        padding: 5px 11px;
        font-size: 20px;
        margin-left: 80px;
    `;


  const styles = {
    cardImage: {
      objectFit: "cover",
      height: "50px",
      width: "50px",
    },

    bannerImage: {
      width: "100%",
      height: "300px",
      objectFit: "cover",
    },

    cardRow: {
      height: "80px", // Adjust this value
    },
    cardListGroup: {
      height: "100px", // Adjust this value
    },
    cardListGroup1: {
      height: "120px", // Adjust this value
    },
    cardButtons: {
      height: "220px", // Adjust this value
    },
  };

  

  return (
    <>

      <br></br>
      <br></br>
      <div className="d-flex justify-content-center align-items-center ">
        <div className="d-flex align-items-center mb-4">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="ml-2">Global Marketplace</h1>
        </div>
      </div>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center w-100">
            <LinkContainer to="/">
              <Navbar.Brand>Home</Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/view-brand">
              <Nav.Link>View Brand</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/create-brand">
              <Nav.Link>Create Brand</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/view-orders">
              <Nav.Link>Orders</Nav.Link>
            </LinkContainer>
            <LinkContainer onClick={signOut} to="/login">
              <Nav.Link>Sign out</Nav.Link>
            </LinkContainer>
            {orderCount > 0 && <NotificationBadge> <FontAwesomeIcon icon={faBell} />
      <span>{orderCount}</span></NotificationBadge>} 
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <br></br>

      <h1 className="title1">
        <b>Orders</b>
      </h1>

      <br></br>

      <img src={img94} alt="Banner" style={styles.bannerImage} />

      <br></br>
      <br></br>
      <br></br>

      <Table  hover >
      <thead className="dark-header">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Contact</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Action</th>
            <th>Send SMS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.product}</td>
              <td>{order.customer}</td>
              <td>{order.contact}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
             <td><Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(order)}>Update</Button></td>
             <td><Button variant="outline-dark" size="sm" onClick={() => handleOpenSmsModal(order)}>Send</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                                <option value="">Select status...</option>
                                <option value="placed">Placed</option>
                                <option value="processed">Processed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            
     
        <Modal show={showSmsModal} onHide={handleCloseSmsModal}>
            <Modal.Header closeButton>
                <Modal.Title>Send SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="recipient">
                        <Form.Label>Recipient</Form.Label>
                        <Form.Control type="text" placeholder="Recipient's phone number" value={smsRecipient} onChange={e => setSmsRecipient(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} value={smsMessage} onChange={e => setSmsMessage(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSmsModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSendSms}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ViewOrder;
