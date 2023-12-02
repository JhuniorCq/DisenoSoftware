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
  const [campanasIDs, setCampanasIDs] = useState("all");
  const [idCampana, setIdCampana] = useState("-1");

  const handleChangeCallInput = (e) => {
    setInputCall(e.target.value);
  };

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

  const handleCampanaId = () => {
    if (campanasIDs === "all") {
      setIdCampana("-1");
    } else {
      setIdCampana(campanasIDs);
    }
  };

  const handleCampanaSelect = (e) => {
    setCampanasIDs(e.target.value);
    handleCampanaId();
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => getLlamadasCliente(idCampana),
    queryKey: ["clientesllamadas", { idCampana }],
  });

  if (isSuccess) {
    console.log(data);
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
          onChange={handleCampanaSelect}
        >
          <option value="all">Todas las campañas...</option>
          {campanasTipoLlamadaVigentes.map((opcionesCampanas) => (
            <option
              key={opcionesCampanas.campana_id}
              value={opcionesCampanas.campana_id}
            >
              {opcionesCampanas.nombre}
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
                <td>DNI</td>
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Fecha de nacimiento</td>
                <td>Departamento</td>
                <td>Distrito</td>
                <td>Correo</td>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((llamada) => (
                  <tr key={llamada.id}>
                    <td>{llamada.dni}</td>
                    <td>{llamada.nombre}</td>
                    <td>{llamada.apellido}</td>
                    <td>{llamada.fechanac.split("T")[0]}</td>
                    <td>{llamada.departamento}</td>
                    <td>{llamada.distrito}</td>
                    <td>{llamada.correo}</td>
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
