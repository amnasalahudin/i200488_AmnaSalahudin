import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import './viewBrand.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img95 from './img95.jpg'
import logo from './logo.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

function ViewBrand() {
  const [brands, setBrands] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    name: "",
    logo: "",
    description: "",
    contact: ""
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const options = {
          headers: { Authorization: `Bearer ${token}` }
        };
        try {
          const response = await axios.get('http://localhost:3001/api/brand/viewbrand', options);
          setBrands(response.data);
        } catch (error) {
          console.error('Error while fetching brands: ', error);
        }
      } else {
        alert('Please authenticate.');
      }
    };

    fetchBrands();
  }, []);

  const styles = {
    cardImage: {
      objectFit: 'cover',
      height: '50px',
      width: '50px',
    },

    cardRow: {
        height: '80px', // Adjust this value
      },
      cardListGroup: {
        height: '100px', // Adjust this value
      },
      cardListGroup1: {
        height: '120px', // Adjust this value
      },
      cardButtons: {
        height: '130px', // Adjust this value
      }
  }

  const updatePost = (name,logo,description,contact) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        name: name,
        logo: logo,
        description: description,
        contact: contact
        
      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (

    
    
      <>
        <br></br>
        <br></br>
        <div className="d-flex justify-content-center align-items-center ">
      <div className="d-flex align-items-center mb-4">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="ml-2" >Global Marketplace</h1>
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
      <LinkContainer to="/logout">
        <Nav.Link>Sign out</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>


                  <br></br>

       
        <h1 className='title1'><b>My Brands</b></h1>
        
        
        <br></br>
        

        <img src={img95} alt="Logo" className='img95'  style={{border: 'none', borderStyle: 'none', borderWidth: 0}}/>

        
      
      
     <Main>
          {brands.map((brand) => (
           <Card key={brand._id} className="h-100 d-flex flex-column" style={{ width: '18rem' }}>
           <Card.Body style={styles.cardRow}>
             <Row>
               <Col xs={4}>
                 <img
                   style={styles.cardImage}
                   src={brand.logo}
                   alt={brand.name}
                 />
               </Col>
               <Col xs={8}>
                 <Card.Title><b>{brand.name}</b></Card.Title>
               </Col>
             </Row>
           </Card.Body>
           <ListGroup className="list-group-flush" >
             <ListGroup.Item style={styles.cardListGroup1}><b>Description:</b> <i>{brand.description}</i></ListGroup.Item>
             <ListGroup.Item style={styles.cardListGroup2}><b>Contact:</b> {brand.contact}</ListGroup.Item>
           </ListGroup>
           <Card.Body className="mt-auto" style={styles.cardButtons}>
             <div className="d-grid gap-2">
               <Button variant="outline-info" size="lg">Update</Button>
               <Button variant="outline-danger" size="lg">Delete</Button>
             </div>
           </Card.Body>
         </Card>
          ))}
      </Main></>
   
  );
}

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  grid-template-rows: minmax(300px, auto);  // add this line
  
  grid-auto-rows: 600px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 40px;
 
  @media only screen and (min-width: 1024px) and (max-width: 1680px) {
    margin-top: 50px;
   margin-left: 70px;
    padding: 10px 0px;
  }
`;

export default ViewBrand;
