import React from 'react';
import Tabela from '../Componentes/Tabela/Tabela';
import Menu from '../Componentes/Menu/Menu';
import withRouter from 'react-router-dom';

class Clientes extends React.Component {

    render() {
        return (
            <div>
                <Menu estilo='bg-dark' corTexto="text-white"></Menu>
                <Tabela></Tabela>
            </div>
        )
    }
}
export default Clientes;
