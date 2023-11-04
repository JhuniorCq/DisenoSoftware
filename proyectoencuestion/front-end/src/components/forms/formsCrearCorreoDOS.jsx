import React, { useState, useEffect, useId } from "react";
import styles from "./formsCrearCorreoDOS.module.css";
import { useCampanas } from "../store/useCampanas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCorreosCampanas, getCorreosCampanas } from "../campanasAPI";

function FormCrearCorreoDos({ submitSiguiente }) {
  const [sendNow, setSendNow] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const fechaID = useId();
  const horaID = useId();

  const addCorreoCount = useCampanas((state) => state.addCorreosEnviados);

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

  const { data: dataCampanas, isSuccess: isSuccessFetchCampana } = useQuery({
    queryFn: () => getCampanas(),
    queryKey: ["campanas"],
  });

  if (isSuccessFetchCampana) {
    var campanasTipoCorreo = dataCampanas.filter((campana) => {
      return campana.tipoCampana === "correo";
    });
  }

  useEffect(() => {
    if (sendNow) {
      setIsSubmitDisabled(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFinalForm = new FormData(e.target);
    const newCorreoDos = Object.fromEntries(newFinalForm);

    // setSubmitSiguiente((prevState) => ({
    //   ...prevState,
    //   ...newCorreoDos,
    // }));

    agregarCorreoCampana.mutate({
      ...submitSiguiente,
      ...newCorreoDos,
    });
    addCorreoCount();

    // Aquí puedes enviar el correo o realizar la acción deseada.
  };

  const handleConsoleLog = () => {
    console.log(submitSiguiente);
  };

  return (
    <form className={styles.formCrearCorreoCampana} onSubmit={handleSubmit}>
      <div className={styles.containerCorreoCliente}>
        <label htmlFor={"selectID"}>Enviar a:</label>
        <div className={styles.wrapperSelectTipoCorreo}>
          <select
            className={styles.selectCampanaCorreo}
            placeholder="Seleccionar campana"
          >
            <option value="all">Todas las campañas...</option>
            {campanasTipoCorreo &&
              campanasTipoCorreo.map((opcionesCampanas) => (
                <option key={opcionesCampanas.id} value={opcionesCampanas.id}>
                  {opcionesCampanas.name}
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
            name="date"
            id={fechaID}
            onChange={handleDateChange}
            required
          />
          <label htmlFor={horaID}>Hora:</label>
          <input
            type="time"
            value={time}
            name="time"
            id={horaID}
            onChange={handleTimeChange}
            required
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
      <button onClick={handleConsoleLog}>handleconsolelog</button>
    </form>
  );
}

export default FormCrearCorreoDos;
