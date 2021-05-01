import React from 'react';
import Clientes from '../../../Paginas/Clientes';
import CadastroCliente from '../../../Paginas/CadastroCliente';

import { HashRouter, Route, Switch } from 'react-router-dom';

export default class Routing extends React.Component {

    render() {
        return <HashRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Clientes} />
                    <Route exact path="/Cadastro/" component={CadastroCliente} />
                </Switch>
            </div>
        </HashRouter>
    }
}
