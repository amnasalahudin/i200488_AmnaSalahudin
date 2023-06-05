import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import logo from "./logo.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, [navigate]);

  

  const signOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image3"></div>
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
                  <h3>Homepage</h3>
                  <br></br>
                  <div>
                    {user && (
                      <div>
                        <p><b>Welcome, {user.name}!</b></p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                      </div>
                    )}
                    <button type="button" className="btn btn-outline-dark btn-block" onClick={goToEditProfile} >
                     Edit Profile
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-block"  onClick={() => navigate("/create-brand")} >
                     Create Brand
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-block" onClick={() => navigate("/view-brand")} >
                     View Brands
                    </button>
                    <button type="button" className="btn btn-dark btn-block" onClick={signOut}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
