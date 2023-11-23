import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import foto from '../assets/img/foto.png';
import "../styles/login.css"; 



function Login() {
  const [dni, setDni] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate(); // Utilizamos useNavigate en lugar de useHistory

  const handleIngresarClick = () => {
    if (rol === "administrador de marketing") {
      navigate('/gestion'); // Reemplaza '/otra-ruta' con la ruta a la que deseas redirigir al rol 'call center'
    } else {
      navigate(''); // Ruta predeterminada cuando el rol no es 'call center'
    }
  };

  return (
    <div>
      <div className="left">
      <h1>MÓDULO DE MARKETING</h1>
        <img src={foto} className='imagen'/>
      </div>
      <div className="right">
        <h2>BIENVENIDO</h2>
        <form>
          <section className="dni">
            <input
              type="text"
              id="dni2"
              placeholder=" DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </section>

          <section className="contraseña">
            <input
              type="password"
              name="clave"
              required
              placeholder="Password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </section>

          <section className="rol">
            <select
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
          <button className='ingresar' onClick={handleIngresarClick}>INGRESAR</button>
        </form>
      </div>
    </div>
    
  );
}
export default Login;