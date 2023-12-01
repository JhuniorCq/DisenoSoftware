import styles from "../stylesFormsLlamadas/formCrearLlamadaDos.module.css";
import { useState } from "react";
import { useFormCrearLlamada } from "../storeLlamadas/storeFormCrearLlamada";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLlamadasAdministrar } from "../llamadasAPI";
import { useCrearLlamada } from "../storeLlamadas/storeCrearLlamada";
import { ToastContainer, toast } from "react-toastify";
import { useSubmitFormsLlamada } from "../storeLlamadas/storeSubmitFormsLlamada";
import { getCampanas } from "../../campanasAPI";
import axios from "axios";

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

  const { data: dataCampanas, isSuccess: isSuccessFetchCampana } = useQuery({
    queryFn: () => getCampanas(),
    queryKey: ["campanas"],
  });

  if (isSuccessFetchCampana) {
    const today = new Date();
    let campanasTipoCorreo = dataCampanas.filter((campana) => {
      return campana.tipo_campana === 1;
    });

    var campanasTipoLlamadaVigentes = campanasTipoCorreo.filter(
      (campanasTipoCorreo) => {
        return new Date(campanasTipoCorreo.fecha_fin) > today;
      }
    );
    console.log(campanasTipoLlamadaVigentes);
  }

  const toggleFormUno = useSubmitFormsLlamada((state) => state.toggleFormUno);

  const handleSubmitSecondForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const today = new Date();
    const initialDate = new Date(data.initialDateCall);
    const endDate = new Date(data.endDateCall);
    const selectOption = data.campana_id;

    if (selectOption === "all") {
      toast.warn("Selecciona un tipo de campaña en específico", {
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

    // addLlamadasAdministrar.mutate({
    //   ...dataFormLlamada,
    //   ...data,
    // });

    const finalFormLlamada = {
      ...dataFormLlamada,
      ...data,
    };

    axios
      .post(
        "https://modulo-marketing.onrender.com/crearLlamada",
        finalFormLlamada
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });

    // console.log(finalFormLlamada);
    toggleCrearLlamada();
    toggleFormUno();
  };

  return (
    <div className={styles.wrapperForm}>
      <ToastContainer />
      <form className={styles.formDos} onSubmit={handleSubmitSecondForm}>
        <p className={styles.programacionLlamada}>Programación de la llamada</p>
        <div className={styles.containerCorreoCliente}>
          <label htmlFor="selectID">Enviar a:</label>
          <div className={styles.wrapperSelectTipoCorreo}>
            <select
              className={styles.selectCampanaCorreo}
              id="selectID"
              name="campana_id"
            >
              <option value="all">Todas las campañas...</option>
              {campanasTipoLlamadaVigentes &&
                campanasTipoLlamadaVigentes.map((opcionesCampanas, index) => (
                  <option key={index} value={opcionesCampanas.campana_id}>
                    {opcionesCampanas.nombre}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <p className={styles.dia}>Día</p>
        <div className={styles.wrapperDataForm}>
          <div className={styles.wrapperDates}>
            <div className={styles.containerInitialDate}>
              <p>Inicio</p>
              <input type="date" required name="fecha_inicio" />
            </div>
            <div className={styles.containerEndDate}>
              <p>Fin</p>
              <input type="date" required name="fecha_fin" />
            </div>
          </div>
          <div className={styles.wrapperTimes}>
            <div className={styles.containerInitialTime}>
              <p>Inicio</p>
              <input type="time" required name="hora_inicio" />
            </div>
            <div className={styles.containerEndTime}>
              <p>Fin</p>
              <input type="time" required name="hora_fin" />
            </div>
          </div>
        </div>
        <button className={styles.btnSubmitForm}>Submit</button>
      </form>
    </div>
  );
};
