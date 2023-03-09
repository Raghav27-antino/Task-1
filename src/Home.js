import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import {  signOut } from "firebase/auth";

const Home = () => {
  const [data, setData] = useState([]);
  const [index,setIndex] = useState(null);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/auth");
  }


  useEffect(() => {
    onAuthStateChanged(auth,(user) =>{
      if(!user){
        navigate('/auth');
      }
    })

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <div>
      <div className="d-flex justify-content-around m-3">
        <h1>Home Page</h1>
        <button type="button" className="btn btn-danger font-weight-bold" onClick={logout}>
          Logout
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((e, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={()=>setIndex(key)}
                    >
                      Description
                    </button>
                  </td>
                </tr>
              );
            })}
            <Modal index={index} data={data}/>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
