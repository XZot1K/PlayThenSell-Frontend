import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import api from "./api/axiosconfig";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./services/AuthService";
import Navbar from "./components/layout/NavBar.js";
import Home from "./components/pages/Home.js";

import AddBatch from "./components/batches/AddBatch";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import Profile from "./components/users/Profile";
import ViewBatch from "./components/batches/ViewBatch";
import AddItem from "./components/items/AddItem";

function App() {
  const [user, setUser] = useState();

  const updateUser = () => {
    setUser(getCurrentUser());
  };

  useEffect(() => {
    updateUser();
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
          <Route exact path='/additem' element={<AddItem />} />
          <Route exact path='/adduser' element={<AddUser />} />
          <Route exact path='/edituser/:id' element={<EditUser />} />
          <Route exact path='/profile/:id' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
