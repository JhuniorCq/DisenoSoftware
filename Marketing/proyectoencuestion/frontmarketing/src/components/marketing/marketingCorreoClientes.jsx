import styles from "../../styles/vistaCorreo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getPublicoCorreosCampanas } from "../campanasAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NavbarCorreo from "../navbarCorreo";
import VistaCorreo from "../vistaCorreo";
import debounce from "lodash.debounce";

export const CorreoClientes = () => {
  const [nameCliente, setNameCliente] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: usuariosClientes,
  } = useQuery({
    queryFn: () => getPublicoCorreosCampanas(nameCliente),
    queryKey: ["publicocorreoscampanas", { nameCliente }],
  });

  if (isLoading) return <p>Loading...</p>;
  else if (isError) return <p>Error : {error.message}</p>;

  const handleChange = (e) => {
    setNameCliente(e.target.value);
  };

  const debouncedSearch = debounce(() => {
    // Trigger a refetch when the user stops typing
    queryClient.refetchQueries(["publicocorreoscampanas", { nameCliente }]);
  }, 1000); // Adjust the debounce delay as needed

  return (
    <body>
      <NavbarCorreo />
      <VistaCorreo />
      <main>
        <div className={styles.containerArribaClientes}>
          <strong>Publico Objetivo</strong>
          <div className={styles.barraBusqueda}>
            <form className={styles.navSearch}>
              <input
                className={styles.inputBar}
                type="text"
                value={nameCliente}
                onChange={(e) => {
                  handleChange(e); // Update nameCliente in real-time
                  debouncedSearch(); // Trigger search after a delay
                }}
                placeholder="Buscar clientes..."
                minlength="1"
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
