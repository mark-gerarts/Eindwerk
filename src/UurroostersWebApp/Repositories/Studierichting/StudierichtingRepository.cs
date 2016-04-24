using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
{
    public class StudierichtingRepository : IStudierichtingRepository
    {
        private SqlConnection _db;

        public StudierichtingRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM Studierichtingen WHERE id = @id";
            _db.Execute(query, new { id });
        }

        public Studierichting Find(int id)
        {
            string query = "SELECT id, naam " +
                "FROM Studierichtingen " +
                "WHERE id = @id";
            return _db.Query<Studierichting>(query, new { id }).FirstOrDefault();
        }

        public IEnumerable<Studierichting> GetAll()
        {
            string query = "SELECT id, naam FROM Studierichtingen";
            return _db.Query<Studierichting>(query).ToList();
        }

        public int Insert(Studierichting studierichting)
        {
            string query = "INSERT INTO Studierichtingen (naam) " +
                "OUTPUT Inserted.Id " +
                "VALUES (@naam)";
            return _db.Query<int>(query, new { studierichting.Naam }).Single();
        }

        public void Update(Studierichting studierichting)
        {
            string query = "UPDATE Studierichtingen SET naam = @naam WHERE id = @id";
            _db.Execute(query, new { studierichting.Naam, studierichting.Id });
        }
    }
}
