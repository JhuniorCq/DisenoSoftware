import React, { useState } from "react";
import styles from "../styles/navbarsorteo.css";
import { FaXmark } from "react-icons/fa6";
import NavbarParteGris from "./navBarParteGris";

const SorteoMarketing = () => {


  return (
    <header>
      {/* Rectángulo azul con iconos */}
      <div className={styles.blueRectangle}>
        {/* Otros iconos */}
      </div>

      {/* Menú desplegable */}
      <NavbarParteGris />
    </header>
  );
};

export default SorteoMarketing;
