import { useEffect, useId, useState } from "react";
import styles from "./formsCrearCampana.module.css";
import FormsPublicoObjetivoCrearCampana from "./formsPublicoObjetivoCrearCampana";
import {
  createSegmentacion,
  getCampanas,
  useCreateCampana,
  useCreateSegmentacion,
} from "../campanasAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FormCrearCampana = (props) => {
  const { crearCampana, setCrearCampana } = props;

  const [publicoObjetivoData, setPublicoObjetivoData] = useState(null);

  const [publicoObjetivoIsClicked, setPublicoObjetivoIsClicked] =
    useState(false);

  // capturando valores para poder restringir el botón cuando los campos obligatorios no están completos.
  const [secondFormIsSubmitted, setSecondFormIsSubmitted] = useState(false);
  const [nombreCampanaInput, setNombreCampanaInput] = useState("");
  const [descuentoInput, setDescuentoInput] = useState(0);
  const [objetivosCampanaInput, setObjetivosCampanaInput] = useState("");
  const [fechaInicioInput, setFechaInicioInput] = useState("");
  const [fechaFinInput, setFechaFinInput] = useState("");
  const [tipoCampanaInput, setTipoCampanaInput] = useState("");
  const [notasInput, setNotasInput] = useState("");
  const [bothFormsAreSubmitted, setBothFormsAreSubmitted] = useState(false);

  const nombreCampanaID = useId();
  const fechaInicioID = useId();
  const fechaFinID = useId();
  const objetivosCampanaID = useId();
  const notasID = useId();
  const tipoCampanaID = useId();
  const descuentoCampanaID = useId();

  const agregarCampana = getCampanas();
  const agregarSegmentacion = createSegmentacion();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Obtiene la fecha en formato "YYYY-MM-DD"

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mainForm = Object.fromEntries(formData);

    const regexText = /^[a-zA-Z0-9ñÑ\s]*$/;
    const regexNumeric = /^[0-9]+$/;

    const fechaInicio = new Date(mainForm.fecha_inicio);
    const fechaFin = new Date(mainForm.fecha_fin);
    const notas = mainForm.descripcion;
    const objetivo = mainForm.objetivos;
    const nombreCampana = mainForm.nombre;
    const descuentoValue = mainForm.promocion; //nos ayuda a saber si este campo contiene numeros con su respectivo regex
    const descuento = parseInt(mainForm.promocion); //nos ayuda a establecer que el descuento no pase de 50% con una condicional
    const tipoCampanaEntero = parseInt(mainForm.tipo_campana);

    if (fechaInicio < today) {
      toast.warn("La fecha de inicio debe ser igual o posterior a hoy", {
        position: "bottom-right",
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
    if (fechaFin <= fechaInicio) {
      toast.warn(
        "La fecha de finalización debe ser al menos un día después de la fecha de inicio",
        {
          position: "bottom-right",
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

    if (notas.length < 10 || notas.length > 300) {
      toast.warn(
        "Las notas deben tener una longitud entre 10 y 300 caracteres",
        {
          position: "bottom-right",
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

    if (!regexText.test(objetivo)) {
      toast.warn("El objetivo no debe contener caracteres especiales", {
        position: "bottom-right",
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

    if (objetivo.length < 10 || objetivo.length > 80) {
      toast.warn(
        "El objetivo debe tener una longitud entre 10 y 80 caracteres",
        {
          position: "bottom-right",
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

    if (!regexText.test(nombreCampana)) {
      toast.warn(
        "El nombre de la campaña no debe contener caracteres especiales",
        {
          position: "bottom-right",
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

    if (nombreCampana.length < 5 || nombreCampana.length > 50) {
      toast.warn(
        "El nombre de la campaña deben tener una longitud entre 5 y 30 caracteres",
        {
          position: "bottom-right",
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

    if (!regexNumeric.test(descuentoValue)) {
      toast.warn("El descuento debe contener solo números", {
        position: "bottom-right",
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

    if (isNaN(descuento) || descuento < 0 || descuento > 50) {
      toast.warn("El descuento debe ser un número entre 0 y 50%", {
        position: "bottom-right",
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

    const formCompleto = {
      ...mainForm,
    };

    // agregarCampana.mutate({
    //   ...mainForm,
    //   fecha_creacion: formattedDate,
    // });

    // agregarSegmentacion.mutate({
    //   ...publicoObjetivoData,
    // });

    axios
      .post(
        "https://modulo-marketing.onrender.com/crearSegmentacion",
        publicoObjetivoData
      )
      .then((response) => {
        console.log(response.data);

        const formConSegmentacionID = {
          ...formCompleto,
          segmentacion_id: response.data.segmentacion_id,
        };

        axios
          .post(
            "https://modulo-marketing.onrender.com/crearCampana",
            formConSegmentacionID
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error al enviar datos:", error);
          });
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });

    // agregarCampana(mainForm);
    // agregarSegmentacion(publicoObjetivoData);

    setCrearCampana(!crearCampana);

    setNombreCampanaInput("");
    setObjetivosCampanaInput("");
    setFechaInicioInput("");
    setFechaFinInput("");
    setTipoCampanaInput("");
    setNotasInput("");
    setDescuentoInput(0);
  };

  // establezco los valores del submenu popup para que pueda juntarlos con los valores de mi form "principal":
  const handleSecondFormSubmit = (dataSubMenu) => {
    setPublicoObjetivoData(dataSubMenu);
    console.log("resultados del sub formulario obtenidos! ");
  };

  const togglePublicoObjetivoClicked = (e) => {
    e.preventDefault();
    setPublicoObjetivoIsClicked(!publicoObjetivoIsClicked);
  };

  // manejando cada input cuando cambia:

  const handleNombreCampanaInputChange = (e) => {
    setNombreCampanaInput(e.target.value);
  };

  const handleObjetivosCampanaInputChange = (e) => {
    setObjetivosCampanaInput(e.target.value);
  };

  const handleTipoCampanaChange = (e) => {
    if (e.target.value === "") {
      setTipoCampanaInput("");
      return;
    }
    setTipoCampanaInput(e.target.value);
  };

  useEffect(() => {
    const nombreCampanaCompleto = nombreCampanaInput.length >= 1;
    const objetivosCampanaCompleto = objetivosCampanaInput.length >= 1;
    const fechasCompletas = fechaInicioInput && fechaFinInput;
    const tipoCampanaCompleto = tipoCampanaInput;
    setBothFormsAreSubmitted(
      secondFormIsSubmitted &&
        nombreCampanaCompleto &&
        objetivosCampanaCompleto &&
        tipoCampanaCompleto &&
        fechasCompletas
    );
  }, [
    nombreCampanaInput,
    objetivosCampanaInput,
    secondFormIsSubmitted,
    fechaInicioInput,
    fechaFinInput,
    tipoCampanaInput,
  ]);

  return (
    <>
      <div className={styles.containerForm}>
        <ToastContainer />
        <form className={styles.formCrearCampana} onSubmit={handleSubmit}>
          <div className={styles.containerNombreCampana}>
            <label htmlFor={nombreCampanaID}>
              Nombre de la campaña<span className={styles.asterisco}>*</span>
            </label>
            <input
              type="text"
              id={nombreCampanaID}
              required
              value={nombreCampanaInput}
              name="nombre"
              onChange={handleNombreCampanaInputChange}
            />
          </div>
          <div className={styles.containerTipoCampana}>
            <label htmlFor={tipoCampanaID}>
              Tipo de la campaña<span className={styles.asterisco}>*</span>
            </label>
            <select
              id={tipoCampanaID}
              name="tipo_campana"
              value={tipoCampanaInput}
              onChange={handleTipoCampanaChange}
              required
            >
              <option value="">Selecciona una opción...</option>
              <option value="2">Correo</option>
              <option value="1">Llamada</option>
              <option value="3">Sorteo</option>
            </select>
          </div>

          <div
            className={` ${styles.containerDescuento} ${
              tipoCampanaInput === "2" || tipoCampanaInput === "1"
                ? styles.mostrarDescuento
                : ""
            }`}
          >
            <label htmlFor={descuentoCampanaID}>
              Descuento de la campaña (%)
              <span className={styles.asterisco}>*</span>
            </label>
            <input
              type="text"
              id={descuentoCampanaID}
              value={descuentoInput}
              name="promocion"
              placeholder="Descuento para los usuarios..."
              onChange={(e) => setDescuentoInput(e.target.value)}
            />
          </div>
          <div className={styles.containerFechaInicioCampanas}>
            <label htmlFor={fechaInicioID}>
              Fecha de inicio<span className={styles.asterisco}>*</span>
            </label>
            <input
              type="date"
              id={fechaInicioID}
              required
              name="fecha_inicio"
              value={fechaInicioInput}
              onChange={(e) => setFechaInicioInput(e.target.value)}
            />
          </div>
          <div className={styles.containerFechaFinCampanas}>
            <label htmlFor={fechaFinID}>
              Fecha de finalización
              <span className={styles.asterisco}>*</span>
            </label>
            <input
              type="date"
              required
              id={fechaFinID}
              name="fecha_fin"
              value={fechaFinInput}
              onChange={(e) => setFechaFinInput(e.target.value)}
            />
          </div>

          <div className={styles.containerObjetivosCampanas}>
            <label htmlFor={objetivosCampanaID}>
              Objetivos de la campaña
              <span className={styles.asterisco}>*</span>
            </label>
            <input
              type="text"
              id={objetivosCampanaID}
              required
              value={objetivosCampanaInput}
              name="objetivos"
              onChange={handleObjetivosCampanaInputChange}
            />
          </div>

          <div className={styles.containerPublicoObjetivoCampana}>
            <button
              onClick={togglePublicoObjetivoClicked}
              className={styles.publicoObjetivo}
            >
              {" "}
              Público objetivo de la campaña
              <span className={styles.asterisco}>*</span>{" "}
            </button>
          </div>

          <div className={styles.containerNotas}>
            <label htmlFor={notasID}>
              Notas <small>(entre 10 y 300 caracteres)</small>{" "}
            </label>
            <textarea
              className={styles.textAreaa}
              id={notasID}
              name="descripcion"
              value={notasInput}
              onChange={(e) => setNotasInput(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.botonesMenu}>
            <button
              className={`${styles.boton} ${styles.boton__crear} ${
                !bothFormsAreSubmitted ? styles.botonDisabled : ""
              }`}
              disabled={!bothFormsAreSubmitted}
            >
              Crear
            </button>
          </div>
        </form>
      </div>

      {publicoObjetivoIsClicked && (
        <FormsPublicoObjetivoCrearCampana
          publicoObjetivoIsClicked={publicoObjetivoIsClicked}
          setPublicoObjetivoIsClicked={setPublicoObjetivoIsClicked}
          setSecondFormIsSubmitted={setSecondFormIsSubmitted}
          tipoCampanaInput={tipoCampanaInput}
          onSecondFormSubmit={handleSecondFormSubmit} // Pasa la función de envío del segundo formulario
        />
      )}
    </>
  );
};

export default FormCrearCampana;
