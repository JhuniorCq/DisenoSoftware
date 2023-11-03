import styles from "../stylesLlamadas/asideCrearLlamada.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";

export const FormCrearLlamadaDos = () => {
  const [guionLlamada, setGuionLlamada] = useState("");

  return (
    <form>
      <p>Programación de la llamada</p>
      <div className={styles.wrapperForm}>
        <div className={styles.wrapperName}>
          <p>Nombre del remitente</p>
          <input type="email" placeholder="name@email.com" />
        </div>
        <p>Día</p>
        <div className={styles.wrapperDates}>
          <div className={styles.containerInitialDate}>
            <p>Inicio</p>
            <input type="date" required name="initialDateCall" />
          </div>
          <div className={styles.containerEndDate}>
            <p>Fin</p>
            <input type="date" required name="endDateCall" />
          </div>
        </div>
        <div className={styles.wrapperTimes}>
          <div className={styles.containerInitialTime}>
            <p>Inicio</p>
            <input type="time" required name="initialTimeCall" />
          </div>
          <div className={styles.containerEndTime}>
            <p>Fin</p>
            <input type="time" required name="endTimeCall" />
          </div>
        </div>
      </div>
    </form>
  );
};
