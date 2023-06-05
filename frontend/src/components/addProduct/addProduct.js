import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./addProduct.css";
import logo from "./logo.png";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useParams, useNavigate } from 'react-router-dom';

function AddProduct() {

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const { brandId } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const createProduct = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const options = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            try {
                await axios.post(`http://localhost:3001/api/product/brands/${brandId}/products`, product, options);
                navigate('/view-brand');
            } catch (error) {
                console.error('Error while creating product: ', error);
            }
        } else {
            alert('Please authenticate.');
        }
    };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image8"></div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <div className="d-flex align-items-center mb-4">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="ml-2">Global Marketplace</h1>
                  </div>
                  <br></br>
                  <h3>Add Product</h3>
                  <br></br>
                  <form>
            <div className="form-group ">
                <input
                    id="inputName"
                    type="text"
                    placeholder="Product Name"
                    required
                    autoFocus
                    className="form-control"
                    value={product.name}
                    onChange={handleChange}
                    name="name"
                />
                <br></br>
            </div>
            <div className="form-group ">
                <input
                    id="inputDescription"
                    type="text"
                    placeholder="Product Description"
                    required
                    autoFocus
                    className="form-control"
                    value={product.description}
                    onChange={handleChange}
                    name="description"
                />
                <br></br>
            </div>
            <div className="form-group ">
                <input
                    id="inputPrice"
                    type="text"
                    placeholder="Product Price"
                    required
                    autoFocus
                    className="form-control"
                    value={product.price}
                    onChange={handleChange}
                    name="price"
                />
                <br></br>
            </div>
            <div className="form-group ">
                <input
                    id="inputImageUrl"
                    type="text"
                    placeholder="Product Image URL"
                    required
                    autoFocus
                    className="form-control"
                    value={product.imageUrl}
                    onChange={handleChange}
                    name="imageUrl"
                />
                <br></br>
            </div>
            <button
                type="button"
                className="btn btn-dark btn-block text-uppercase mb-2  shadow-sm"
                onClick={createProduct}
            >
                Add Product
            </button>
        </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
