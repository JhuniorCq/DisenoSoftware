import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login1 from "./components/marketing/login";
import ModuloMarketing from "./components/marketing/marketingGestion";
import ModuloMarketingDos from "./components/marketing/marketingCalendario";
import { CorreoClientes } from "./components/marketing/marketingCorreoClientes";
import { CorreoAdministrar } from "./components/marketing/marketingCorreoAdministrar";
import LlamadasClientes from "./components/llamadas/llamadas";
import LlamadasAdministrar from "./components/llamadas/llamadasAdministrar";
import SorteoMrk from "./components/marketing/marketingSorteo";
import Vistaparti from "./components/vistaParticipantes";
import Configuracion from "./components/vistaConfiguracion";
import Sorteo from "./components/marketing/marketingSorteo";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login1/>} />
        <Route path={'/gestion'} element={<ModuloMarketing />} />
        <Route path={'/calendario'} element={<ModuloMarketingDos />} />
        <Route path={'/correo'} element={<CorreoClientes />} />
        <Route path={'/administrar'} element={<CorreoAdministrar />} />
        <Route path={'/llamadas'} element={<LlamadasClientes />} />
        <Route path={'/llamadas/administrarllamadas'} element={<LlamadasAdministrar />} />
        <Route path={'/Sorteom'} element={<SorteoMrk/>} />
        <Route path= {'/Vistap'} element={<Vistaparti />} />
        <Route path= {'/Vistac'} element={<Configuracion />} />
        <Route path= {'/Vistas'} element={<Sorteo/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

