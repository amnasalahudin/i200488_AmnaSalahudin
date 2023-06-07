import React from 'react';
import './App.css';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Homepage from './components/homepage/homepage';
import EditProfile from './components/editProfile/editProfile';
import CreateBrand from './components/createBrand/createBrand';
import ViewBrand from './components/viewBrand/viewBrand';
import AddProduct from './components/addProduct/addProduct';
import ViewProduct from './components/viewProduct/viewProduct';
import ViewOrder from './components/viewOrder/viewOrder';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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
        <Route path="brands/:brandId/add-product" element={<AddProduct />} />
        <Route path="/brands/:brandId/products" element={<ViewProduct />} />
        <Route path="/view-orders" element={<ViewOrder />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
