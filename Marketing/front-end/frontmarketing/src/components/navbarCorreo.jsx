import React, { useState } from "react";
import styles from "../styles/navbarCorreo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faMagnifyingGlass,
  faGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FaXmark } from "react-icons/fa6";
import FormsCrearCorreoCampana from "./forms/formsCrearCorreoCampana";
import FormCrearCorreoDos from "./forms/formsCrearCorreoDOS";

import { Link } from "react-router-dom";
import NavbarParteGris from "./navBarParteGris";

const NavbarCorreo = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = useState(false);
  const [crearCorreo, setCrearCorreo] = useState(false);

  const [submitSiguiente, setSubmitSiguiente] = useState([]);

  // esto es para saber si en el forms se ha clickeado el boton 'siguiente', para pasar al forms n° 02
  const [siguienteIsClicked, setSiguienteIsClicked] = useState(false);

  const toggleLateralMenu = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const toggleCrearCorreo = () => {
    setCrearCorreo(!crearCorreo);
  };

  return (
    <header>
      {/* contenido desplegable lateral */}

      <NavbarParteGris isDropDownOpen={isDropDownOpen} />

      <section className={styles.campanasAnalisis}>
        <div className={styles.despuesDelNavbar}>
          <div className={styles.campana}>
            <h1>Correos</h1>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.botonCrearCorreo}
              onClick={toggleCrearCorreo}
            >
              Crear correo
            </button>
          </div>
        </div>
      </section>

      <div
        className={`${styles.containerMenuLateralCrearCorreo} ${
          crearCorreo ? styles.toggleCrearCorreoMenu : ""
        } `}
      >
        <button
          className={styles.cerrarMenuLateral}
          onClick={toggleCrearCorreo}
        >
          <FaXmark />
        </button>

        {!siguienteIsClicked && (
          <FormsCrearCorreoCampana
            siguienteIsClicked={siguienteIsClicked}
            setSiguienteIsClicked={setSiguienteIsClicked}
            submitSiguiente={submitSiguiente}
            setSubmitSiguiente={setSubmitSiguiente}
          />
        )}

        {siguienteIsClicked && (
          <FormCrearCorreoDos
            submitSiguiente={submitSiguiente}
            setSubmitSiguiente={setSubmitSiguiente}
          />
        )}
      </div>
    </header>
  );
};

export default NavbarCorreo;
