import React, { useState } from "react";
import "../styles/vistaSor.css";

const Sorteo = () => {
  const [participants, setParticipants] = useState("");
  const [numberOfWinners, setNumberOfWinners] = useState(1);
  const [result, setResult] = useState("");

  const generarSorteo = () => {
    const participantesFiltrados = participants
      .split("\n")
      .map((participant) => participant.trim())
      .filter((participant) => participant !== "");

    if (participantesFiltrados.length < 2) {
      setResult("Ingresa al menos dos participantes.");
    } else if (numberOfWinners < 1) {
      setResult("El número de ganadores debe ser al menos 1.");
    } else if (numberOfWinners > participantesFiltrados.length) {
      setResult(
        "El número de ganadores no puede ser mayor que el número de participantes."
      );
    } else {
      const ganadores = [];

      while (ganadores.length < numberOfWinners) {
        const ganador =
          participantesFiltrados[
            Math.floor(Math.random() * participantesFiltrados.length)
          ];
        if (!ganadores.includes(ganador)) {
          ganadores.push(ganador);
        }
      }

      // Limpiar el resultado
      setResult("");

      // Construir la lista de ganadores
      const listaGanadores = ganadores.map((ganador) => (
        <p key={ganador}>{ganador}</p>
      ));

      setResult(
        <>
          <p>Los ganadores son:</p>
          {listaGanadores}
        </>
      );
    }
  };

  return (
    <div>
      <div className="encabezado1">
        <h1>Sorteos</h1>
        <div className="container">
          <ul>
            <li className="sub"> Participantes</li>
            <li className="sub"> Configuración</li>
            <li className="sub"> Sorteo</li>
          </ul>
        </div>
        <hr />
      </div>

      <div className="section1">
        <h4 className="txt">Público objetivo</h4>
        <h6 className="txt1">Público objetivo</h6>
        <label className="win" htmlFor="numberOfWinners">
          Número de Ganadores:
        </label>
        <input
          className="res"
          type="number"
          id="numberOfWinners"
          min="1"
          value={numberOfWinners}
          onChange={(e) => setNumberOfWinners(e.target.value)}
        />
        <div className="participants">
          <textarea
            className="partici"
            id="participantsInput"
            placeholder="Ingresa los participantes, uno por línea"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          ></textarea>
        </div>
        <button className="btn3" onClick={generarSorteo}>
          Generar Sorteo
        </button>
      </div>

      <div className="section2">
        <h3>GANADORES</h3>
        <button className="btn4">Enviar correo</button>
        <div className="generator-container">
          <div className="result" id="result">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorteo;
