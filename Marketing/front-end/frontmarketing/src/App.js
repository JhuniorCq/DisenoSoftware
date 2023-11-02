import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ModuloMarketing from "./components/marketing/marketingGestion";
import ModuloMarketingDos from "./components/marketing/marketingCalendario";
import ModuloMarketingTres from "./components/marketing/marketingCorreo";
import { CorreoClientes } from "./components/marketing/marketingCorreoClientes";
import { CorreoAdministrar } from "./components/marketing/marketingCorreoAdministrar";
import { CorreoAnalizar } from "./components/marketing/marketingCorreoAnalizar";
import { CorreoEstado } from "./components/marketing/marketingCorreoEstado";
import LlamadasClientes from "./components/llamadas/llamadas";
import LlamadasAdministrar from "./components/llamadas/llamadasAdministrar";
import LlamadasEstado from "./components/llamadas/llamadasEstado";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<ModuloMarketing />} />
        <Route path={'/calendario'} element={<ModuloMarketingDos />} />
        <Route path={'/correo'} element={<CorreoClientes />} />
        <Route path={'/administrar'} element={<CorreoAdministrar />} />
        <Route path={'/analizar'} element={<CorreoAnalizar />} />
        <Route path={'/estado'} element={<CorreoEstado />} />
        <Route path={'/llamadas'} element={<LlamadasClientes />} />
        <Route path={'/llamadas/administrarllamadas'} element={<LlamadasAdministrar />} />
        <Route path={'/llamadas/estadollamadas'} element={<LlamadasEstado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

