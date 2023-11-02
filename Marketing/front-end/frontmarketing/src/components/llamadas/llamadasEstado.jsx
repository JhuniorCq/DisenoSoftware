import { useState } from "react";
import NavbarParteGris from "../navBarParteGris";
import styles from "./stylesLlamadas/llamadasEstado.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ControlVistaLlamadas } from "./controlVistaLlamadas";
import { CrearLlamadaLateral } from "./asideCrearLlamada";

const LlamadasEstado = () => {
  return (
    <main>
      <NavbarParteGris />
      <ControlVistaLlamadas />
      <div className={styles.containerTotal}>
        <section className={styles.visionNumerosLlamadas}>
          <div className={styles.containerTotalLlamadasDiarias}>
            <p>Total de llamadas por día</p>
            <h1>0</h1>
            <small>llamadas</small>
          </div>
          <div className={styles.containerTotalLlamadasRealizadas}>
            <p>Total de llamadas realizadas</p>
            <h1>0</h1>
            <small>llamadas</small>
          </div>
        </section>
        <section className={styles.wrapperResumenLogistica}>
          <div className={styles.wrapperResumenMetricas}>
            <h3>Resumen</h3>
            <button className={`${styles.btnListResumen} ${styles.btnResumen}`}>
              Evolución
            </button>
            <h3>Métricas</h3>
            <div className={styles.containerBtnMetricas}>
              <button className={styles.btnList}>Llamadas por día</button>
              <button className={styles.btnList}>Duración promedio</button>
            </div>
          </div>
          <div className={styles.wrapperDiagrama}>
            <figure>
              <figcaption>DIAGRAMITA</figcaption>
            </figure>
          </div>
        </section>
      </div>
      <CrearLlamadaLateral />
    </main>
  );
};

export default LlamadasEstado;
