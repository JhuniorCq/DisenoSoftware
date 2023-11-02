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

  const handleChangeCallInput = (e) => {
    setInputCall(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getLlamadasAdministrar,
    queryKey: "llamadasadministrar",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>There's an error {error}</p>;
  }

  return (
    <main>
      <NavbarParteGris />
      <ControlVistaLlamadas />
      <div className={styles.containerTotal}>
        <section className={styles.listaLlamadasSide}>
          <h2>Lista</h2>
          <div className={styles.containerListaButtons}>
            <button className={styles.btnList}>Todas las llamadas</button>
            <button className={styles.btnList}>Programadas</button>
            <button className={styles.btnList}>Realizadas</button>
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
                  <td>Llamadas</td>
                </tr>
              </thead>
              <tbody>
                {data.map((llamadaAdm) => (
                  <tr key={llamadaAdm.id}>
                    <td>{llamadaAdm.id}</td>
                    <td>{llamadaAdm.llamada}</td>
                  </tr>
                ))}
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
