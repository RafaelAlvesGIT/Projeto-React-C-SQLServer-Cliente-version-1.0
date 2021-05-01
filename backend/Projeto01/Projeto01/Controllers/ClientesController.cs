using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projeto01.DAOSistema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto01.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Clientes> Listar()
        {
            ClienteDao Cliente = new ClienteDao();
            return Cliente.Listar();
        }

        [HttpGet("Id")] 
        public Clientes ListarPorId(int Id)
        {
            ClienteDao ClienteDao = new ClienteDao();
            return ClienteDao.ListaPorId(Id);
        }

        [HttpPost]
        public void Cadastrar([FromBody] Clientes ClientePost)
        {
            ClientePost.DataCadastro = DateTime.Now;
            ClienteDao ClienteDao = new ClienteDao();
            ClienteDao.Cadastrar(ClientePost);
        }

        [HttpPut]
        public Clientes Atualizar([FromBody] Clientes ClientePut)
        {
            ClienteDao ClienteDao = new ClienteDao();
            return ClienteDao.Atualizar(ClientePut);
        }

        [HttpDelete("Id")]
        public void Delete(int Id)
        {
            ClienteDao ClienteDao = new ClienteDao();
            ClienteDao.Deletar(Id);
        }
    }
}
