import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SorteoMarketing from "./navbarsorteo";
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
       <SorteoMarketing /> 
      <div className="Sencabezado">
        <h3 className="Sh3">Sorteos</h3>
        <div className="Scontainer">
        <ul className="Sul">
            <li>
              <a className="Sli" href="/Sorteom">Participantes</a>
            </li> 
            <li>
              <a className="Sli" href="/Vistac">Configuracion</a>
            </li> 
            <li>
              <a className="Sli" href="/Vistas">Sorteo</a>
            </li> 
          </ul>
        </div>
        <hr className="Shr" />
      </div>

      <div className="Ssection1">
        <h4 className="Stxt">Público objetivo</h4>
        <h6 className="Stxt1">Público objetivo</h6>
        <label className="Swin" htmlFor="numberOfWinners">
          Número de Ganadores:
        </label>
        <input
          className="Sres"
          type="number"
          id="numberOfWinners"
          min="1"
          value={numberOfWinners}
          onChange={(e) => setNumberOfWinners(e.target.value)}
        />
        <div className="Sparticipants">
          <textarea
            className="Spartici"
            id="participantsInput"
            placeholder="Ingresa los participantes, uno por línea"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          ></textarea>
        </div>
        <button className="Sbtn3" onClick={generarSorteo}>
          Generar Sorteo
        </button>
      </div>

      <div className="Ssection2">
        <h3 className="Sh3">GANADORES</h3>
        <button className="Sbtn4">
        <Link to="/EditarCorreo">Enviar correo</Link>
      </button>
        <div className="Sgenerator-container">
          <div className="Sresult" id="result">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorteo;
