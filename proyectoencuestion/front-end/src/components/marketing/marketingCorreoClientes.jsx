import styles from "../../styles/vistaCorreo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getPublicoCorreosCampanas } from "../campanasAPI";
import { useQuery } from "@tanstack/react-query";
import NavbarCorreo from "../navbarCorreo";
import VistaCorreo from "../vistaCorreo";
import { getCampanas } from "../campanasAPI";
import Select from "react-select";

export const CorreoClientes = () => {
  const [nameCliente, setNameCliente] = useState("");
  const [campanasIDs, setCampanasIDs] = useState("all");

  const { data: dataCampanas, isSuccess: isSuccessFetchCampana } = useQuery({
    queryFn: () => getCampanas(),
    queryKey: ["campanas"],
  });

  if (isSuccessFetchCampana) {
    const today = new Date();
    let campanasTipoCorreo = dataCampanas.filter((campana) => {
      return campana.tipo_campana === 2;
    });

    var campanasTipoCorreoVigentes = campanasTipoCorreo.filter(
      (campanasTipoCorreo) => {
        return new Date(campanasTipoCorreo.fecha_fin) > today;
      }
    );
    console.log(campanasTipoCorreoVigentes);
  }

  var id_campana = -1;

  const handleCampanaId = () => {
    if (campanasIDs === "all") {
      id_campana = -1;
    } else {
      id_campana = parseInt(campanasIDs);
    }
  };

  const {
    isLoading,
    isError,
    error,
    data: usuariosClientes,
  } = useQuery({
    queryFn: () => getPublicoCorreosCampanas(nameCliente, id_campana),
    queryKey: ["publicocorreoscampanas", { nameCliente }],
  });

  if (isLoading) return <p>Loading...</p>;
  else if (isError) return <p>Error : {error.message}</p>;

  const handleChange = (e) => {
    setNameCliente(e.target.value);
  };

  const handleCampanaSelect = (e) => {
    setCampanasIDs(e.target.value);
    handleCampanaId();
  };

  return (
    <body>
      <NavbarCorreo />
      <VistaCorreo />
      <main>
        <div className={styles.wrapperSelectTipoCorreo}>
          <select
            className={styles.selectCampanaCorreo}
            placeholder="Seleccionar campana"
            onChange={handleCampanaSelect}
          >
            <option value="all">Todas las campañas...</option>
            {campanasTipoCorreoVigentes.map((opcionesCampanas) => (
              <option
                key={opcionesCampanas.campana_id}
                value={opcionesCampanas.campana_id}
              >
                {opcionesCampanas.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.containerArribaClientes}>
          <strong>Publico Objetivo</strong>
          <div className={styles.barraBusqueda}>
            <form className={styles.navSearch}>
              <input
                className={styles.inputBar}
                type="text"
                value={nameCliente}
                placeholder="Buscar clientes..."
                minLength="1"
                onChange={handleChange}
              />
              {/* quité lo de value = {busqueda} y onChangue = {handleChange} porque aun no sé como se manejará la tabla */}
              <button className={styles.navIconSearch} type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
        </div>
        <div className={`table-responsive ${styles.containerTablaClientes}`}>
          <table className="table table-info table-hover align-middle">
            <thead className="table-light align-middle">
              <tr>
                <td>Id</td>
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Correo</td>
                <td>Género</td>
                <td>Celular</td>
              </tr>
            </thead>
            <tbody>
              {usuariosClientes &&
                usuariosClientes.map((usuario) => {
                  return (
                    <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.surname}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.gender}</td>
                    <td>{usuario.celphone}</td>
                  </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </body>
  );
};
