import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ModuloMarketing from "./components/marketing/marketingGestion";
import ModuloMarketingDos from "./components/marketing/marketingCalendario";
import ModuloMarketingTres from "./components/marketing/marketingCorreo";
import { CorreoClientes } from "./components/marketing/marketingCorreoClientes";
import { CorreoAdministrar } from "./components/marketing/marketingCorreoAdministrar";
import LlamadasClientes from "./components/llamadas/llamadas";
import LlamadasAdministrar from "./components/llamadas/llamadasAdministrar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<ModuloMarketing />} />
        <Route path={'/calendario'} element={<ModuloMarketingDos />} />
        <Route path={'/correo'} element={<CorreoClientes />} />
        <Route path={'/administrar'} element={<CorreoAdministrar />} />
        <Route path={'/llamadas'} element={<LlamadasClientes />} />
        <Route path={'/llamadas/administrarllamadas'} element={<LlamadasAdministrar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

