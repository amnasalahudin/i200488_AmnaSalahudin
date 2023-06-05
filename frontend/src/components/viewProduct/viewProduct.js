import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import "./viewProduct.css";
import img96 from "./img96.jpg";
import logo from "./logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function ViewProduct() {
  const navigate = useNavigate();
  const { brandId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [updatedProductId, setUpdatedProductId] = useState(null);
  // Create a filtered list of products
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (event) => {  // New handler for the search input
    setSearchTerm(event.target.value);
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProduct = (id, name, description, price, imageUrl) => {
    setUpdatedProductId(id);
    setUpdatedProduct({
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
    });
    handleShow();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const options = {
          headers: { Authorization: `Bearer ${token}` },
        };
        try {
          const response = await axios.get(
            `http://localhost:3001/api/product/brands/${brandId}/products`,
            options
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error while fetching products: ", error);
        }
      } else {
        alert("Please authenticate.");
      }
    };

    fetchProducts();
  }, [brandId]);

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        await axios.delete(`http://localhost:3001/api/product/delete/${productId}`, options);
        // refresh products list
        const response = await axios.get(
          `http://localhost:3001/api/product/brands/${brandId}/products`,
          options
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error while deleting product: ", error);
      }
    } else {
      alert("Please authenticate.");
    }
  };

  const saveUpdatedProduct = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      try {
        await axios.patch(
          `http://localhost:3001/api/product/${updatedProductId}`,
          updatedProduct,
          options
        );
        handleClose();
        // refresh products list
        const response = await axios.get(
          `http://localhost:3001/api/product/brands/${brandId}/products`,
          options
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error while updating product: ", error);
      }
    } else {
      alert("Please authenticate.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const styles = {
    cardImage: {
      objectFit: "cover",
      height: "250px",
    },

    bannerImage: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
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
            <LinkContainer to="/logout">
              <Nav.Link>Sign out</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <br></br>

      <h1 className="title1">
        <b>Products</b>
      </h1>

      <br></br>

      <img src={img96} alt="Banner" style={styles.bannerImage} />

      <br></br>
      <br></br>
      
      <Form.Control
  type="search"
  placeholder="Search for a product ..."
  value={searchTerm}
  size="lg"
  onChange={handleSearchChange}
  style={{ width: '25%',  margin: 'auto', marginBottom: '1rem' }} // Added styles
/>



      <Main>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Name"
            name="name"
            value={updatedProduct.name ? updatedProduct.name : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />

          <Form.Control
            placeholder="Description"
            name="description"
            value={updatedProduct.description? updatedProduct.description : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />

          <Form.Control
            placeholder="Price"
            name="price"
            value={updatedProduct.price? updatedProduct.price : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="Image URL"
            name="imageUrl"
            value={updatedProduct.imageUrl ? updatedProduct.imageUrl : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        {filteredProducts.map((product) => (
          <Card key={product._id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={product.imageUrl}
              style={styles.cardImage}
            />
            <Card.Body>
              <b>
                {" "}
                <Card.Title>{product.name}</Card.Title>
              </b>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item style={styles.cardListGroup1}>
                <b>Description:</b> <i>{product.description}</i>
              </ListGroup.Item>
              <ListGroup.Item style={styles.cardListGroup2}>
                <b>Price:</b> Rs. {product.price}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-info" onClick={() => updateProduct(product._id, product.name, product.description, product.price, product.imageUrl)}>Update</Button>
                <Button variant="outline-danger" onClick={() => deleteProduct(product._id)}>Delete</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Main>
    </>
  );
}

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  grid-template-rows: minmax(300px, auto); // add this line

  grid-auto-rows: 600px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 40px;

  @media only screen and (min-width: 1024px) and (max-width: 1680px) {
    margin-top: 50px;
    margin-left: 70px;
    padding: 10px 0px;
  }
`;

export default ViewProduct;
