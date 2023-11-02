import { useEffect, useId, useState } from "react";
import styles from "./formsCrearCampana.module.css";
import FormsPublicoObjetivoCrearCampana from "./formsPublicoObjetivoCrearCampana";
import {useCampanas} from "../store/useCampanas";
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { crearCampanas } from "../campanasAPI";


const FormCrearCampana = (props) => {

    const {crearCampana, setCrearCampana} = props

    const [publicoObjetivoData, setPublicoObjetivoData] = useState(null);
    
    const [publicoObjetivoIsClicked, setPublicoObjetivoIsClicked] = useState(false);

    // capturando valores para poder restringir el botón cuando los campos obligatorios no están completos.
    const [secondFormIsSubmitted, setSecondFormIsSubmitted] = useState(false);
    const [nombreCampanaInput, setNombreCampanaInput] = useState(false);
    const [objetivosCampanaInput, setObjetivosCampanaInput] = useState(false);
    const [fechaInicioInput, setFechaInicioInput] = useState("");
    const [fechaFinInput, setFechaFinInput] = useState("");
    const [bothFormsAreSubmitted, setBothFormsAreSubmitted] = useState(false);
    
    // datos del store de zustand
    const dataCampanas = useCampanas(state => state.dataCampanas);
    const addDataCampana = useCampanas(state => state.addDataCampana);

    const nombreCampanaID = useId();
    const fechaInicioID = useId();
    const fechaFinID = useId();
    const objetivosCampanaID = useId();
    const notasID = useId(); 

    const queryClient = useQueryClient();
    const agregarCampana = useMutation({
        mutationFn : crearCampanas,
        onSuccess : () => {
            queryClient.invalidateQueries('campanas');
            console.log('campaña añadida correctamente!');
        }
    })

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Obtiene la fecha en formato "YYYY-MM-DD"


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const mainForm = Object.fromEntries(formData)

        const formCompleto ={
            ...mainForm,
            ...publicoObjetivoData,
        };
    
        agregarCampana.mutate({
            ...formCompleto,
            created : formattedDate
        });

        setCrearCampana(!crearCampana);

    }

    // establezco los valores del submenu popup para que pueda juntarlos con los valores de mi form "principal":
    const handleSecondFormSubmit = (dataSubMenu) => {
        setPublicoObjetivoData(dataSubMenu);
        console.log("resultados del sub formulario obtenidos! ")
    }

    const togglePublicoObjetivoClicked = (e) => {
        e.preventDefault();
        setPublicoObjetivoIsClicked(!publicoObjetivoIsClicked);
    } 

    // manejando cada input cuando cambia:

    const handleNombreCampanaInputChange = (e) => {
        setNombreCampanaInput(e.target.value);
    }

    const handleObjetivosCampanaInputChange = (e) => {
        setObjetivosCampanaInput(e.target.value);
    }

    useEffect(() => {
        const nombreCampanaCompleto = nombreCampanaInput.length >= 1;
        const objetivosCampanaCompleto = objetivosCampanaInput.length >= 1;
        const fechasCompletas = fechaInicioInput && fechaFinInput; // Verifica si ambas fechas están definidas
        setBothFormsAreSubmitted(secondFormIsSubmitted && nombreCampanaCompleto && objetivosCampanaCompleto && fechasCompletas);
        
    }, [nombreCampanaInput, objetivosCampanaInput, secondFormIsSubmitted, fechaInicioInput, fechaFinInput])

    return(
        <>
        <div className={styles.containerForm}>
            <form className={styles.formCrearCampana} onSubmit={handleSubmit}>
                <div className={styles.containerNombreCampana}>
                    <label htmlFor={nombreCampanaID}>Nombre de la campaña<span className={styles.asterisco}>*</span></label>
                    <input type="text" id={nombreCampanaID} required minLength={1} name="name" onChange={handleNombreCampanaInputChange} />
                </div>
                <div className={styles.containerFechaInicioCampanas}>
                    <label htmlFor={fechaInicioID}>Fecha de inicio<span className={styles.asterisco}>*</span></label>
                    <input type="date" id={fechaInicioID} 
                        required 
                        name="starts" 
                        value={fechaInicioInput}
                        onChange={(e) => setFechaInicioInput(e.target.value)}/>
                </div>
                <div className={styles.containerFechaFinCampanas}>
                    <label htmlFor={fechaFinID}>Fecha de finalización<span className={styles.asterisco}>*</span></label>
                    <input type="date" 
                        required 
                        id={fechaFinID}     
                        name="ends" 
                        value={fechaFinInput}
                        onChange={(e) => setFechaFinInput(e.target.value)}/>
                </div>

                <div className={styles.containerObjetivosCampanas}>
                    <label htmlFor={objetivosCampanaID}>Objetivos de la campaña<span className={styles.asterisco}>*</span></label>
                    <input type="text" id={objetivosCampanaID} required minLength={1} name="objectives" onChange={handleObjetivosCampanaInputChange}/>
                </div>

                <div className={styles.containerPublicoObjetivoCampana}>
                            <button onClick={togglePublicoObjetivoClicked} className={styles.publicoObjetivo}> Público objetivo de la campaña<span className={styles.asterisco}>*</span> </button>

                        </div>

                <div className={styles.containerNotas}>
                    <label htmlFor={notasID}>Notas</label>
                    <textarea className={styles.textAreaa} id={notasID} name="description"></textarea>
                </div>

                <div className={styles.botonesMenu}>
                    
                    <button 
                    className={`${styles.boton} ${styles.boton__crear} ${!bothFormsAreSubmitted ? styles.botonDisabled : ""}`}
                    disabled={!bothFormsAreSubmitted} >Crear
                    </button>
                </div>
            </form>
        </div>
        
            {publicoObjetivoIsClicked && (
                    <FormsPublicoObjetivoCrearCampana
                        publicoObjetivoIsClicked={publicoObjetivoIsClicked}
                        setPublicoObjetivoIsClicked={setPublicoObjetivoIsClicked}
                        setSecondFormIsSubmitted = {setSecondFormIsSubmitted}
                        onSecondFormSubmit={handleSecondFormSubmit} // Pasa la función de envío del segundo formulario
                    />
            )}
        </>
    );
}

export default FormCrearCampana;