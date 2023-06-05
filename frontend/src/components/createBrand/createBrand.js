import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./createBrand.css";
import logo from "./logo.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function CreateBrand() {

    const navigate = useNavigate();
  const [brand, setBrand] = useState({
    name: "",
    logo: "",
    description: "",
    contact: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevState) => ({ ...prevState, [name]: value }));
  };

  const createBrand = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!brand.name || !brand.logo || !brand.description || !brand.contact) {
      alert("Please fill all the fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      try {
        const response = await axios.post(
          `http://localhost:3001/api/brand/createbrand`,
          brand,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        alert("Brand created successfully");
        navigate('/')
      } catch (error) {
        console.error("Error while creating brand: ", error);
      }
    } else {
      alert("Please authenticate.");
    }
  };


  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image5"></div>
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
                  <h3>Create Brand</h3>
                  <br></br>
                  <form>
                    <div className="form-group ">
                      <input
                        id="inputName"
                        type="text"
                        placeholder="Brand Name"
                        required
                        autoFocus
                        className="form-control"
                        value={brand.name}
                        onChange={handleChange}
                        name="name"
                      />
                      <br></br>
                    </div>
                    <div className="form-group ">
                      <input
                        id="inputLogo"
                        type="text"
                        placeholder="Brand Logo URL"
                        required
                        autoFocus
                        className="form-control"
                        value={brand.logo}
                        onChange={handleChange}
                        name="logo"
                      />
                      <br></br>
                    </div>
                    <div className="form-group ">
                      <input
                        id="inputDescription"
                        type="text"
                        placeholder="Brand Description"
                        required
                        autoFocus
                        className="form-control"
                        value={brand.description}
                        onChange={handleChange}
                        name="description"
                      />
                      <br></br>
                    </div>
                    <div className="form-group ">
                      <input
                        id="inputContact"
                        type="text"
                        placeholder="Brand Contact"
                        required
                        autoFocus
                        className="form-control"
                        value={brand.contact}
                        onChange={handleChange}
                        name="contact"
                      />
                      <br></br>
                    </div>
                    
                    
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-block text-uppercase mb-2  shadow-sm"
                      onClick={createBrand}
                    >
                      Create Brand
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

export default CreateBrand;
