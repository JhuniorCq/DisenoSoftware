import { useState } from "react";
import {
  distritosPorDepartamento,
  departamentos,
} from "../dataDistritosDepartamentos";
import styles from "./formsPublicoObjetivo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FormsPublicoObjetivoCrearCampana = (props) => {
  const {
    setSecondFormIsSubmitted,
    setPublicoObjetivoIsClicked,
    publicoObjetivoIsClicked,
    onSecondFormSubmit,
    tipoCampanaInput,
  } = props;

  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [guardarIsClicked, setGuardarIsClicked] = useState(false);

  const [rangoPersonalizadoIsSelected, setRangoPersonalizadoIsSelected] =
    useState(false);
  const [rangoPersonalizadoByUserMenor, setRangoPersonalizadoByUserMenor] =
    useState(0);
  const [rangoPersonalizadoByUserMayor, setRangoPersonalizadoByUserMayor] =
    useState(0);

  const handleSubmitSubmenu = (e) => {
    e.preventDefault();
    setGuardarIsClicked(true);

    const formDataSubmenu = new FormData(e.target);
    const dataSubMenu = Object.fromEntries(formDataSubmenu);

    if (
      rangoPersonalizadoByUserMayor !== 0 ||
      rangoPersonalizadoByUserMenor !== 0
    ) {
      const customValueTargeredAge = `${rangoPersonalizadoByUserMenor}-${rangoPersonalizadoByUserMayor}`;
      const dataWithCustomRange = {
        ...dataSubMenu,
        tipo: customValueTargeredAge,
      };

      // devuelvo la data con el rango personalizado...
      console.log("data personalizado devuelto!");
      setSecondFormIsSubmitted(true);
      onSecondFormSubmit(dataWithCustomRange);
      console.log(dataWithCustomRange);
      return;
    }

    setSecondFormIsSubmitted(true);

    onSecondFormSubmit(dataSubMenu);
  };

  const handleDepartamentoChange = (e) => {
    setSelectedDepartamento(e.target.value);
  };

  const togglePublicoObjetivoClicked = (e) => {
    setPublicoObjetivoIsClicked(!publicoObjetivoIsClicked);
  };

  const handleRangoPersonalizadoMenor = (e) => {
    setRangoPersonalizadoByUserMenor(e.target.value);
  };

  const handleRangoPersonalizadoMayor = (e) => {
    setRangoPersonalizadoByUserMayor(e.target.value);
  };

  return (
    <div
      className={`${styles.menuPopupPublicoObjetivo} ${
        publicoObjetivoIsClicked ? styles.showMenuPopup : ""
      } 
        ${guardarIsClicked ? styles.hidePopupMenu : ""}`}
    >
      <div
        className={styles.hamburguerPopup}
        onClick={togglePublicoObjetivoClicked}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>

      <form
        className={styles.formSubmenuCrearCampana}
        onSubmit={handleSubmitSubmenu}
      >
        {tipoCampanaInput === "3" && (
          <>
            <div className={styles.labelsPublicoCampana}>
              <label htmlFor="fechainiciosorteo">
                Fecha inicio sorteo<span className={styles.asterisco}>*</span>
              </label>
              <label htmlFor="fechafinsorteo">
                Fecha fin sorteo<span className={styles.asterisco}>*</span>
              </label>
            </div>

            <div className={styles.inputsPublicoCampana}>
              <input
                type="date"
                className={styles.customSelect}
                id="fechainiciosorteo"
                name="fechaInicio"
                required={tipoCampanaInput === "3"}
              />

              <input
                type="date"
                className={styles.customSelect}
                id="fechafinsorteo"
                name="fechaFin"
                required={tipoCampanaInput === "3"}
              />
            </div>
          </>
        )}
        {tipoCampanaInput !== "3" && (
          <>
            <div className={styles.labelsPublicoCampana}>
              <label htmlFor="edadDirigida">
                Edad dirigida<span className={styles.asterisco}>*</span>
              </label>
              <label htmlFor="sexo">
                Sexo<span className={styles.asterisco}>*</span>
              </label>
            </div>
            <div className={styles.inputsPublicoCampana}>
              <select
                className={styles.customSelect}
                id="edadDirigida"
                name="tipo"
                required={tipoCampanaInput !== "3"}
                onChange={(e) => {
                  if (e.target.value === "personalizada") {
                    setRangoPersonalizadoIsSelected(true);
                  } else {
                    setRangoPersonalizadoIsSelected(false);
                  }
                }}
              >
                <option value="11-19">11-19</option>
                <option value="20-29">20-29</option>
                <option value="30-39">30-39</option>
                <option value="40-49">40-49</option>
                <option value="50-59">50-59</option>
                <option value="60+">60 a más</option>
                <option value="personalizada">Rango personalizado...</option>
              </select>

              <select
                id="sexo"
                className={styles.customSelect}
                name="sexo"
                required={tipoCampanaInput !== "3"}
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="A">Ambos</option>
              </select>
            </div>

            {rangoPersonalizadoIsSelected && tipoCampanaInput !== "3" && (
              <div className={styles.rangoPersonalizado}>
                <label>Rango personalizado:</label>
                <div className={styles.containerInputsRango}>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    name="minm"
                    onChange={handleRangoPersonalizadoMenor}
                  />
                  <span> a </span>
                  <input
                    type="number"
                    min={0}
                    name="maxm"
                    onChange={handleRangoPersonalizadoMayor}
                  />
                </div>
              </div>
            )}

            <div className={styles.departamentoPublicoCampana}>
              <label htmlFor="departamento">
                Departamento<span className={styles.asterisco}>*</span>
              </label>
              <select
                className={styles.customSelect}
                id="departamento"
                name="departamento"
                onChange={handleDepartamentoChange}
                required={tipoCampanaInput !== "3"}
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.departamentoPublicoCampana}>
              <label htmlFor="distrito">
                Distrito<span className={styles.asterisco}>*</span>
              </label>
              <select
                className={styles.customSelect}
                id="distrito"
                name="distrito"
                disabled={!selectedDepartamento}
                required={tipoCampanaInput !== "3"}
              >
                <option value="">Selecciona un distrito</option>
                {selectedDepartamento &&
                  distritosPorDepartamento[selectedDepartamento].map(
                    (distrito) => (
                      <option key={distrito.id} value={distrito.id}>
                        {distrito.nombre}
                      </option>
                    )
                  )}
              </select>
            </div>
          </>
        )}
        <div className={styles.containerBotonesPopup}>
          <button type="submit" className={styles.botonPopup}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormsPublicoObjetivoCrearCampana;
