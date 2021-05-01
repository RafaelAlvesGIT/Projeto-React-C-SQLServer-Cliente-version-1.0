import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Menu from '../Tabela/Tabela';
import Route from '../Configuracao/Rotas/Rotas';

const MenuExport = (props) => {
  return (
    <div>
      <Nav className={props.estilo}>
        <NavItem>
          <NavLink>
          <Link className={props.corTexto}  to="/">Clientes</Link></NavLink>
        </NavItem>
        <NavItem>
        <NavLink>
          <Link className={props.corTexto} to="/Cadastro/">Cadastro Clientes</Link>
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default MenuExport;