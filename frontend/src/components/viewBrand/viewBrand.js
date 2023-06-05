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
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

function ViewBrand() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState([]);
  const [updatedPostId, setUpdatedPostId] = useState(null);
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

  const filteredBrands = brands.filter((brand) => 
  brand.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  const styles = {
    cardImage: {
      objectFit: 'cover',
      height: '50px',
      width: '50px',
    },

    bannerImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover'
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
        height: '220px', // Adjust this value
      }
  }

  const addProduct = (brandId) => {
    // Navigate to add product page with brand id
    navigate(`/brands/${brandId}/add-product`);
  };

  const updatePost = (id, name, logo, description, contact) => {
    setUpdatedPostId(id);
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

  const deleteBrand = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      try {
        await axios.delete(`http://localhost:3001/api/brand/deleteBrand/${id}`, options);
        // refresh brands list
        const response = await axios.get('http://localhost:3001/api/brand/viewbrand', options);
        setBrands(response.data);
      } catch (error) {
        console.error('Error while deleting brand: ', error);
      }
    } else {
      alert('Please authenticate.');
    }
  };
  
  
  const saveUpdatedPost = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      try {
        await axios.patch(`http://localhost:3001/api/brand/editBrand/${updatedPostId}`, updatedPost, options);
        handleClose();
        // refresh brands list
        const response = await axios.get('http://localhost:3001/api/brand/viewbrand', options);
        setBrands(response.data);
      } catch (error) {
        console.error('Error while updating brand: ', error);
      }
    } else {
      alert('Please authenticate.');
    }
  };
  
  const viewProducts = (brandId) => {
    // Navigate to view products page with brand id
    navigate(`/brands/${brandId}/products`);
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
        

        <img src={img95} alt="Banner" style={styles.bannerImage} />

        <br></br>
        <br></br>

        <Form.Control
    type="search"
    style={{ width: '25%',  margin: 'auto', marginBottom: '1rem' }}
    size="lg"
    placeholder="Search for a brand..."
    onChange={(e) => setSearchTerm(e.target.value)
    }
  />
      
      
     <Main>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form.Control
            placeholder="Name"
            name="name"
            value={updatedPost.name ? updatedPost.name : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />

        <Form.Control
            placeholder="Logo"
            name="logo"
            value={updatedPost.logo? updatedPost.logo : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
           <Form.Control
            placeholder="Description"
            name="description"
            value={updatedPost.description? updatedPost.description : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />

            <Form.Control
            placeholder="Contact"
            name="contact"
            value={updatedPost.contact? updatedPost.contact : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          {filteredBrands.map((brand) => (
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
             <Button variant="outline-info"  onClick={() => updatePost(brand._id, brand.name, brand.logo, brand.description, brand.contact)}>Update</Button>
             <Button variant="outline-success"  onClick={() => addProduct(brand._id)}>Add Product</Button>
             <Button variant="outline-dark" onClick={() => viewProducts(brand._id)}>View Products</Button>
             <Button variant="outline-danger"  onClick={() => deleteBrand(brand._id)}>Delete</Button>
           
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
