import React, { useEffect, useState } from "react";
import api from "../../api/axiosconfig";
import { Link, useParams } from "react-router-dom";
import { getCurrentUser, authHeader } from "../../services/AuthService";

export default function Home() {
  let user = undefined;
  const [batches, setBatches] = useState([]);

  const { id } = useParams();

  {
    /*const ebay = async () => {
    const ebayRes = await api
      .get("/api/ebay/get", {
        params: {
          id: "254188828753",
        },
        headers: authHeader(),
      })
      .catch((error) => {});
    console.log(ebayRes);
  };
ebay();*/
  }

  const updateUser = () => {
    user = getCurrentUser();
  };

  useEffect(() => {
    updateUser();
    loadBatches();
  }, []);

  const loadBatches = async () => {
    console.log(user);
    if (user) {
      const result = await api.get("/api/batches", { headers: authHeader() }).catch((error) => {
        //  console.log(error.message);
      });

      if (result) setBatches(result.data);
    }
  };

  const deleteBatch = async (id) => {
    await api.delete(`/api/batches/${id}`, { headers: authHeader() }).catch((error) => {});
    loadBatches();
  };

  return (
    <div className='container'>
      <div className='py-2' style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link className='btn btn-primary' to='/create-batch'>
          {" "}
          Create Batch{" "}
        </Link>
      </div>

      <div className='py-0'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Creator</th>
              <th scope='col'>Active | In-Active | Unlisted</th>
              <th scope='col'>Is Ready</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, index) => (
              <tr key={batch.id}>
                <th scope='row'>{batch.id}</th>
                <td>{batch.name}</td>
                <th />
                <td>
                  {batch.active} | {batch.inactive} | {batch.unlisted}
                </td>
                <td>{batch.ready}</td>
                <td>
                  <Link className='btn btn-primary mx-2' to={`/batches/${batch.id}`}>
                    {" "}
                    View{" "}
                  </Link>
                  <Link className='btn btn-outline-primary mx-2' to={`/batches/edit/${batch.id}`}>
                    {" "}
                    Edit{" "}
                  </Link>
                  <button className='btn btn-danger mx-2' onClick={() => deleteBatch(batch.id)}>
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
  );
}
