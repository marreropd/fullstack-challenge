import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector, connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import movementActions from "../../redux/movementActions";
import styles from "./AddMovement.css";

function AddMovement(props) {
  const store = useSelector((state) => state);
  const [modalShow, setModalShow] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    type: "",
    amount: 0,
    decription: "",
    category: "Otros",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "https://api-piggy.vercel.app/movements",
        data: data,
        headers: { Authorization: `Bearer ${store.user.token}` },
      });
      (await response.data) && dispatch(movementActions.create(response.data));
    } catch (error) {
      console.log("Error: ", error);
    }
    navigate("/");
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Nuevo Movimiento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="select" className="form-label">
                Tipo de Movimiento
              </label>
              <select
                id="select"
                className="form-select"
                aria-label="Default select example"
                name="type"
                onChange={handleInputChange}
              >
                <option value="" defaultChecked>
                  Seleccionar
                </option>
                <option value="Ingreso">Ingreso</option>
                <option value="Egreso">Egreso</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción del Movimiento
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Concepto/Categoria del Movimiento
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                defaultValue={"Otros"}
                name="category"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Monto en $
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                onChange={handleInputChange}
              />
            </div>
            <button className="btn button-submit  my-3" type="submit">
              Submit
            </button>
          </form>

          <div>
            <div className="shadow p-3  rounded">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <span className="h3 mb-0">${data.amount} </span>
                  <span className="">{data.description}</span>
                </div>
                <div className="ms-auto px-5">{data.type}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default connect(null, { movementActions })(AddMovement);
