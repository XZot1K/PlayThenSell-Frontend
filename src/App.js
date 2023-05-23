import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import api from "./api/axiosconfig";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar.js";
import Home from "./components/pages/Home.js";

import AddBatch from "./components/batches/AddBatch";

import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import Profile from "./components/users/Profile";
import ViewBatch from "./components/batches/ViewBatch";

import { getCurrentUser } from "./services/AuthService";

function App() {
  //const [batches, setBatches] = useState();

  //let currentUser = getCurrentUser();

  const updateUser = () => {
    currentUser = getCurrentUser();
  };

  const getBatches = async () => {
    try {
      const response = await api.get("/api/batches");

      console.log(response.data);

      setBatches(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //  updateUser();
    //  getBatches();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/create-batch' element={<AddBatch />} />
          <Route exact path='/batches/:id' element={<ViewBatch />} />
          <Route exact path='/adduser' element={<AddUser />} />
          <Route exact path='/edituser/:id' element={<EditUser />} />
          <Route exact path='/profile/:id' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
