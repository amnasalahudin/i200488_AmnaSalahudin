import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editProfile.css";
import logo from "./logo.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function EditProfile() {

    const navigate = useNavigate();
 
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
      });

      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          setUser(decodedToken);
        }
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
      };

      const editUser = async (e) => {
        e.preventDefault();
        if (!user.name || !user.email || !user.password) {
          alert("Please fill all the fields.");
          return;
        }
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          try {
            const response = await axios.patch(
              `http://localhost:3001/api/user/edit/${decodedToken._id}`,
              user,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            
            // Assuming that the response contains the updated JWT token
            if(response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
    
            alert("Profile updated successfully");
            navigate('/')
          } catch (error) {
            console.error("Error while updating profile: ", error);
          }
        } else {
          alert("Please authenticate.");
        }
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
                  <h3>Edit Profile</h3>
                  <br></br>
                  <form>
                  <div className="form-group ">
                      <input
                        id="userID"
                        type="text"
                        placeholder="ID"
                        required
                        autoFocus
                        className="form-control"
                        value={user._id}
                        onChange={handleChange}
                       readOnly
                      />
                      <br></br>
                    </div>
                  <div className="form-group ">
                      <input
                        id="inputName"
                        type="name"
                        placeholder="Name"
                        required
                        autoFocus
                        className="form-control"
                        value={user.name}
                        onChange={handleChange}
                        name="name"
                      />
                      <br></br>
                    </div>

                    <div className="form-group ">
                      <input
                        id="inputEmail"
                        type="email"
                        placeholder="Email address"
                        required
                        autoFocus
                        className="form-control"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                      />
                      <br></br>
                    </div>
                    <div className="form-group">
                      <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        required
                        className="form-control form-control-md"
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                      />
                      <br></br>
                    </div>
                    
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-block text-uppercase mb-2  shadow-sm"
                      onClick={editUser}
                    >
                     Update Profile
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

export default EditProfile;
