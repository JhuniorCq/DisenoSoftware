import styles from "./stylesLlamadas/asideCrearLlamada.module.css";
import { useCrearLlamada } from "./storeLlamadas/storeCrearLlamada";
import { FaXmark } from "react-icons/fa6";
import { FormCrearLlamadaUno } from "./formsCrearLlamadas/formCrearLlamadaUno";
import { useFormCrearLlamada } from "./storeLlamadas/storeFormCrearLlamada";
import { useSubmitFormUnoLlamada } from "./storeLlamadas/storeSubmitFormUnoLlamada";
import { FormCrearLlamadaDos } from "./formsCrearLlamadas/formCrearLlamadaDos";

export const CrearLlamadaLateral = () => {
  // estados para manejar el crearLlamada Lateral
  const iscrearLlamadaPressed = useCrearLlamada(
    (state) => state.iscrearLlamadaPressed
  );
  const toggleCrearLlamada = useCrearLlamada(
    (state) => state.toggleCrearLlamada
  );
  const handleCrearLlamada = () => {
    toggleCrearLlamada();
  };

  // estados para poder cambiar del form 1 al form 2 de llamadas:

  const isFormUnoCompleted = useSubmitFormUnoLlamada(
    (state) => state.isFormUnoCompleted
  );

  // estados del form para poder visualizar los datos
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
      {!isFormUnoCompleted ? <FormCrearLlamadaUno /> : <FormCrearLlamadaDos />}
    </div>
  );
};
