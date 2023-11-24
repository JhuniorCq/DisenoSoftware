
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/modal.css";
import ModalP from "../components/programar";

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  const [showModalP, setShowModalP] = useState(false);
  const handleOpenModalP = () => {
    setShowModalP(true);
  };

  const handleCloseModalP = () => {
    setShowModalP(false);
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <header className='REheader'>
            <h4 className='REh4'>Revisar y Enviar</h4>
        </header>
        <div className='REdiv'>
            <h6 className='REh6'>Público objetivo</h6>
            <div>
                <h6 className='REh6'>Asunto</h6>
                <div id="REcuadrotxt"></div>
            </div>
            <div>
                <h6 className='REh6'>Total de destinatarios:</h6>
                <div id="REcuadrotxt1"></div>
            </div>
            <h6 className='REh6'>Hora de envio</h6>

            <div className='REhora'>
                <h6 className='REh6'>Hora</h6>
                <div className="REcuadrotxt2"></div>
            </div>

            <div className='REfecha'>
             <h6 className='REh6'>Fecha</h6> 
             <div id="REcuadrotxt3"></div>
            </div>
          
        </div>
        {children}
        <button className='REcancelar' onClick={handleClose}>Cancelar</button>
        <button className='REsiguiente' onClick={handleOpenModalP}>Programar</button>
        <ModalP show={showModalP} handleClose={handleCloseModalP}>
        </ModalP>
      </section>
    </div>
  );
};

export default Modal;
