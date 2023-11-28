import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/revisaryenviar"; // Ajusta la ruta según tu estructura de archivos
import "../styles/VistaEnviar.css";

const Enviar = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const seleccionarOpcion = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <header className="ECheader">
        <a href="/Vistac" className="ECbt1">
          Salir
        </a>
      </header>
      <div className="ECbts">
        <a href="/EditarCorreo" className="ECbt2">
          Editar
        </a>
        <button className="ECbt3">Enviar o programar</button>
      </div>
      <button className="ECbtnsgt" onClick={handleOpenModal}>
        Revisar y enviar
      </button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        
      </Modal>
      <div className="ECsection1">
        <div className="ECblock1">
          <h4 className="ECh4">Destinatarios</h4>
          <h5 className="ECh5">Enviar a:</h5>
          <div id="ECcuadrotxt"></div>
        </div>
      </div>
      <div className="ECsection2">
        <div className="ECblock2">
          <h4 className="ECh4">Opciones de envio</h4>
          <label>
            <input
              type="checkbox"
              name="opcion"
              id="ECopcion1"
              onChange={() => seleccionarOpcion(1)}
            />{" "}
            Enviar ahora
          </label>
        </div>
        <hr className="EChr" />
        <div className="ECblock3">
          <label className="ECprogramacion">
            <input
              type="checkbox"
              name="opcion"
              id="opcion2"
              onChange={() => seleccionarOpcion(2)}
            />{" "}
            Programar hora de envío
          </label>
          {opcionSeleccionada === 2 && (
            <>
              <div className="ECfecha">
                <label id="date1" htmlFor="fecha">
                  Fecha
                </label>
                <input type="date" id="fecha" name="fecha" />
              </div>
              <div className="EChora">
                <label htmlFor="hora">Hora</label>
                <input type="time" id="hora" name="hora" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enviar;
