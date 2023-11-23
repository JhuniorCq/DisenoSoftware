import React, { useState } from "react";
import "../styles/VistaEnviar.css";

const Enviar = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const seleccionarOpcion = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <div>
      <header>
        <button className="bt1">Salir</button>
      </header>
      <div className="bts">
        <button className="bt2">Editar</button>
        <button className="bt3">Enviar o programar</button>
      </div>
      <button className="btnsgt">Revisar y enviar</button>
      <div className="section1">
        <div className="block1">
          <h4>Destinatarios</h4>
          <h5>Enviar a:</h5>
          <div id="cuadrotxt"></div>
        </div>
      </div>
      <div className="section2">
        <div className="block2">
          <h4>Opciones de envio</h4>
          <label>
            <input
              type="checkbox"
              name="opcion"
              id="opcion1"
              onChange={() => seleccionarOpcion(1)}
            />{" "}
            Enviar ahora
          </label>
        </div>
        <hr />
        <div className="block3">
          <label className="programacion">
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
              <div className="fecha">
                <label id="date1" htmlFor="fecha">
                  Fecha
                </label>
                <input type="date" id="fecha" name="fecha" />
              </div>
              <div className="hora">
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
