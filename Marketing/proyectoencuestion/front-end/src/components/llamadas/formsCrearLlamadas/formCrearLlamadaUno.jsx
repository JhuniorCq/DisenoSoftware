import styles from "../stylesLlamadas/asideCrearLlamada.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";
import { useSubmitFormUnoLlamada } from "../storeLlamadas/storeSubmitFormUnoLlamada";

export const FormCrearLlamadaUno = () => {
  const [guionLlamada, setGuionLlamada] = useState("");

  // estado global para cambiar la visualización del form 1 al form 2:
  const toggleFormUno = useSubmitFormUnoLlamada((state) => state.toggleFormUno);

  // estado global para guardar los datos en un objeto para crear la llamada
  const methodCrearLlamada = useFormCrearLlamada(
    (state) => state.methodCrearLlamada
  );

  const handleGuionChangue = (e) => {
    setGuionLlamada(e.target.value);
  };

  const handleFormUnoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    methodCrearLlamada(data);
    toggleFormUno();
  };

  return (
    <form onSubmit={handleFormUnoSubmit} className={styles.formUno}>
      <div className={styles.wrapperGuionLlamada}>
        <p>Guion de la llamada</p>
        <textarea
          className={styles.textAreaGuionLlamada}
          id="guionLlamada"
          name="guionLlamada"
          onChange={handleGuionChangue}
        ></textarea>
      </div>
      <button className={styles.btnSubmitFormUno}>Submit</button>
    </form>
  );
};
