import { useEffect, useState } from "react";
import NavbarParteGris from "../navBarParteGris";
import styles from "./stylesLlamadas/llamadasClientes.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ControlVistaLlamadas } from "./controlVistaLlamadas";
import { CrearLlamadaLateral } from "./asideCrearLlamada";
import { getLlamadasCliente } from "./llamadasAPI";
import { useQuery } from "@tanstack/react-query";
import { getCampanas } from "../campanasAPI";

const LlamadasClientes = () => {
  const [inputCall, setInputCall] = useState("");

  const handleChangeCallInput = (e) => {
    setInputCall(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getLlamadasCliente,
    queryKey: "clientesllamadas",
  });

  const { data: dataCampanas, isSuccess: isSuccessFetchCampana } = useQuery({
    queryFn: () => getCampanas(),
    queryKey: ["campanas"],
  });

  if (isSuccessFetchCampana) {
    const today = new Date();

    let campanasTipoLlamada = dataCampanas.filter((campana) => {
      return campana.tipoCampana === "llamada";
    });
    var campanasTipoLlamadaVigentes = campanasTipoLlamada.filter(
      (campanasTipoLlamada) => {
        return new Date(campanasTipoLlamada.ends) > today;
      }
    );
  }

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
      <div className={styles.wrapperSelectTipoCorreo}>
        <select
          className={styles.selectCampanaCorreo}
          placeholder="Seleccionar campana"
        >
          <option value="all">Todas las campañas...</option>
          {campanasTipoLlamadaVigentes.map((opcionesCampanas) => (
            <option key={opcionesCampanas.id} value={opcionesCampanas.id}>
              {opcionesCampanas.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.containerTotalClientes}>
        <h4>Público Objetivo</h4>

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
