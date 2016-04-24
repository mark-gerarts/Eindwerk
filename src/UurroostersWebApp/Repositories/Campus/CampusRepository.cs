using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
{
    public class CampusRepository : ICampusRepository
    {
        private SqlConnection _db;

        public CampusRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }

        public void Delete(int id)
        {
            //ToDo: Foreign Key dependencies
            string query = "DELETE FROM Campussen WHERE id = @id";
            _db.Execute(query, new { id });
        }

        public Campus Find(int id)
        {
            string query = "SELECT id, naam FROM Campussen WHERE id = @id";
            return _db.Query<Campus>(query, new { id }).FirstOrDefault();
        }

        public IEnumerable<Campus> GetAll()
        {
            string query = "SELECT id, naam FROM Campussen";
            return _db.Query<Campus>(query).ToList();
        }

        public int Insert(Campus campus)
        {
            string query = "INSERT INTO Campussen (naam) OUTPUT Inserted.id VALUES (@naam)";
            return _db.Query<int>(query, new { campus.Naam }).Single();
        }

        public void Update(Campus campus)
        {
            string query = "UPDATE Campussen SET naam = @naam WHERE id = @id";
            _db.Execute(query, new { campus.Naam, campus.Id });
        }
    }
}
