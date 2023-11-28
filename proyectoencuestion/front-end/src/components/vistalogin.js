import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import foto from './img/foto.png';
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [dni, setDni] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  const isValidDNI = /^[\d]{8}$/; // Expresión regular para 7 dígitos numéricos
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/; // Mínimo 8 caracteres, al menos una letra y un número

  const handleSubmitFormLogin = (e) => {

    e.preventDefault();

    if (!isValidDNI.test(dni)) {
      toast.warn('Por favor, ingresa un DNI válido (7 dígitos numéricos).', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!isValidPassword.test(clave)) {
      toast.warn('Por favor, ingresa una contraseña válida (mínimo 8 caracteres con al menos una letra y un número).', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    if (rol === "administrador de marketing") {
      navigate('/gestion');
    } else {
      navigate('/callcenter');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="LGleft">
        <h1 className='LGh1'>MÓDULO DE MARKETING</h1>
        <img src={foto} className='imagen' />
      </div>
      <div className="LGright">
        <h2 className='LGh2'>BIENVENIDO</h2>
        <form className='LGform' onSubmit={handleSubmitFormLogin}>
          <section className="dni">
            <input className='LGinput'
              type="text"
              id="dni2"
              placeholder=" DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </section>

          <section className="contraseña">
            <input className='LGinput'
              type="password"
              name="clave"
              required
              placeholder="Password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </section>

          <section className="rol">
            <select className='LGselect'
              name="lenguajes"
              id="lang"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="selecciona">Selecciona tu rol</option>
              <option value="call center">Call center</option>
              <option value="administrador de marketing">Administrador de Marketing</option>
            </select>
          </section>
          <button className='LGingresar'>INGRESAR</button>
        </form>
      </div>
    </div>

  );
}
export default Login;