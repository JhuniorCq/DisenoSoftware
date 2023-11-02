import { useEffect, useState } from "react";
import NavbarParteGris from "../navBarParteGris";
import styles from "./stylesLlamadas/llamadasClientes.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ControlVistaLlamadas } from "./controlVistaLlamadas";
import { CrearLlamadaLateral } from "./asideCrearLlamada";
import { getLlamadasCliente } from "./llamadasAPI";
import { useQuery } from "@tanstack/react-query";

const LlamadasClientes = () => {
  const [inputCall, setInputCall] = useState("");

  const handleChangeCallInput = (e) => {
    setInputCall(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getLlamadasCliente,
    queryKey: "clientesllamadas",
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
      <div className={styles.containerTotalClientes}>
        <h4>Público Objetivo</h4>
        <h6>Público objetivo</h6>
        <div className={styles.containerInput}>
          <input
            type="text"
            onChange={handleChangeCallInput}
            placeholder="Buscar llamadas 📱"
            value={inputCall}
          />
        </div>
        <div className={`table-responsive ${styles.containerTable}`}>
          <table className="table table-hover table-bordered table-info">
            <thead className="table-light">
              <tr className="bg-primary">
                <td>id</td>
                <td>Nombres</td>
                <td>Apellidos</td>
                <td>Correo electrónico</td>
                <td>Género</td>
                <td>Celular</td>
              </tr>
            </thead>
            <tbody>
              {data.map((llamada) => (
                <tr key={llamada.id}>
                  <td>{llamada.id}</td>
                  <td>{llamada.names}</td>
                  <td>{llamada.surnames}</td>
                  <td>{llamada.email}</td>
                  <td>{llamada.gender}</td>
                  <td>{llamada.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CrearLlamadaLateral />
    </main>
  );
};

export default LlamadasClientes;
