import React, { useState } from "react";
import styles from "../styles/navbarsorteo.css";
import { FaXmark } from "react-icons/fa6";
import NavbarParteGris from "./navBarParteGris";

const SorteoMarketing = () => {
  const [estaDesplegado, setEstaDesplegado] = useState(false);

  return (
    <header>
      {/* Contenido desplegable lateral */}
      <NavbarParteGris estaDesplegado={estaDesplegado} />

      {/* Rectángulo superior del navbar */}
      <section className={styles.seccionCampanas}>
        <div className={styles.contenidoSuperior}>
          <div className={styles.contenedorBotones}>
            
          </div>
        </div>
      </section>
    </header>
  );
};

export default SorteoMarketing;
