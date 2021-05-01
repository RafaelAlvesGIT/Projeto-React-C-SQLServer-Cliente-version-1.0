using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto01.DAOSistema
{
    public class ClienteDao
    {
        private IDbConnection Connection;

        public ClienteDao()
        {
            Conexao Conexao = new Conexao();
            Connection = Conexao.ConexaoBanco();
        }

        public IEnumerable<Clientes> Listar()
        {
            string Query = @"select * from Clientes";
            Connection.Open();
            return Connection.Query<Clientes>(Query);
        }

        public Clientes ListaPorId(int Id)
        {
            string Query = @"SELECT * FROM Clientes WHERE Id = " + Id;
            Connection.Open();
            Connection.Execute(Query);
            return Connection.Query<Clientes>(Query).FirstOrDefault();
        }

        public void Cadastrar(Clientes Cliente)
        {
            string Query = @"Insert Into Clientes " +
                                    "(Nome, Idade, DataCadastro) " +
                              "VALUES " +
                                   "(@Nome, @Idade, @DataCadastro)";
            Connection.Open();
            Connection.Execute(Query, Cliente);
        }

        public Clientes Atualizar(Clientes Cliente)
        {
            string Query = @"UPDATE Clientes " +
                                "SET Nome = '"+Cliente.Nome+ "', Idade = '"+Cliente.Idade+ "' "+
                           "WHERE Id = " + Cliente.Id;
            Connection.Open();
            Connection.Execute(Query);
        return Connection.Query<Clientes>(Query).FirstOrDefault();
        }

        public void Deletar(int id)
        {
            string Query = @"DELETE FROM Clientes Where Id = " + id;
            Connection.Open();
            Connection.Execute(Query);
        }
    }
}
