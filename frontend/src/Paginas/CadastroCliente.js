import React from 'react';
import Menu from '../Componentes/Menu/Menu';
import Api from '../servicos/clientes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CadastroCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      idade: 0
    }

    this.mudarValorNome = this.mudarValorNome.bind(this);
    this.mudarValorIdade = this.mudarValorIdade.bind(this);
    this.Cadastrar = this.Cadastrar.bind(this);
  }

  mudarValorNome = event => {
    this.setState({ nome: event.target.value });
  }

  mudarValorIdade = event => {
    this.setState({ idade: event.target.value });
  }

  Cadastrar() {
    const user = {
      Nome: this.state.nome,
      Idade: this.state.idade
    };

    Api.post(`api/Clientes`, user)
      .then(res => {
        console.log(res);

      })
  }

  render() {
    return (
      <div>
        <Menu estilo='bg-dark' corTexto="text-white"></Menu>
        <div class="d-flex justify-content-center">
        <Form> 
          <Form.Row>
            <Form.Group>
              <Form.Label>Nome:</Form.Label>
              <Form.Control type="text" value={this.state.nome} onChange={this.mudarValorNome}></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>Idade:</Form.Label>
              
            </Form.Group>
          </Form.Row>
          <Form.Row>

              <Button className="form-control">Cadastrar</Button>
            
          </Form.Row>
        </Form>
        </div>
      </div>
    )
  }
}

export default CadastroCliente;
