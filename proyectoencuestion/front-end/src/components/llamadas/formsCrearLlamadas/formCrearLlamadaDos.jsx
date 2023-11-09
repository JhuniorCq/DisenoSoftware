import styles from "../stylesFormsLlamadas/formCrearLlamadaDos.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLlamadasAdministrar } from "../llamadasAPI";
import { useCrearLlamada } from "../storeLlamadas/storeCrearLlamada";
import { ToastContainer, toast } from "react-toastify";
import { useSubmitFormsLlamada } from "../storeLlamadas/storeSubmitFormsLlamada";

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

  const toggleFormUno = useSubmitFormsLlamada((state) => state.toggleFormUno);

  const handleSubmitSecondForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const today = new Date();
    const initialDate = new Date(data.initialDateCall);
    const endDate = new Date(data.endDateCall);

    // Validar que la fecha de inicio sea mayor al día actual
    if (initialDate <= today) {
      toast.warn("La fecha de inicio debe ser posterior al día actual.", {
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

    // Validar que la fecha de fin no sea menor que la fecha de inicio
    if (endDate < initialDate) {
      toast.warn(
        "La fecha de fin no puede ser anterior a la fecha de inicio.",
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }

    // Validar que la llamada no dure más de 10 días
    const maxDuration = 10; // Puedes ajustar este valor según tus necesidades
    const durationInDays = Math.ceil(
      (endDate - initialDate) / (1000 * 60 * 60 * 24)
    );
    if (durationInDays > maxDuration) {
      toast.warn(`La llamada no puede durar más de ${maxDuration} días.`, {
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

    addLlamadasAdministrar.mutate({
      ...dataFormLlamada,
      ...data,
    });
    toggleCrearLlamada();
    toggleFormUno();
  };

  return (
    <div className={styles.wrapperForm}>
      <ToastContainer />
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
