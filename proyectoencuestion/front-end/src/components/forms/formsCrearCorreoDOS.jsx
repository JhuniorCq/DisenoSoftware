import React, { useState, useEffect, useId } from "react";
import styles from "./formsCrearCorreoDOS.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCorreosCampanas,
  getCampanas,
  getCorreosCampanas,
} from "../campanasAPI";
import { useFormCorreo } from "../marketing/storeCorreo/useFormCorreo";
import { useCloseFormCorreo } from "../marketing/storeCorreo/useCloseFormCorreo";
import axios from "axios";

function FormCrearCorreoDos({ siguienteIsClicked, setSiguienteIsClicked }) {
  const [sendNow, setSendNow] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const fechaID = useId();
  const horaID = useId();

  const { data: dataCampanas, isSuccess: isSuccessFetchCampana } = useQuery({
    queryFn: () => getCampanas(),
    queryKey: ["campanas"],
  });

  if (isSuccessFetchCampana) {
    const today = new Date();

    let campanasTipoCorreo = dataCampanas.filter((campana) => {
      return campana.tipo_campana === 2;
    });

    var campanasTipoCorreoVigentes = campanasTipoCorreo.filter(
      (campanasTipoCorreo) => {
        return new Date(campanasTipoCorreo.fecha_fin) > today;
      }
    );
    console.log(campanasTipoCorreoVigentes);
  }

  const { data } = useQuery({
    queryKey: ["correoscampanascreadas"],
    queryFn: getCorreosCampanas,
  });
  const queryClient = useQueryClient();
  const agregarCorreoCampana = useMutation({
    mutationFn: createCorreosCampanas,
    onSuccess: () => {
      queryClient.invalidateQueries("correoscampanascreadas");
      console.log("campaña añadida correctamente!");
      console.log(data);
    },
  });

  useEffect(() => {
    if (sendNow) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(!date || !time || isDateTimeValid());
    }
  }, [sendNow, date, time]);

  const isDateTimeValid = () => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime < currentDateTime;
  };

  const handleSendOptionChange = (e) => {
    setSendNow(e.target.value === "now");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const dataCorreoForm = useFormCorreo((state) => state.dataCorreoForm);

  // global state para cerrar la visión del form

  const toggleStateFormCorreo = useCloseFormCorreo(
    (state) => state.toggleStateFormCorreo
  );

  const fechaHoy = new Date();
  const formattedDate = fechaHoy.toISOString().split("T")[0];

  const horaActual = fechaHoy.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Utiliza 24 horas
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFinalForm = new FormData(e.target);
    const newCorreoDos = Object.fromEntries(newFinalForm);

    const camposExcluidos = ["send"];

    const newFormSinSend = Object.keys(newCorreoDos)
      .filter((campo) => !camposExcluidos.includes(campo))
      .reduce((objeto, campo) => {
        objeto[campo] = newCorreoDos[campo];
        return objeto;
      }, {});

    if (sendNow) {
      const formCrearCorreoNow = {
        ...dataCorreoForm,
        ...newFormSinSend,
        hora: horaActual,
        fecha_envio: formattedDate,
      };

      axios
        .post(
          "https://modulo-marketing.onrender.com/crearCorreo",
          formCrearCorreoNow
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
        });
      console.log(newCorreoDos);
      console.log(dataCorreoForm);
      console.log(formCrearCorreoNow);
    } else {
      const formCrearCorreoLater = {
        ...dataCorreoForm,
        ...newFormSinSend,
      };

      console.log(newCorreoDos);
      console.log(dataCorreoForm);
      console.log(formCrearCorreoLater);
      axios
        .post(
          "https://modulo-marketing.onrender.com/crearCorreo",
          formCrearCorreoLater
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
        });

      // agregarCorreoCampana.mutate({
      //   ...dataCorreoForm,
      //   ...newCorreoDos,
      // });
    }

    toggleStateFormCorreo();
    setSiguienteIsClicked(!siguienteIsClicked);
  };

  return (
    <form className={styles.formCrearCorreoCampana} onSubmit={handleSubmit}>
      <div className={styles.containerCorreoCliente}>
        <label htmlFor="selectID">Enviar a:</label>
        <div className={styles.wrapperSelectTipoCorreo}>
          <select
            className={styles.selectCampanaCorreo}
            id="selectID"
            name="campana_id"
          >
            <option value="all">Todas las campañas...</option>
            {campanasTipoCorreoVigentes &&
              campanasTipoCorreoVigentes.map((opcionesCampanas, index) => (
                <option key={index} value={opcionesCampanas.campana_id}>
                  {opcionesCampanas.nombre}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={styles.containerOpcionEnvio}>
        <label className={styles.labelRadioButtonUno}>
          ¿Enviar ahora?
          <input
            type="radio"
            value="now"
            name="send"
            checked={sendNow}
            onChange={handleSendOptionChange}
          />
        </label>
        <label className={styles.labelRadioButtonDos}>
          ¿Enviar más tarde?
          <input
            type="radio"
            value="later"
            name="send"
            checked={!sendNow}
            onChange={handleSendOptionChange}
          />
        </label>
      </div>
      {!sendNow && (
        <div
          className={`${styles.containerDateTime} ${
            !sendNow ? styles.abrirOptMasTarde : styles.hideOptMasTarde
          }`}
        >
          <label htmlFor={fechaID}>Fecha:</label>
          <input
            type="date"
            value={date}
            name="fecha_envio"
            id={fechaID}
            onChange={handleDateChange}
            required={!sendNow}
          />
          <label htmlFor={horaID}>Hora:</label>
          <input
            type="time"
            value={time}
            name="hora"
            id={horaID}
            onChange={handleTimeChange}
            required={!sendNow}
          />
        </div>
      )}
      <button
        className={`${styles.btnSubmitFinalForm} ${
          isSubmitDisabled ? styles.botonDisabled : ""
        }`}
        type="submit"
        disabled={isSubmitDisabled}
      >
        Enviar
      </button>
    </form>
  );
}

export default FormCrearCorreoDos;
