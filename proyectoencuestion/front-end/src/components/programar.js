import React from 'react';
import { Link } from "react-router-dom";
import "../styles/programar.css";

const ModalP = ({ show, handleClose, children }) => {
  const showHideClassName = show ? 'modal PROdisplay-block' : 'modal PROdisplay-none';

  return (
    <div className={showHideClassName}>
      <section className="PROmodal-main">
        <header className='PROheader'>
            <h6 className='PROh6'>El correo se enviara a las</h6>
        </header>
        
        {children}
       
        <button className='PROcancelar' onClick={handleClose}>Cancelar</button>
      <a className="PROsiguiente" href="/Sorteom">Programar</a>
        
      </section>
    </div>
  );
};

export default ModalP;
