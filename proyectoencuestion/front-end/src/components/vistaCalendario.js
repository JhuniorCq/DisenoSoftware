
import React, { useState, useEffect } from "react";
import styles from "../styles/vistaCalendario.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import VistaCalendarioComponent from "./calendario";
// Importa CalendarioSemanal al principio de tu archivo
import CalendarioSemanal from "./calendarioSemanal";

const VistaCalendario = () => {
  const [crearNota, setCrearNota] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState("mensual");
  const [selectedDates, setSelectedDates] = useState([]);

  // Funciones para cambiar el estado
  const toggleCrearNota = () => {
    setCrearNota(!crearNota);
  };

  const toggleMostrarCalendario = () => {
    setMostrarCalendario("mensual");
  };

  const toggleMostrarCalendarioSemanal = () => {
    setMostrarCalendario("semanal");
  };

  return (
    <section className={styles.calendario}>
      <div className={styles.seleccionarVistaPorFechas}>
        <div className={styles.fechas}>
          <div className={styles.mes} onClick={toggleMostrarCalendario}>
            <p>Mes</p>
          </div>
          <div className={`${styles.semana} ${styles.a}`} onClick={toggleMostrarCalendarioSemanal}>
            <p>Semana</p>
          </div>
        </div>
        <button className={styles.crearTareaBtn} onClick={toggleCrearNota}>
          Crear Nota
        </button>
      </div>

      {mostrarCalendario === "mensual" && (
        <VistaCalendarioComponent selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
      )}
      {mostrarCalendario === "semanal" && (
        <CalendarioSemanal /> // Muestra CalendarioSemanal aquí
      )}
      <div className={`${styles.crearNotass} ${crearNota ? styles.open : ''}`}>
        <div className={styles.cerrarMenu} onClick={toggleCrearNota}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={styles.containerForm}>
          <form className={styles.formCrearNota}>

            <div className={styles.containerTituloNota}>
              <label for='tituloNota'>Titulo</label>
              <input type="text" id="tituloNota" required minLength={1} />
            </div>
            <div className={styles.containerFechaNota}>
              <label for='fecha'>Fecha</label>
              <input type="date" id="fecha" required />
            </div>
            <div className={styles.containerNotas}>
              <label for='notas'>Notas</label>
              <textarea className={styles.textAreaa} id="notas"></textarea>
            </div>
            <div className={styles.botonesMenu}>
              {/* falta poner la conectividad a la base de datos */}
              <button type="submit" className={`${styles.boton} ${styles.boton__crear}`} >Crear</button>
              <button className={`${styles.boton} ${styles.boton__cancelar}`} onClick={toggleCrearNota}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default VistaCalendario;
