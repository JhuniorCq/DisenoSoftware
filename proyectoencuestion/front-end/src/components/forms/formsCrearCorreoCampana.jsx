import styles from "./formsCrearCorreoCampana.module.css";
import { useEffect, useId, useState } from "react";
import { useFormCorreo } from "../marketing/storeCorreo/useFormCorreo";

const FormsCrearCorreoCampana = (props) => {
  const { siguienteIsClicked, setSiguienteIsClicked } = props;

  const [formIsCompleted, setFormIsCompleted] = useState(false);
  const [asuntoIsCompleted, setAsuntoIsCompleted] = useState(false);
  const [mensajeIsCompleted, setMensajeIsCompleted] = useState(false);

  const tituloCorreoID = useId();
  const asuntoCorreoID = useId();
  const mensajeCorreoID = useId();

  const [tituloCorreo, setTituloCorreo] = useState("");

  const handleTituloChange = (e) => {
    setTituloCorreo(e.target.value);
  };

  const handleChangeAsuntoCorreo = (e) => {
    setAsuntoIsCompleted(e.target.value);
  };

  const handleChangeMensajeCorreo = (e) => {
    setMensajeIsCompleted(e.target.value);
  };

  const methodAddDataFormCorreo = useFormCorreo(
    (state) => state.methodAddDataFormCorreo
  );

  useEffect(() => {
    const tituloCompleto = tituloCorreo.length >= 5;
    const asuntoCompleto = asuntoIsCompleted.length >= 5;
    const mensajeCompleto = mensajeIsCompleted.length >= 1;

    if (tituloCompleto && asuntoCompleto && mensajeCompleto) {
      setFormIsCompleted(true);
    }
  }, [asuntoIsCompleted, mensajeIsCompleted, tituloCorreo]);

  const handleSubmitCorreo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCorreo = Object.fromEntries(formData);
    console.log(newCorreo);

    methodAddDataFormCorreo(newCorreo);
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
          type="text"
          required
          placeholder="Título..."
          name="titleCorreo"
          onChange={handleTituloChange}
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
