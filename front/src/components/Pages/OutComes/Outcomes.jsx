import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../Header/Header";
import { format } from "date-fns";

function Outcomes() {
  const [outcomes, setOutcomes] = useState([]);
  useEffect(() => {
    getMovementsByQuery();
  }, []);

  async function getMovementsByQuery() {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3000/movementsbyquery?type=Egreso`,
      });
      response.data && setOutcomes(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <div>
      <Header />
      {outcomes && (
        <div className="container">
          {outcomes.map((movement, i) => (
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
                    <div className="ms-auto"></div>
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
        </div>
      )}{" "}
    </div>
  );
}

export default Outcomes;