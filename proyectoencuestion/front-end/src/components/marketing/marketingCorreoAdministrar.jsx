import styles from "../../styles/vistaCorreo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCorreosCampanas } from "../campanasAPI";
import NavbarCorreo from "../navbarCorreo";
import VistaCorreo from "../vistaCorreo";

export const CorreoAdministrar = () => {
  const [busquedaAdm, setBusquedaAdm] = useState("");
  const [usuariosAdm, setUsuariosAdm] = useState([]);
  const [tablaUsuariosAdm, setTablaUsuariosAdm] = useState([]);

  const [botonCorreo, setBotonCorreo] = useState("Todos los correos");

  const { isLoading, isError, error, data, isSuccess, isFetched } = useQuery({
    queryFn: getCorreosCampanas,
    queryKey: ["correoscampanascreadas"],
  });

  useEffect(() => {
    if (isSuccess) {
      const currentDate = new Date();
      const correosActualizados = data.map((correo) => {
        const correoDateTime = new Date(`${correo.date}T${correo.time}`);
        if (currentDate >= correoDateTime) {
          return { ...correo, estado: "realizados" };
        }
        return correo;
      });
      setUsuariosAdm(correosActualizados);
      setTablaUsuariosAdm(correosActualizados);
    }
  }, [isSuccess]);

  const filtrarAdm = (terminoBusqueda) => {
    var resultadosBusqueda = tablaUsuariosAdm.filter((elemento) => {
      if (
        elemento.email
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuariosAdm(resultadosBusqueda);
  };

  const handleChange = (e) => {
    setBusquedaAdm(e.target.value);
    filtrarAdm(e.target.value);
    console.log(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  else if (isError) return <p>Error : {error.message}</p>;

  // resaltamos el modo de correo elegido.

  const toggleTodosLosCorreos = () => {
    setBotonCorreo("Todos los correos");
  };

  const toggleCorreosProgramados = () => {
    setBotonCorreo("Programados");
  };

  const toggleCorreosEnviados = () => {
    setBotonCorreo("Enviados");
  };

  return (
    <div>
      <NavbarCorreo />
      <VistaCorreo />
      <main className={styles.parteAdministrar}>
        <aside className={styles.parteListaIzquierda}>
          <h1 className={styles.tituloLista}>Lista</h1>
          <div className={styles.containerBotonesLista}>
            <button
              className={`${styles.botonLista} ${
                botonCorreo === "Todos los correos"
                  ? styles.highlightButton
                  : ""
              }`}
              onClick={toggleTodosLosCorreos}
            >
              Todos los correos
            </button>
            <button
              className={`${styles.botonLista} ${
                botonCorreo === "Programados" ? styles.highlightButton : ""
              }`}
              onClick={toggleCorreosProgramados}
            >
              Programados
            </button>
            <button
              className={`${styles.botonLista} ${
                botonCorreo === "Enviados" ? styles.highlightButton : ""
              }`}
              onClick={toggleCorreosEnviados}
            >
              Enviados
            </button>
          </div>
        </aside>
        <section className={styles.parteVisionCorreoDerecha}>
          <div className={styles.barraBusqueda}>
            <form className={styles.navSearch}>
              <input
                className={styles.inputBar}
                onChange={handleChange}
                value={busquedaAdm}
                type="text"
                placeholder="Buscar correos..."
                minLength="1"
              />
              {/* quité lo de value = {busqueda} y onChangue = {handleChange} porque aun no sé como se manejará la tabla */}
              <button className={styles.navIconSearch} type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
          <div className="table-responsive">
            <table className="table table-info table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Título del correo</th>
                  <th>Asunto</th>
                  <th>Id campaña</th>
                  <th>Fecha de envío</th>
                  <th>Hora de envío</th>
                  {botonCorreo === "Todos los correos" && <th>Estado</th>}
                </tr>
              </thead>
              <tbody>
                {usuariosAdm && botonCorreo === "Todos los correos" ? (
                  usuariosAdm.map((correo) => (
                    <tr key={correo.id}>
                      <td>{correo.id}</td>
                      <td>{correo.titleCorreo}</td>
                      <td>{correo.affair}</td>
                      <td>{correo.tipoCampana}</td>
                      <td>{correo.date}</td>
                      <td>{correo.time}</td>
                      <td>{correo.estado}</td>
                    </tr>
                  ))
                ) : usuariosAdm && botonCorreo === "Programados" ? (
                  usuariosAdm
                    .filter((correo) => {
                      const currentDate = new Date();
                      const correoDateTime = new Date(
                        `${correo.date}T${correo.time}`
                      );
                      return currentDate < correoDateTime;
                    })
                    .map((correo) => (
                      <tr key={correo.id}>
                        <td>{correo.id}</td>
                        <td>{correo.titleCorreo}</td>
                        <td>{correo.affair}</td>
                        <td>{correo.tipoCampana}</td>
                        <td>{correo.date}</td>
                        <td>{correo.time}</td>
                      </tr>
                    ))
                ) : usuariosAdm && botonCorreo === "Enviados" ? (
                  usuariosAdm
                    .filter((correo) => {
                      const currentDate = new Date();
                      const correoDateTime = new Date(
                        `${correo.date}T${correo.time}`
                      );
                      return currentDate >= correoDateTime;
                    })
                    .map((correo) => (
                      <tr key={correo.id}>
                        <td>{correo.id}</td>
                        <td>{correo.titleCorreo}</td>
                        <td>{correo.affair}</td>
                        <td>{correo.tipoCampana}</td>
                        <td>{correo.date}</td>
                        <td>{correo.time}</td>
                      </tr>
                    ))
                ) : (
                  <div> Dataaaaaa tablita</div>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};
