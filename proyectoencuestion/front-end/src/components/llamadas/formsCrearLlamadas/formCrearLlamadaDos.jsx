import styles from "../stylesFormsLlamadas/formCrearLlamadaDos.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLlamadasAdministrar } from "../llamadasAPI";
import { useCrearLlamada } from "../storeLlamadas/storeCrearLlamada";

export const FormCrearLlamadaDos = () => {
  const [guionLlamada, setGuionLlamada] = useState("");

  const dataFormLlamada = useFormCrearLlamada((state) => state.dataFormLlamada);

  const toggleCrearLlamada = useCrearLlamada(
    (state) => state.toggleCrearLlamada
  );

  const queryClient = useQueryClient();
  const addLlamadasAdministrar = useMutation({
    mutationFn: createLlamadasAdministrar,
    onSuccess: () => {
      queryClient.invalidateQueries("correoscampanascreadas");
      console.log("campaña añadida correctamente!");
    },
  });

  const handleSubmitSecondForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    addLlamadasAdministrar.mutate({
      ...dataFormLlamada,
      ...data,
    });
    toggleCrearLlamada();
  };

  return (
    <div className={styles.wrapperForm}>
      <form className={styles.formDos} onSubmit={handleSubmitSecondForm}>
        <p className={styles.programacionLlamada}>Programación de la llamada</p>
        <div className={styles.wrapperName}>
          <p>Enviar a...</p>
          <input
            type="text"
            name="remitenteName"
            value="Todos los usuarios"
            disabled={true}
          />
        </div>
        <p className={styles.dia}>Día</p>
        <div className={styles.wrapperDataForm}>
          <div className={styles.wrapperDates}>
            <div className={styles.containerInitialDate}>
              <p>Inicio</p>
              <input type="date" required name="initialDateCall" />
            </div>
            <div className={styles.containerEndDate}>
              <p>Fin</p>
              <input type="date" required name="endDateCall" />
            </div>
          </div>
          <div className={styles.wrapperTimes}>
            <div className={styles.containerInitialTime}>
              <p>Inicio</p>
              <input type="time" required name="initialTimeCall" />
            </div>
            <div className={styles.containerEndTime}>
              <p>Fin</p>
              <input type="time" required name="endTimeCall" />
            </div>
          </div>
        </div>
        <button className={styles.btnSubmitForm}>Submit</button>
      </form>
    </div>
  );
};
