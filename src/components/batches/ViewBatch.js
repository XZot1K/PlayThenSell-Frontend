import "./Batches.css";
import api from "../../api/axiosconfig";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentUser, authHeader } from "../../services/AuthService";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

export default function ViewBatch() {
  const [batch, setBatch] = useState({
    name: "",
  });

  const { id } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadBatch();
  }, []);

  const loadBatch = async () => {
    const result = await api.get(`/api/batches/${id}`, { headers: authHeader() }).catch((error) => {});
    setBatch(result.data);

    const itemResult = await api.get(`/api/batches/${id}/items`, { headers: authHeader() }).catch((error) => {});
    setItems(itemResult.data);
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
      <div className='py-2' style={{ display: "flex", justifyContent: "flex-start" }}>
        <div className='py-1'>
          <div className='card' style={{ width: "35rem" }}>
            <h5 className='card-title'>Add New Item</h5>

            <div className='card-body'>
              <Form.Label htmlFor='conditionInput' style={{ display: "flex", justifyContent: "flex-start" }}>
                Item ID or Name:
              </Form.Label>
              <div style={{ display: "flex", flexDirection: "row" }}>
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
              </div>

              <Form.Label htmlFor='itemIdInput' style={{ display: "flex", justifyContent: "flex-start" }}>
                Item ID or Name:
              </Form.Label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Form.Control
                  id='disabledTextInput'
                  placeholder='Scan ASIN, UPC, Ebay Item ID, or type the name of the item'
                  style={{ display: "flex", justifyContent: "flex-start" }}
                />

                <button
                  className='btn btn-primary mx-2'
                  style={{ width: "4rem", height: "2.3rem" }}
                  onClick={() => deleteItem(item.id)}>
                  {" "}
                  Add{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-2' style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link className='btn btn-primary' to='/additem'>
          {" "}
          Add Item Manually{" "}
        </Link>
      </div>

      <div className='py-0'>
        <div className='table-responsive'>
          <table className='table border shadow'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>SKU</th>
                <th scope='col'>Name</th>
                <th scope='col'></th>
                <th scope='col'>State</th>
                <th scope='col'></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <th />
                  <th scope='row'>{item.sku}</th>
                  <td>{item.name}</td>
                  <th />
                  <td></td>
                  <td></td>
                  <td>
                    <Link className='btn btn-outline-primary mx-2' to={`/batches/items/${item.id}`}>
                      {" "}
                      Edit{" "}
                    </Link>
                    <button className='btn btn-danger mx-2' onClick={() => deleteItem(item.id)}>
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
