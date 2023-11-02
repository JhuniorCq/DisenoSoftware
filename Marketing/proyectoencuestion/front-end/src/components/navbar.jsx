import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faMagnifyingGlass,
  faGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/navbar.module.css";
import { useCampanas } from "./store/useCampanas";
import FormCrearCampana from "./forms/formsCrearCampana";
import NavbarParteGris from "./navBarParteGris";

const Navbar = () => {
  const [crearCampana, setCrearCampana] = useState(false);

  const { dataCampanaIDs, addDataCampana } = useCampanas();

  const toggleCrearCampana = () => {
    setCrearCampana(!crearCampana);
  };

  return (
    <header>
      {/* contenido desplegable lateral */}
      <NavbarParteGris />

      <section className={styles.campanasAnalisis}>
        <div className={styles.despuesDelNavbar}>
          <div className={styles.campana}>
            <h1>Campañas</h1>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.botonCrearCampana}
              onClick={toggleCrearCampana}
            >
              Crear campaña
            </button>
          </div>
        </div>
      </section>

      <div className={styles.containerRoutes}>
        <ul className={styles.redirection}>
          <li>
            <Link className={styles.gestionAjustar} to={"/"}>
              Gestión
            </Link>
          </li>
          <li>
            <Link className={styles.calendarioAjustar} to={"/calendario"}>
              Calendario
            </Link>
          </li>
        </ul>
      </div>

      <hr />

      <aside
        className={`
            ${styles.menuFlotanteCrearCampana} 
            ${crearCampana ? styles.openThree : ""} `}
      >
        <div className={styles.cerrarMenu} onClick={toggleCrearCampana}>
          <FontAwesomeIcon icon={faXmark} />
        </div>

        <div className={styles.tituloForm}>Título</div>

        <div className={styles.containerForm}>
          <FormCrearCampana
            crearCampana={crearCampana}
            setCrearCampana={setCrearCampana}
          />
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
