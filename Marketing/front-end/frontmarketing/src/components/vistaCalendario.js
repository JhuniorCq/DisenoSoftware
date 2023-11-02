
import { useEffect, useState } from "react";
import styles from "../styles/vistaCalendario.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons"

const VistaCalendario = () => {

        const [mesActuaal, setMesActual] = useState("");
        const [crearNota, setCrearNota] = useState(false);

        const toggleCrearNota = () => {
            setCrearNota(!crearNota);
        }

        useEffect(() => {
          const nombresMeses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ];
          const mesActualPorJs = new Date().getMonth();
          setMesActual(`${nombresMeses[mesActualPorJs]}, 2023`);
        }, []);
      

    return(

        <section className={styles.calendario}>
            <div class={styles.seleccionarVistaPorFechas}>

                <div class={styles.fechas}>
                    <div class={styles.mes}>
                        <p>Mes</p>
                    </div>
                    <div class={`${styles.semana} ${styles.a}`}>
                        <p>Semana</p>
                    </div>
                    <div class={styles.dia}>
                        <p>Día</p>
                    </div>
                </div>

                <button class={styles.crearTareaBtn} onClick={toggleCrearNota}>
                    Crear Nota
                </button>

            </div>

            <p class={styles.mesActual}>{mesActuaal}</p>

            <div className={`${styles.crearNotass} ${crearNota ? styles.open : ''}`}>

                <div className={styles.cerrarMenu} onClick={toggleCrearNota}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    
                    <div className={styles.containerForm}>
                        <form className={styles.formCrearNota}>
                            
                            <div className={styles.containerTituloNota}>
                                <label for='tituloNota'>Titulo</label>
                                <input type="text" id="tituloNota" required minLength={1} />
                            </div>

                            
                            <div className={styles.containerFechaNota}>
                                <label for='fecha'>Fecha</label>
                                <input type="date" id="fecha" required />
                            </div>

                            <div className={styles.containerNotas}>
                                <label for='notas'>Notas</label>
                                <textarea className={styles.textAreaa} id="notas"></textarea>
                            </div>

                            <div className={styles.botonesMenu}>
                                {/* falta poner la conectividad a la base de datos */}
                                <button type="submit" className={`${styles.boton} ${styles.boton__crear}`} >Crear</button>
                                <button className={`${styles.boton} ${styles.boton__cancelar}`} onClick={toggleCrearNota}>Cancelar</button>
                            </div>

                        </form>
                    </div>
            </div>

        </section>

    );
}

export default VistaCalendario;