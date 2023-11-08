import { useState } from "react";
import NavbarParteGris from "../navBarParteGris";
import styles from "./stylesLlamadas/llamadasAdministrar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ControlVistaLlamadas } from "./controlVistaLlamadas";
import { CrearLlamadaLateral } from "./asideCrearLlamada";
import { useQuery } from "@tanstack/react-query";
import { getLlamadasAdministrar } from "./llamadasAPI";

const LlamadasAdministrar = () => {
  const [inputCall, setInputCall] = useState("");
  const [buttonPressed, setButtonPressed] = useState("Todas las llamadas");

  const handleChangeCallInput = (e) => {
    setInputCall(e.target.value);
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: getLlamadasAdministrar,
    queryKey: "llamadasadministrar",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>There's an error {error}</p>;
  }

  if (isSuccess) {
    console.log(data);
    console.log(data[1].initialDateCall);
  }

  const handleButtonTodasLasLlamadas = () => {
    setButtonPressed("Todas las llamadas");
  };

  const handleButtonProgramadas = () => {
    setButtonPressed("Programadas");
  };

  const handleButtonRealizadas = () => {
    setButtonPressed("Realizadas");
  };

  return (
    <main>
      <NavbarParteGris />
      <ControlVistaLlamadas />
      <div className={styles.containerTotal}>
        <section className={styles.listaLlamadasSide}>
          <h2>Lista</h2>
          <div className={styles.containerListaButtons}>
            <button
              className={`${styles.btnList} ${
                buttonPressed === "Todas las llamadas"
                  ? styles.buttonPressed
                  : ""
              }`}
              onClick={handleButtonTodasLasLlamadas}
            >
              Todas las llamadas
            </button>
            <button
              className={`${styles.btnList} ${
                buttonPressed === "Programadas" ? styles.buttonPressed : ""
              }`}
              onClick={handleButtonProgramadas}
            >
              Programadas
            </button>
            <button
              className={`${styles.btnList} ${
                buttonPressed === "Realizadas" ? styles.buttonPressed : ""
              }`}
              onClick={handleButtonRealizadas}
            >
              Realizadas
            </button>
          </div>
        </section>
        <aside className={styles.vistaTablaLlamadas}>
          <div className={styles.containerInput}>
            <input
              type="text"
              onChange={handleChangeCallInput}
              placeholder="Buscar llamadas 📱"
              value={inputCall}
            />
          </div>
          <div className={`table-responsive ${styles.tablaLlamadas}`}>
            <table className="table table-hover table-bordered table-info">
              <thead className="table-light">
                <tr className="bg-primary">
                  <td>id</td>
                  <td>Guion de la llamada</td>
                  <td>Fecha de Inicio</td>
                  <td>Fecha de Fin</td>
                  <td>Hora de Inicio</td>
                  <td>Hora de Fin</td>
                </tr>
              </thead>
              <tbody>
                {buttonPressed === "Todas las llamadas" ? (
                  data.map((llamadaAdm) => (
                    <tr key={llamadaAdm.id}>
                      <td>{llamadaAdm.id}</td>
                      <td>{llamadaAdm.guionLlamada}</td>
                      <td>{llamadaAdm.initialDateCall}</td>
                      <td>{llamadaAdm.endDateCall}</td>
                      <td>{llamadaAdm.initialTimeCall}</td>
                      <td>{llamadaAdm.endTimeCall}</td>
                    </tr>
                  ))
                ) : buttonPressed === "Programadas" ? (
                  data
                    .filter((llamadaAdm) => {
                      const day = new Date();
                      const llamadaDate = new Date(llamadaAdm.initialDateCall);
                      return llamadaDate > day;
                    })
                    .map((filterLlamadaAdm) => (
                      <tr key={filterLlamadaAdm.id}>
                        <td>{filterLlamadaAdm.id}</td>
                        <td>{filterLlamadaAdm.guionLlamada}</td>
                        <td>{filterLlamadaAdm.initialDateCall}</td>
                        <td>{filterLlamadaAdm.endDateCall}</td>
                        <td>{filterLlamadaAdm.initialTimeCall}</td>
                        <td>{filterLlamadaAdm.endTimeCall}</td>
                      </tr>
                    ))
                ) : buttonPressed === "Realizadas" ? (
                  data
                    .filter((llamadaAdm) => {
                      const day = new Date();
                      const llamadaDate = new Date(llamadaAdm.endDateCall);
                      return day > llamadaDate;
                    })
                    .map((filterLlamadaAdm) => (
                      <tr key={filterLlamadaAdm.id}>
                        <td>{filterLlamadaAdm.id}</td>
                        <td>{filterLlamadaAdm.guionLlamada}</td>
                        <td>{filterLlamadaAdm.initialDateCall}</td>
                        <td>{filterLlamadaAdm.endDateCall}</td>
                        <td>{filterLlamadaAdm.initialTimeCall}</td>
                        <td>{filterLlamadaAdm.endTimeCall}</td>
                      </tr>
                    ))
                ) : (
                  <div>Dataaaa error</div>
                )}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
      <CrearLlamadaLateral />
    </main>
  );
};

export default LlamadasAdministrar;
