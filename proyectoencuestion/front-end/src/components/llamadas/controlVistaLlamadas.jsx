import { useState } from "react";
import styles from "./stylesLlamadas/controlVistaLlamadas.module.css";
import { Link } from "react-router-dom";
import { useCrearLlamada } from "./storeLlamadas/storeCrearLlamada";

export const ControlVistaLlamadas = () => {
  const toggleCrearLlamada = useCrearLlamada(
    (state) => state.toggleCrearLlamada
  );

  const handleCrearLlamada = () => {
    toggleCrearLlamada();
  };

  const vistaLlamadas = [
    {
      name: "Clientes",
      path: "",
    },
    {
      name: "Administrar",
      path: "/administrarllamadas",
    },
    {
      name: "Estado",
      path: "/estadollamadas",
    },
  ];

  return (
    <>
      <section className={styles.containerBeforeVistaLlamadas}>
        <h3>Llamadas</h3>
        <button
          className={styles.btnCrearLlamadas}
          onClick={handleCrearLlamada}
        >
          Crear Llamada
        </button>
      </section>
      <section className={styles.vistaLlamadas}>
        <ul className={styles.containerRouteLlamadas}>
          {vistaLlamadas.map((vista) => {
            return (
              <li key={vista.name}>
                <Link
                  className={styles.linkRoute}
                  to={`/llamadas${vista.path}`}
                >
                  {vista.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <hr />
      </section>
    </>
  );
};
