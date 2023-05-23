import api from "../../api/axiosconfig";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentUser, authHeader } from "../../services/AuthService";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  console.info(`Looking for ` + id);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await api.get(`/api/users/${id}`, { headers: authHeader() }).catch((error) => {});
    setUser(result.data);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Profile</h2>

          <div className='card'>
            <div className='card-header'>
              <b>User ID: </b> {user.id}
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <b>Name: </b>
                  {user.name}
                </li>
                <li className='list-group-item'>
                  <b>UserName: </b>
                  {user.username}
                </li>
                <li className='list-group-item'>
                  <b>Email: </b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className='btn btn-primary my-2' to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
