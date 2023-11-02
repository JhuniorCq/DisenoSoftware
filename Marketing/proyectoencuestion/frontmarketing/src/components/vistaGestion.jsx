import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from "../styles/vistaGestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";  
import {useQuery} from "@tanstack/react-query";
import { getCampanas } from "./campanasAPI";

const VistaGestion = () => {

    const [busqueda, setBusqueda] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);

    const [opcionSeleccionada, setOpcionSeleccionada] = useState('Todas las campañas');

    // HACIENDO LA PETICION A LA 'BASE DE DATOS' CREADA ARTIFICIAL
    // data representa a todos los datos, sin usar useStates ni useEffects, ni nada raro
    const { isLoading, data, isError, error, isSuccess } = useQuery({
        queryKey: ['campanas'],
        queryFn: getCampanas
    });

    useEffect(() => {
        if (isSuccess) {
            setUsuarios(data);
            setTablaUsuarios(data);
        }
    }, [isSuccess, data]);

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
        console.log(e.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setUsuarios(resultadosBusqueda);
    }


    const cambiaaMes = () => {
        setOpcionSeleccionada('Este mes');
        console.log("cambiado a mes!");
    }

    const cambiaaCreadoRecientemente = () => {
        setOpcionSeleccionada('Creado recientemente');
        console.log("cambiado a recientemente!");
    }

    // igual necesitaremos esta opcion para volver al default.
    const cambiaaTodasLasCampanas = () => {
        setOpcionSeleccionada('Todas las campañas');
        console.log("cambiado a todas las campañas!");
    }
    
    if(isLoading) return <p>Loading...</p>
    else if(isError) return <p>Error : {error.message}</p>

    
    return(
        <main>
            
            <section className={styles.vistaCampanas}>
                <div className={styles.botonesCambiarVistaTabla}>
                <button className={styles.cambiarVistaTablaCampana} onClick={cambiaaTodasLasCampanas} >Todas las campañas</button>
                                <button className={styles.cambiarVistaTablaCampana} onClick={cambiaaMes}>Este mes</button>
                        <button className={styles.cambiarVistaTablaCampana} onClick={cambiaaCreadoRecientemente}>Creado recientemente</button>
                </div>


                <div className={styles.containerContenido}>

                    <div className={styles.barraBusqueda}>
                        <form className={styles.navSearch}>
                            <input className={styles.inputBar} type="text" value={busqueda} onChange={handleChange} placeholder="Buscar campañas..." minLength="1" />
                           
                            <button className={styles.navIconSearch} type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                    <div className={`${styles.containerTabla} table-responsive`}>
                        <table className="table table-info table-hover align-middle">
                            <thead className="table-light align-middle">
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre de la campaña</th>
                                    <th>Descripción</th>
                                    <th>Objetivos de la campaña</th>
                                    <th>Fecha de creación</th>
                                    <th>Fecha de inicio</th>
                                    <th>Fecha de fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios &&
                                    usuarios.filter(usuario => {
                                        if(opcionSeleccionada === 'Este mes'){
                                            const fechaActual = new Date();
                                            const fechaCreacion = new Date(usuario.created);
                                            return fechaActual.getFullYear() === fechaCreacion.getFullYear() && 
                                            fechaActual.getMonth() === fechaCreacion.getMonth();
                                            //comparamos que sea del mismo año la fecha ingresada (por si el usuario se equivoca en poner el año)
                                        }
                                        else if(opcionSeleccionada === 'Creado recientemente'){
                                            const fechaActual = new Date();
                                            const fechaCreacion = new Date(usuario.created);
                                            const tiempoTranscurrido = (fechaActual - fechaCreacion) / (1000 * 3600 * 24); // Calcula la diferencia en días
                                            return tiempoTranscurrido <= 3 && fechaActual.getFullYear() === fechaCreacion.getFullYear();
                                        }
                                        return true; //muestra todas las campañas por defecto.
                                    })

                                    .map((usuario) => (
                                        <tr key={usuario.id}>
                                            
                                            <td>{usuario.id}</td>
                                            <td className={styles.campanaDescripcion}>{usuario.name}</td>
                                            <td className={styles.campanaDescripcion}>{usuario.description}</td>
                                            <td className={styles.campanaDescripcion}>{usuario.objectives}</td>
                                            <td className={styles.campanaDescripcion}>{usuario.created.toLocaleString()}</td>
                                            <td className={styles.campanaDescripcion}>{usuario.starts.toLocaleString()}</td>
                                            <td className={styles.campanaDescripcion}>{usuario.ends.toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </main>
    );
}
export default VistaGestion;