import Header from "./components/Header/Header";
import LastMovements from "./components/LastMovements/LastMovements";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import movementActions from "./redux/movementActions";
import Outcomes from "./components/Pages/OutComes/Outcomes";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Incomes from "./components/Pages/Incomes/Incomes";
import EditMovement from "./components/EditMovement/EditMovement";
import Login from "./components/Login";

function App() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getMovements();
  }, []);

  async function getMovements() {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api-piggy.vercel.app/movements`,
        headers: { Authorization: `Bearer ${store.user.token}` },
      });
      response.data && dispatch(movementActions.storeMovements(response.data));
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/outcomes" element={<Outcomes />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/edit/:id" element={<EditMovement />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="container">
        <cite title="container">
          {" "}
          <a
            className="pinter text-dark"
            rel="noreferrer"
            href="https://www.linkedin.com/in/marrero-pablo/"
            target="_blank"
          >
            {" "}
            by Pablo Marrero
          </a>
        </cite>
      </div>
    </div>
  );
}

export default App;
