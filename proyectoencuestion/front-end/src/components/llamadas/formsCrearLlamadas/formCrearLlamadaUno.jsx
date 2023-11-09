import styles from "../stylesFormsLlamadas/formCrearLlamadaUno.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";
import { useSubmitFormsLlamada } from "../storeLlamadas/storeSubmitFormsLlamada";
import { ToastContainer, toast } from "react-toastify";

export const FormCrearLlamadaUno = () => {
  // estado global para cambiar la visualización del form 1 al form 2:
  const toggleFormUno = useSubmitFormsLlamada((state) => state.toggleFormUno);

  // estado global para guardar los datos en un objeto para crear la llamada
  const methodCrearLlamada = useFormCrearLlamada(
    (state) => state.methodCrearLlamada
  );

  const handleFormUnoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.guionLlamada.length < 10 || data.guionLlamada.length > 500) {
      toast.warn("La longitud del guion debe estar entre 10 y 500 caracteres", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const validCharactersRegex = /^[a-zA-Z0-9\s]+$/;
    if (!validCharactersRegex.test(data.guionLlamada)) {
      toast.warn("El guion solo puede contener letras y números.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    methodCrearLlamada(data);
    toggleFormUno();
  };

  return (
    <div className={styles.wrapperForm}>
      <ToastContainer />
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
