import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext.jsx';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store.js';

// Mover adentro del componente renderizado
const Root = () => {
  const infoUser = useSelector((state) => state.userState.infoLogin);
if (!infoUser) return <p>Cargando sesión...</p>;

  return (
    <SocketProvider infoUser={infoUser}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
