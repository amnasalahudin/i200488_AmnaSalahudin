import React from 'react';
import './App.css';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Homepage from './components/homepage/homepage';
import EditProfile from './components/editProfile/editProfile';
import CreateBrand from './components/createBrand/createBrand';
import ViewBrand from './components/viewBrand/viewBrand';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create-brand" element={<CreateBrand />} />
        <Route path="/view-brand" element={<ViewBrand />} />
      </Routes>
    </Router>
  );
}

export default App;
