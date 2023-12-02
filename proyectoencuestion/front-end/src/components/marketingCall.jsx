import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/callcenter.css";
import { useQuery } from "@tanstack/react-query";
import { getCallCenter, getCampanas } from "./campanasAPI";

const CallcenterM = () => {
  const [inputCall, setInputCall] = useState("");
  const [campanasIDs, setCampanasIDs] = useState("all");
  const [idCampana, setIdCampana] = useState("-1");

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

  const {
    isLoading,
    isError,
    error,
    data: dataCallCenterCampanas,
  } = useQuery({
    queryFn: () => getCallCenter(idCampana),
    queryKey: ["callcentercampanas", { idCampana }],
  });

  if (isLoading) return <p>Loading...</p>;
  else if (isError) return <p>Error : {error.message}</p>;

  // ...

  const handleCampanaSelect = (e) => {
    setCampanasIDs(e.target.value);
    handleCampanaId();
  };

  return (
    <div>
      <header className="CCheader">
        <a href="/" className="CCbutton1">
          Salir
        </a>
      </header>
      <div className="CCencabezado">
        <h3 className="CCh3">Llamadas</h3>
        <div className="CCcontainer">
          <ul className="CCul">
            <li>
              <a className="CCli">Clientes</a>
            </li>
          </ul>
        </div>
        <hr className="CChr" />
      </div>
      <div className="wrapperSelectTipoCorreo">
        <select
          className="selectCampanaCorreo"
          placeholder="Seleccionar campana"
          onChange={handleCampanaSelect}
        >
          <option value="all">Todas las campañas...</option>
          {isSuccessFetchCampana &&
            campanasTipoLlamadaVigentes.map((opcionesCampanas) => (
              <option
                key={opcionesCampanas.campana_id}
                value={opcionesCampanas.campana_id}
              >
                {opcionesCampanas.nombre}
              </option>
            ))}
        </select>
      </div>
      <div className={`table-responsive containerTable`}>
        <table className="table table-hover table-bordered table-info">
          <thead className="table-light">
            <tr className="bg-primary">
              {/* <td>Nombres</td>
              <td>Apellidos</td>
              <td>Celular</td> */}
              <td>Fecha de inicio</td>
              <td>Fecha de fin</td>
              <td>Hora de inicio</td>
              <td>Hora de fin</td>
              <td>Mensaje</td>
              <td>Celular</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dataCallCenterCampanas) &&
              dataCallCenterCampanas.map((llamada) => (
                <tr key={llamada.id}>
                  {/* <td>{llamada.dni}</td>
                  <td>{llamada.nombre}</td>
                  <td>{llamada.apellido}</td> */}
                  <td>{llamada.fecha_inicio.split("T")[0]}</td>
                  <td>{llamada.fecha_fin.split("T")[0]}</td>
                  <td>{llamada.hora_inicio}</td>
                  <td>{llamada.hora_fin}</td>
                  <td>{llamada.mensaje}</td>
                  <td>{llamada.numero}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallcenterM;
