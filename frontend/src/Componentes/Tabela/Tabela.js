import React from 'react';
import Api from '../../servicos/clientes';
import { InputGroup, InputGroupText, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class Tabela extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            nome: "",
            idEditar: 0,
            idade: 0,
            show: false,
            idExcluir: 0,
            flagCadastrar:false,
            nomeCadastrar: '',
            idadeCadastrar: 0
        }

        this.AtualizarCampo = this.AtualizarCampo.bind(this);
        this.MudarNome = this.MudarNome.bind(this);
        this.MudarIdade = this.MudarIdade.bind(this);
        this.Excluir = this.Excluir.bind(this);
        this.ChamarGet = this.ChamarGet.bind(this);
        this.CancelarEdicao = this.CancelarEdicao.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.mudarValorNome = this.mudarValorNome.bind(this);
        this.mudarValorIdade = this.mudarValorIdade.bind(this);
        this.Cadastrar = this.Cadastrar.bind(this);
        this.DesaparecerCadastro = this.DesaparecerCadastro.bind(this);
        this.AbrirCadastrar = this.AbrirCadastrar.bind(this);
    }

    handleClose() {
        this.setState({ show: false, idExcluir: 0 });
    }

    handleShow(id) {
        this.setState({ show: true, idExcluir: id });
        
    }

    async componentDidMount() {
        this.ChamarGet();
    }

    ChamarGet() {
        Api.get('api/Clientes')
            .then(res => {
                console.log(res);
                this.setState({ clientes: res.data });
            })

    }

    MudarNome = event => {
        this.setState({ nome: event.target.value });
    }

    MudarIdade = event => {
        this.setState({ idade: event.target.value });
    }

    mudarValorNome = event => {
        this.setState({ nomeCadastrar: event.target.value });
      }
    
    mudarValorIdade = event => {
        this.setState({ idadeCadastrar: event.target.value });
    }

    DesaparecerCadastro = event => {
        this.setState({ flagCadastrar: false});
    }

    Cadastrar() 
    {
        const user = {
          Nome: this.state.nomeCadastrar,
          Idade: this.state.idadeCadastrar
        };
    
        Api.post(`api/Clientes`, user)
          .then(res => {
            console.log(res);
        })
    }

    AbrirCadastrar()
    {
        if(this.state.flagCadastrar)
        {
            this.setState({ flagCadastrar: false});
        }else{
            this.setState({ flagCadastrar: true});
        }
        
    }

    Atualizar(id) {
        Api.get(`api/Clientes/id?id=` + id)
            .then(res => {
                console.log(res);
                this.setState({
                    idEditar: res.data.id,
                    nome: res.data.nome,
                    idade: res.data.idade
                })
            })
    }

    Excluir() {
        Api.delete(`api/Clientes/id?id=` + this.state.idExcluir)
            .then(res => {
                this.handleClose();
                this.ChamarGet();
            })
    }

    AtualizarCampo() {
        const Atualizar = {
            Id: this.state.idEditar,
            Nome: this.state.nome,
            Idade: this.state.idade
        };

        Api.put(`api/Clientes/`, Atualizar)
            .then(res => {
                this.setState({
                    idEditar: 0
                })
                this.ChamarGet();
            })
    }

    CancelarEdicao() {
        this.setState({
            idEditar: 0
        })
    }

    render() {
        let ListaTr = [];
        
        if(this.state.flagCadastrar)
        {
            ListaTr.push( 
                <tr>
                    <td></td>
                    <td>
                    <Form.Group>
                                    <InputGroup>
                                        <InputGroupText>Nome</InputGroupText>
                        <Form.Control type="text" value={this.state.nomeCadastrar} onChange={this.mudarValorNome}></Form.Control>
                                </InputGroup>
                                </Form.Group>
                    </td>
                    <td>
                    <Form.Group>
                                    <InputGroup>
                                        <InputGroupText>Idade</InputGroupText>
                        <Form.Control type="number" value={this.state.idadeCadastrar} onChange={this.mudarValorIdade}></Form.Control>
                        </InputGroup>
                                </Form.Group>
                    </td>
                    <td>
                        <Button variant="primary"  onClick={this.Cadastrar}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button variant="danger" onClick={() => { this.DesaparecerCadastro() }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </td>
                    <td></td>
                </tr>);
        }
        if(this.state.clientes.length > 0)
        {
            this.state.clientes.map(cliente => {
                if (cliente.id == this.state.idEditar) {
                    ListaTr.push(
                        <tr>
                            <td></td>
                            <td>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroupText>Nome</InputGroupText>
                                        <Form.Control type="text" className="form-control" onChange={this.MudarNome} value={this.state.nome}></Form.Control>
                                    </InputGroup>
                                </Form.Group>
                            </td>
                            <td>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroupText>Idade</InputGroupText>
                                        <Form.Control type="number" className="form-control" onChange={this.MudarIdade} value={this.state.idade}></Form.Control>
                                    </InputGroup>
                                </Form.Group>
                            </td>
                            <td>
                                <Button onClick={this.AtualizarCampo} variant="primary">
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button>
                                <Button onClick={this.CancelarEdicao} variant="danger">
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </td>
                            <td></td>
                        </tr>
                    )
                } else {
                    ListaTr.push(
                        <tr>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.idade}</td>
                            <td>
                                <Button variant="warning" onClick={() => { this.Atualizar(cliente.id) }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => { this.handleShow(cliente.id) }}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>
                    )
                }
            })
        }

        return (
            <div>
                <Button variant="primary" onClick={this.AbrirCadastrar}>Cadastrar</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deseja Excluir?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja excluir esse registro?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                           Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.Excluir}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListaTr}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Tabela;