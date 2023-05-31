import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown, Form, Button } from "react-bootstrap";
import { login, register, logout, getCurrentUser } from "../../services/AuthService";

export default function Navbar() {
  const [user, setUser] = useState({
    input: {},
    errors: {},
  });

  let currentUser = getCurrentUser();

  const updateUser = () => {
    currentUser = getCurrentUser();
  };

  const onInputChange = (e) => {
    user.input[e.target.name] = e.target.value;
  };

  const logOut = () => {
    logout();
    currentUser = undefined;
  };

  const [regState, setRegState] = useState({
    message: "",
    successful: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    login(user.input["username"], user.input["email"], user.input["password"])
      .then((response) => {
        updateUser();
        setRegState({ message: response.data.message, successful: true });
        // const [_, forceUpdate] = useReducer((x) => x + 1, 0); // Force update
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response && error.response.message) || error.message || error.toString();
        setRegState({ message: resMessage, successful: false });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    register(user.input["username"], user.input["email"], user.input["password"], user.input["confirm-password"])
      .then((response) => {
        updateUser();
        setRegState({ message: response.data.message, successful: true });

        handleLogin();

        const [_, forceUpdate] = useReducer((x) => x + 1, 0); // Force update
      })
      .catch((error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setRegState({ message: resMessage, successful: false });
      });
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container-fluid'>
          <div className='productsContainer'>
            <img src={process.env.PUBLIC_URL + "/icon-128dp.png"} alt='logo' />
            <Link className='navbar-brand' to='/'>
              {" "}
              PlayThenSell{" "}
            </Link>
          </div>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={"/profile/" + currentUser.id} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav action-buttons ml-auto'>
              <Dropdown style={{ marginRight: "10px" }}>
                <Dropdown.Toggle variant='primary' id='accountDropdown'>
                  {" "}
                  Login{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu className='form'>
                  <Form>
                    <Form.Group controlId='formUsername'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type='text' name='username' required onChange={(e) => onInputChange(e)} />
                    </Form.Group>
                    <Form.Group controlId='formPassword' className='mt-2'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' name='password' required onChange={(e) => onInputChange(e)} />
                    </Form.Group>

                    <div className='mt-2 d-flex justify-content-center'>
                      <Button variant='primary' type='submit' onClick={handleLogin}>
                        {" "}
                        Login{" "}
                      </Button>
                    </div>

                    <div className='mt-2'>
                      {regState.message && (
                        <div className='form-group'>
                          <div
                            className={regState.successful ? "alert alert-success" : "alert alert-danger"}
                            role='alert'>
                            {regState.message}
                          </div>
                        </div>
                      )}
                    </div>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className='ml-10'>
                <Dropdown.Toggle variant='primary' id='registerDropdown'>
                  {" "}
                  Get Started{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu className='form'>
                  <Form>
                    <Form.Group controlId='formUsername'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type='username' required name='username' onChange={(e) => onInputChange(e)} />
                    </Form.Group>
                    <Form.Group controlId='formEmail' className='mt-2'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' required name='email' onChange={(e) => onInputChange(e)} />
                    </Form.Group>
                    <Form.Group controlId='formPassword' className='mt-2'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' required name='password' onChange={(e) => onInputChange(e)} />
                    </Form.Group>
                    <Form.Group controlId='formConfirmPassword' className='mt-2'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type='password'
                        required
                        name='confirm-password'
                        onChange={(e) => onInputChange(e)}
                      />
                    </Form.Group>

                    <div className='mt-2 d-flex justify-content-center'>
                      <Button type='submit' className='btn btn-outline-primary' onClick={handleRegister}>
                        {" "}
                        Register{" "}
                      </Button>
                    </div>

                    <div className='mt-2'>
                      {regState.message && (
                        <div className='form-group'>
                          <div
                            className={regState.successful ? "alert alert-success" : "alert alert-danger"}
                            role='alert'>
                            {regState.message}
                          </div>
                        </div>
                      )}
                    </div>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
