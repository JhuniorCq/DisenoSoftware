import styles from "./stylesLlamadas/asideCrearLlamada.module.css";
import { useCrearLlamada } from "./storeLlamadas/storeCrearLlamada";
import { FaXmark } from "react-icons/fa6";
import { FormCrearLlamadaUno } from "./formsCrearLlamadas/formCrearLlamadaUno";
import { useFormCrearLlamada } from "./storeLlamadas/storeFormCrearLlamada";

export const CrearLlamadaLateral = () => {
  const iscrearLlamadaPressed = useCrearLlamada(
    (state) => state.iscrearLlamadaPressed
  );
  const toggleCrearLlamada = useCrearLlamada(
    (state) => state.toggleCrearLlamada
  );
  const handleCrearLlamada = () => {
    toggleCrearLlamada();
  };

  // parte del form
  const dataFormLlamada = useFormCrearLlamada((state) => state.dataFormLlamada);

  const showFormLlamada = () => {
    console.log(dataFormLlamada);
  };

  return (
    <div
      className={`${styles.crearLlamadaLateral} ${
        iscrearLlamadaPressed ? styles.showCrearLlamadaLateral : ""
      }`}
    >
      <FaXmark
        className={styles.cerrarCrearLlamada}
        onClick={handleCrearLlamada}
      />
      <FormCrearLlamadaUno />

      <button className={styles.btnDepuradorAbsolute} onClick={showFormLlamada}>
        Show global state
      </button>
    </div>
  );
};
