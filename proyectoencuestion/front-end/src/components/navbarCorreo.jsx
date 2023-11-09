import React, { useState } from "react";
import styles from "../styles/navbarCorreo.module.css";

import { FaXmark } from "react-icons/fa6";
import FormsCrearCorreoCampana from "./forms/formsCrearCorreoCampana";
import FormCrearCorreoDos from "./forms/formsCrearCorreoDOS";
import NavbarParteGris from "./navBarParteGris";
import { useFormCorreo } from "./marketing/storeCorreo/useFormCorreo";
import { useCloseFormCorreo } from "./marketing/storeCorreo/useCloseFormCorreo";

const NavbarCorreo = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // esto es para saber si en el forms se ha clickeado el boton 'siguiente', para pasar al forms n° 02
  const [siguienteIsClicked, setSiguienteIsClicked] = useState(false);

  const isFormCorreoCompleted = useCloseFormCorreo(
    (state) => state.isFormCorreoCompleted
  );
  const toggleStateFormCorreo = useCloseFormCorreo(
    (state) => state.toggleStateFormCorreo
  );

  // estados globales del form correo.
  const dataCorreoForm = useFormCorreo((state) => state.dataCorreoForm);
  const methodAddDataFormCorreo = useFormCorreo(
    (state) => state.methodAddDataFormCorreo
  );

  const handleConsoleLog = () => {
    console.log(dataCorreoForm);
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
              onClick={() => toggleStateFormCorreo()}
            >
              Crear correo
            </button>
          </div>
        </div>
      </section>

      <div
        className={`${styles.containerMenuLateralCrearCorreo} ${
          isFormCorreoCompleted ? styles.toggleCrearCorreoMenu : ""
        } `}
      >
        <button
          className={styles.cerrarMenuLateral}
          onClick={() => toggleStateFormCorreo()}
        >
          <FaXmark />
        </button>

        {!siguienteIsClicked && (
          <FormsCrearCorreoCampana
            siguienteIsClicked={siguienteIsClicked}
            setSiguienteIsClicked={setSiguienteIsClicked}
          />
        )}

        {siguienteIsClicked && (
          <FormCrearCorreoDos
            siguienteIsClicked={siguienteIsClicked}
            setSiguienteIsClicked={setSiguienteIsClicked}
          />
        )}

        <button onClick={handleConsoleLog}>Handle global state form</button>
      </div>
    </header>
  );
};

export default NavbarCorreo;
