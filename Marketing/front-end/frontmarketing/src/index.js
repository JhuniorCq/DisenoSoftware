import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

// necesario para pasarlo como prop y poder usar el react-query
// esto sirve para establecer DONDE se guardaran los datos en memoria caché.
// lo hace por defecto la biblioteca.
const queryClient = new QueryClient()

root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient} >
            <App />  
        </QueryClientProvider>
      </React.StrictMode>
);
