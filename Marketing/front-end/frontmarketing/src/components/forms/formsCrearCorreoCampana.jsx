import styles from "./formsCrearCorreoCampana.module.css";
import { useEffect, useId, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createCorreosCampanas, getCorreosCampanas } from "../campanasAPI";
import { useCampanas } from "../store/useCampanas";

const FormsCrearCorreoCampana = (props) => {
  const {
    siguienteIsClicked,
    setSiguienteIsClicked,
    submitSiguiente,
    setSubmitSiguiente,
  } = props;

  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [asuntoIsCompleted, setAsuntoIsCompleted] = useState(false);
  const [mensajeIsCompleted, setMensajeIsCompleted] = useState(false);

  const tituloCorreoID = useId();
  const asuntoCorreoID = useId();
  const mensajeCorreoID = useId();

  const [correo, setCorreo] = useState("");

  const handleCorreoChange = (e) => {
    const nuevoCorreo = e.target.value;

    const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (correoRegex.test(nuevoCorreo)) {
      setCorreo(nuevoCorreo);
    } else {
      // poner mensaje de error
    }
  };

  const handleChangeAsuntoCorreo = (e) => {
    setAsuntoIsCompleted(e.target.value);
  };

  const handleChangeMensajeCorreo = (e) => {
    setMensajeIsCompleted(e.target.value);
  };

  useEffect(() => {
    handleCorreoChange({
      target: { value: correo },
    });
  }, [correo]);

  useEffect(() => {
    const correoCompleto = correo.length >= 5;
    const asuntoCompleto = asuntoIsCompleted.length >= 1;
    const mensajeCompleto = mensajeIsCompleted.length >= 1;

    if (correoCompleto && asuntoCompleto && mensajeCompleto) {
      setFormIsCompleted(true);
    }
  }, [asuntoIsCompleted, mensajeIsCompleted, correo]);

  const handleSubmitCorreo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCorreo = Object.fromEntries(formData);
    console.log(newCorreo);

    setSubmitSiguiente((prevState) => ({
      ...prevState,
      newCorreo,
    }));

    // verifico que se esté guardando el arreglo acá
    console.log(submitSiguiente);
    setSiguienteIsClicked(true);
  };

  return (
    <form
      className={`${styles.formCrearCorreoCampana} ${
        siguienteIsClicked ? styles.btnSiguienteIsClicked : ""
      }`}
      onSubmit={handleSubmitCorreo}
    >
      <div className={styles.containerTituloCorreo}>
        <label htmlFor={tituloCorreoID}>Título del correo</label>
        <input
          type="email"
          required
          placeholder="name@email.com"
          name="email"
          onChange={handleCorreoChange}
        />
        {/* {errorCorreo && <p className={styles.error}>{errorCorreo}</p>} */}
      </div>
      <div className={styles.containerAsuntoCorreo}>
        <label htmlFor={asuntoCorreoID}>Asunto:</label>
        <input
          type="text"
          required
          minLength={1}
          placeholder="Asunto aquí..."
          name="affair"
          onChange={handleChangeAsuntoCorreo}
        />
      </div>

      <div className={styles.containerMensajeCorreo}>
        <label htmlFor={mensajeCorreoID}>Mensaje:</label>
        <textarea
          required
          minLength={1}
          cols={10}
          name="message"
          onChange={handleChangeMensajeCorreo}
        />
      </div>

      <button
        className={`${styles.btnCrearCorreo1} ${
          !formIsCompleted ? styles.botonDisabled : ""
        }`}
        disabled={!formIsCompleted}
      >
        Siguiente
      </button>
    </form>
  );
};

export default FormsCrearCorreoCampana;
