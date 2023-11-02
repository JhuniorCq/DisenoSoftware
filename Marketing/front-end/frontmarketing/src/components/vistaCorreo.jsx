import React, {useEffect, useState} from "react";
import styles from "../styles/vistaCorreo.module.css";
// importar iconos INDIVIDUALMENTE en caso sea necesario

import "bootstrap/dist/css/bootstrap.min.css";  
import { Link, useLocation } from "react-router-dom";

const VistaCorreo = () => {

    const [opcionVistaCorreo, setOpcionVistaCorreo] = useState("Clientes");
    // poniendo en negrita los anchors de ROUTES
    const location = useLocation();

    useEffect(() => {
        // Extraer la ruta actual de la ubicación
        const currentPath = location.pathname;

        // Mapear la ruta actual al valor de estado correspondiente
        if (currentPath === '/correo') {
            setOpcionVistaCorreo('Clientes');
        } else if (currentPath === '/administrar') {
            setOpcionVistaCorreo('Administrar');
        } else if (currentPath === '/analizar') {
            setOpcionVistaCorreo('Analizar');
        } else if (currentPath === '/estado') {
            setOpcionVistaCorreo('Estado');
        }
    }, [location.pathname]);

    return(
        <section>
            <div className={styles.containerRoutes}>
            <ul className={styles.redirection}>
                <li>
                    <Link className={`${styles.routes__correo} ${opcionVistaCorreo === 'Clientes' ? styles.highlightAnchor : ""}`} to={'/correo'}>Clientes</Link>
                </li>
                <li>
                    <Link className={`${styles.routes__correo} ${opcionVistaCorreo === 'Administrar' ? styles.highlightAnchor : ""}`} to={'/administrar'} >Administrar</Link>
                </li>
                <li>
                    <Link className={`${styles.routes__correo} ${opcionVistaCorreo === 'Analizar' ? styles.highlightAnchor : ""}`} to={'/analizar'} >Analizar</Link>
                </li>
                <li>
                    <Link className={`${styles.routes__correo} ${opcionVistaCorreo === 'Estado' ? styles.highlightAnchor : ""}`} to={'/estado'} >Estado</Link>
                </li>
            </ul>
        </div>

        <hr/>
            
        </section>
    );
}

export default VistaCorreo;