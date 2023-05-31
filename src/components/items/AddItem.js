import React, { useEffect, useState } from "react";
import api from "../../api/axiosconfig";
import { FaTrash } from "react-icons/fa";
import { getCurrentUser, authHeader } from "../../services/AuthService";
import { Stack, Form, Button, InputGroup, Dropdown, Row, Col, ListGroup, Alert } from "react-bootstrap";

export default function AddItem() {
  const [validated, setValidated] = useState(false);
  const [upcError, setUPCError] = useState({ added: false, message: "" });
  const [upcField, setUPCField] = useState("");
  const [itemCreateResponse, setItemCreateResponse] = useState({});
  const [item, setItem] = useState({
    name: "",
    sku: "",
    asin: "",
    upcs: [],
    iwlbs: 0,
    iwoz: 0,
    swlbs: 0,
    swoz: 0,
  });

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value.replace(/[$,]/g, "") });
  };

  const addUPC = (e) => {
    if (upcField.length == 0) {
      const error = { ...upcError };
      error.added = true;
      error.message = "The UPC must be specified.";
      setUPCError(error);
      return;
    }

    if (!/^\d{12}$/.test(upcField)) {
      const error = { ...upcError };
      error.added = true;
      error.message = "The entry specified is not a valid UPC.";
      setUPCError(error);
      return;
    }

    if (item.upcs.includes(upcField)) {
      const error = { ...upcError };
      error.added = true;
      error.message = "The UPC is already associated to this item.";
      setUPCError(error);
      return;
    }

    const currentItem = { ...item };
    currentItem.upcs.push(upcField);
    setItem(currentItem);
    setUPCField("");
    setUPCError({ added: false, message: "" });
  };

  const removeUPC = (indexToRemove) => {
    const currentItem = { ...item };
    currentItem.upcs.splice(indexToRemove, 1);
    setItem(currentItem);
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated(true);

    api.post("/api/items/new", item, { headers: authHeader() }).catch((error) => {
      console.log(error);
    });

    // navigate("/");
  };

  return (
    <div className='row'>
      <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <h2 className='text-center m-4'>New Item</h2>

        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Row>
            <Col sm={7}>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' name='name' required onChange={(e) => onInputChange(e)} />
                <Form.Control.Feedback type='invalid'>
                  Please provide a name less than or equal to 80 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <Row className='mt-2'>
                <Form.Label>Item Weight</Form.Label>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='iwlbs' placeholder='0' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>lbs</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='iwoz' placeholder='0' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>oz</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Form.Label>Shipping Weight</Form.Label>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='swlbs' placeholder='0' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>lbs</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='swoz' placeholder='4' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>oz</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Form.Label>Item Dimensions</Form.Label>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='idl' placeholder='7.48' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>L</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='idw' placeholder='0.591' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>W</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='idh' placeholder='5.315' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>H</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Form.Label>Package Dimensions</Form.Label>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='pdl' placeholder='8' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>L</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='pdw' placeholder='2' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>W</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <Form.Control id='pdh' placeholder='6' onChange={(e) => onInputChange(e)} />
                    <InputGroup.Text>G</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <Stack gap={4}>
                <Row>
                  <Form.Label style={{ textAlign: "left" }}>Selling Price</Form.Label>
                  <InputGroup className='mt-6' style={{ width: "155px" }}>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      id='price'
                      placeholder='4.00'
                      required
                      onChange={(e) => onInputChange(e)}
                      style={{ textAlign: "center" }}
                    />
                  </InputGroup>
                  <InputGroup className='mt-6' style={{ width: "155px" }}>
                    <InputGroup.Text>Qty</InputGroup.Text>
                    <Form.Control
                      id='quantity'
                      placeholder='0'
                      onChange={(e) => onInputChange(e)}
                      style={{ textAlign: "center" }}
                    />
                  </InputGroup>
                </Row>

                <div>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>SKU</InputGroup.Text>
                    <Form.Control id='sku' required onChange={(e) => onInputChange(e)} />
                  </InputGroup>

                  <InputGroup className='mb-2'>
                    <InputGroup.Text>ASIN</InputGroup.Text>
                    <Form.Control id='asin' onChange={(e) => onInputChange(e)} />
                  </InputGroup>

                  <Row>
                    <Form.Label>Add UPC</Form.Label>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text>UPC</InputGroup.Text>
                      <Form.Control
                        id='upc'
                        value={upcField}
                        onChange={(e) => setUPCField(e.target.value.trim().toUpperCase())}
                      />
                      <Button onClick={(e) => addUPC(e)}>Add</Button>
                    </InputGroup>

                    {item.upcs.length > 0 ? (
                      <ListGroup>
                        <ListGroup.Item variant='primary'>UPCs</ListGroup.Item>
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          {item.upcs.map((upc, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col xs={10}>{upc}</Col>
                                <Col xs={2}>
                                  <Button className='end-0' variant='danger' size='sm' onClick={() => removeUPC(index)}>
                                    <FaTrash />
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </div>
                      </ListGroup>
                    ) : null}
                    {upcError.added && !upcError.message.length == 0 ? (
                      <Alert key='error' variant='danger'>
                        {upcError.message}
                      </Alert>
                    ) : null}
                  </Row>
                </div>
              </Stack>
            </Col>
          </Row>

          <div className='mt-4 d-flex justify-content-center'>
            <Button variant='primary' type='submit'>
              {" "}
              Create{" "}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
