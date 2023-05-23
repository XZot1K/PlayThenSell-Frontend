import api from "../../api/axiosconfig";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, authHeader } from "../../services/AuthService";

import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Dropdown from "react-bootstrap/Dropdown";

export default function AddBatch() {
  let navigate = useNavigate();

  const [batch, setBatch] = useState({
    name: "",
    condition: "",
  });

  const { name } = batch;

  const onInputChange = (e) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    batch.condition = selectedCondition.value;

    await api.post("/api/batches/new", batch, { headers: authHeader() }).catch((error) => {
      console.log(error);
    });

    navigate("/");
  };

  const conditions = [
    { value: "new", label: "New" },
    { value: "very-good", label: "Very Good" },
    { value: "good", label: "Good" },
    { value: "acceptable", label: "Acceptable" },
  ];

  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);
  const handleSelect = (condition) => {
    setSelectedCondition(condition);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>New Batch</h2>

          <Form>
            <Row noGutters>
              <Col>
                <Form.Label htmlFor='conditionInput'>Condition</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant='success' id='conditionDropdown'>
                    {" "}
                    {selectedCondition.label}{" "}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {conditions.map((condition) => (
                      <div key={condition.value}>
                        <Dropdown.Item as='button'>
                          <div onClick={() => handleSelect(condition)}> {condition.label} </div>
                        </Dropdown.Item>
                      </div>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col>
                <Form.Group controlId='formName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' name='name' required onChange={(e) => onInputChange(e)} />
                </Form.Group>
              </Col>
            </Row>

            <div className='mt-4 d-flex justify-content-center'>
              <Button variant='primary' type='create' onClick={onSubmit}>
                {" "}
                Create{" "}
              </Button>
            </div>

            {/*<div className="mt-2">
              {regState.message && (
                <div className="form-group">
                  <div
                    className={
                      regState.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {regState.message}
                  </div>
                </div>
                  )}
                  </div>*/}
          </Form>
        </div>
      </div>
    </div>
  );
}
