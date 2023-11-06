import styles from "../stylesFormsLlamadas/formCrearLlamadaUno.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";
import { useSubmitFormUnoLlamada } from "../storeLlamadas/storeSubmitFormUnoLlamada";

export const FormCrearLlamadaUno = () => {
  // estado global para cambiar la visualización del form 1 al form 2:
  const toggleFormUno = useSubmitFormUnoLlamada((state) => state.toggleFormUno);

  // estado global para guardar los datos en un objeto para crear la llamada
  const methodCrearLlamada = useFormCrearLlamada(
    (state) => state.methodCrearLlamada
  );

  const handleFormUnoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    methodCrearLlamada(data);
    toggleFormUno();
  };

  return (
    <div className={styles.wrapperForm}>
      <form onSubmit={handleFormUnoSubmit} className={styles.formUno}>
        <div className={styles.wrapperGuionLlamada}>
          <p>Guion de la llamada</p>
          <textarea
            className={styles.textAreaGuionLlamada}
            id="guionLlamada"
            name="guionLlamada"
          ></textarea>
        </div>
        <button className={styles.btnSubmitForm}>Siguiente</button>
      </form>
    </div>
  );
};
