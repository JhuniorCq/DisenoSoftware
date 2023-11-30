import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import foto from './img/foto.png';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [dni, setDni] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  const isValidDNI = /^[\d]{8}$/;
  const isValidPassword = /^[\dA-Za-z!@#$%^&*()_+]{8,}$/;

  const handleSubmitFormLogin = async (e) => {
    e.preventDefault();

    if (!isValidDNI.test(dni) || !isValidPassword.test(clave) || rol === 'selecciona') {
      toast.warn('Por favor, ingresa datos válidos en todos los campos.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    try {
      const idRolMapping = {
        'call center': 1,
        'administrador de marketing': 2,
      };

      const response = await axios.post('https://modulo-marketing.onrender.com/iniciarSesion', {
        dni,
        contrasena: clave,
        id_rol: idRolMapping[rol],
      });

      const data = response.data;

      console.log('Respuesta completa del servidor:', data);

      // Verifica si los datos devueltos coinciden exactamente con los enviados
      if (data.length === 1 && data[0].dni === dni && data[0].contrasena === clave && data[0].id_rol === idRolMapping[rol]) {
        console.log('Valor de id_rol:', data[0].id_rol);

        // Datos correctos, redirige según el rol
        if (rol === 'administrador de marketing') {
          navigate('/gestion');
        } else {
          navigate('/callcenter');
        }
      } else {
        // Muestra un mensaje de credenciales inválidas basado en la respuesta del servidor
        toast.error(data.message || 'Credenciales inválidas. Por favor, verifica tus datos e intenta nuevamente.', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Muestra un mensaje de error genérico
      toast.error('Ha ocurrido un error. Por favor, inténtalo nuevamente más tarde.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="LGleft">
        <h1 className="LGh1">MÓDULO DE MARKETING</h1>
        <img src={foto} className="imagen" alt="Módulo de Marketing" />
      </div>
      <div className="LGright">
        <h2 className="LGh2">BIENVENIDO</h2>
        <form className="LGform" onSubmit={handleSubmitFormLogin}>
          <section className="dni">
            <input
              className="LGinput"
              type="text"
              id="dni2"
              placeholder=" DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </section>

          <section className="contraseña">
            <input
              className="LGinput"
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
              className="LGselect"
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
          <button className="LGingresar" type="submit">
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
