import React from 'react';
import logo from './logo.svg';
import './App.css';
import Rotas from './Componentes/Configuracao/Rotas/Rotas';
import Tabela from './Componentes/Tabela/Tabela';
import Menu from './Componentes/Menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css'; 
function App() {

  return (
    <div className="App">
        <Rotas></Rotas>
    </div>
  );
}

export default App;
