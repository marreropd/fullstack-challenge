import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import movementActions from "../../redux/movementActions";
import AddMovement from "../AddMovement/AddMovement";
import ActionBotton from "../ActionBotton/ActionBotton";
import Header from "../Header/Header";
import Login from "../Login";
import { format } from "date-fns";
import styles from "./LastMovements.css";

function LastMovements() {
  const store = useSelector((state) => state);
  const movements = store.movements;

  //modal states
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getMovements();
  }, []);

  //fetchs
  async function getMovements() {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api-piggy.vercel.app/movements`,
        headers: { Authorization: `Bearer ${store.user.token}` },
      });
      (await response.data) &&
        dispatch(movementActions.storeMovements(response.data));
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  //handlers
  const handleClose = () => setShow(false);

  const handleRemove = async (movement) => {
    console.log(movement);
    try {
      const response = await axios({
        method: "DELETE",
        url: `https://api-piggy.vercel.app/movements/${movement.id}`,
        headers: { Authorization: `Bearer ${store.user.token}` },
      });
      dispatch(movementActions.remove(movement));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Header />
      {store.user ? (
        movements && (
          <div className="container">
            {movements.map((movement, i) => (
              <div key={i + Math.random}>
                <div
                  className={
                    movement.type === "Ingreso"
                      ? "shadow income p-3 my-1"
                      : "shadow outcome p-3 my-1"
                  }
                >
                  <div className="d-flex align-items-center">
                    {movement.type === "Ingreso" ? (
                      <i className="bi bi-plus-circle-fill mx-3 fs-3"></i>
                    ) : (
                      <i className="bi bi-dash-circle-fill mx-3 fs-3"></i>
                    )}
                    <div className="d-flex flex-column">
                      <span className="h3 mb-0">${movement.amount} </span>
                      <span className="h5 mb-0">{movement.description}</span>
                      <span className="fs-6">
                        Categoria: {movement.category}{" "}
                      </span>
                    </div>

                    <span className="date ms-auto align-self-end">
                      <Link
                        to={`/edit/${movement.id}`}
                        className="text-dark me-2"
                      >
                        <i className="bi bi-pencil-square fs-3 pointer"></i>
                      </Link>
                      <Link
                        to={"/"}
                        className="text-dark me-2"
                        onClick={() => handleRemove(movement)}
                      >
                        {" "}
                        <i className="bi bi-file-x fs-3 pointer"></i>
                      </Link>
                      {format(
                        new Date(movement.createdAt),
                        "yyyy/MM/dd kk:mm:ss"
                      )}
                      <span className="h6 ms-3">{movement.id} </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div show={modalShow} onClick={() => setModalShow(true)}>
              <ActionBotton />
            </div>

            <AddMovement show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        )
      ) : (
        <Login />
      )}
    </>
  );
}

export default LastMovements;
