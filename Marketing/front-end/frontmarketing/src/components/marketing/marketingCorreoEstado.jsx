import styles from "../../styles/vistaCorreo.module.css";
import "bootstrap/dist/css/bootstrap.min.css";  
import NavbarCorreo from "../navbarCorreo";
import VistaCorreo from "../vistaCorreo";
import { useCampanas } from "../store/useCampanas";

export const CorreoEstado = () => {
    
    const countCorreos = useCampanas((state) => state.correosEnviados); // Invoca useCampanas como una función

    return(
        <body>
            <NavbarCorreo/>
            <VistaCorreo/>
            <main>
                <div className={styles.cardAnalisisParteEstado}>
                    <div className={styles.enviadosCardParteEstado}>
                        <h3>Enviados</h3>
                        <h1>{countCorreos}</h1> {/* se cambian los ceros por el valor del estado que se usará */}
                        <small>{countCorreos} correos electrónicos</small>
                    </div>
                    <div className={styles.tasaDeAperturaCardParteEstado}>
                        <h3>Tasa de apertura</h3>
                        <h1>0%</h1>
                        <small>0 abiertos</small>
                    </div>
                    <div className={styles.tasaDeClicksCardParteEstado}>
                        <h3>Tasa de clicks</h3>
                        <h1>0%</h1>
                        <small>0 recibieron click</small>
                    </div>
                </div>
                <strong className={styles.evolucionParteEstado}>Evolución</strong>
                <div className={styles.containerParteGraficoEstadisticoParteEstado}>
                    <div className={styles.graficoEstado}>
                        Colocar gráfico aquí
                    </div>
                </div>
            </main>
        </body>
    )
}