import styles from "../../styles/vistaCorreo.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";  
import { useCampanas } from "../store/useCampanas";
import NavbarCorreo from "../navbarCorreo";
import VistaCorreo from "../vistaCorreo";


export const CorreoAnalizar = (props) => {

    const countCorreos = useCampanas((state) => state.correosEnviados); // Invoca useCampanas como una función

    const {usuarios, handleChange} = props

    return(
        <body>
            <NavbarCorreo/>
            <VistaCorreo/>
            <main>
                <div className={styles.containerArribaAnalizar}>
                    
                    <strong className={styles.interaccionUsuariosAnalizar}>Interacción de destinatarios</strong>
                </div>
                <div className={styles.cardAnalisisEstadistico}>
                    <div className={styles.enviadosCard}>
                        <h3>Enviados</h3>
                        <h1>{countCorreos}</h1> {/* se cambian los ceros por el valor del estado que se usará */}
                        <small>{countCorreos} correos electrónicos</small>
                    </div>
                    <div className={styles.tasaDeAperturaCard}>
                        <h3>Tasa de apertura</h3>
                        <h1>0%</h1>
                        <small>0 abiertos</small>
                    </div>
                    <div className={styles.tasaDeClicksCard}>
                        <h3>Tasa de clicks</h3>
                        <h1>0%</h1>
                        <small>0 recibieron click</small>
                    </div>
                </div>
            </main>
        </body>

    );

}