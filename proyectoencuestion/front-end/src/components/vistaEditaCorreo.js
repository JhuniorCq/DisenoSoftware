import React from "react";
import "../styles/vistaeditar.css";

const Editar = () => {
  return (
    <div>
      <header>
        <button className="button1">Salir</button>
      </header>
      <div className="buttons">
        <button className="button2">Editar</button>
        <button className="button3">Enviar o programar</button>
      </div>
      <button className="btnsg">Siguiente</button>
      <div className="container">
        <div>
          <h5 className="sb1" id="asunto">
            Asunto
          </h5>
          <div id="cuadrotexto"></div>
        </div>
        <div>
          <h5 className="sb1" id="name">
            Nombre del correo
          </h5>
          <input type="text" className="box1" placeholder="Escribe aquí" />
        </div>
        <div>
          <div id="cuadrotexto1"></div>
        </div>
      </div>
    </div>
  );
};

export default Editar;
