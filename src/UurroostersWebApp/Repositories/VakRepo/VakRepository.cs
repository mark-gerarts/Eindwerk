using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.VakRepo
{
    public class VakRepository : IVakRepository
    {
        private SqlConnection _db;

        public VakRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM LeerkrachtVakken WHERE vakID = @id " + 
                "DELETE FROM Vakken WHERE id = @id";
            _db.Execute(query, new { id });

        }

        public Vak Find(int id)
        {
            string query = "SELECT v.id, v.naam " +
                "FROM Vakken v " +
                "WHERE v.id = @id";
            return _db.Query<Vak>(query, new { id }).FirstOrDefault();
        }

        public IEnumerable<Vak> GetAll()
        {
            string query = "SELECT v.id, v.naam " +
                "FROM Vakken v ";
            return _db.Query<Vak>(query).ToList();
        }

        public int Insert(Vak vak)
        {
            string query = "INSERT INTO Vakken (Naam) " +
                "OUTPUT Inserted.Id " +
                "VALUES (@naam)";
            return _db.Query<int>(query, new { vak.Naam }).Single();
        }

        public void Update(Vak vak)
        {
            string query = "UPDATE Vakken SET naam = @naam, WHERE id = @id";
            _db.Execute(query, new { vak.Naam, vak.Id });
        }
    }
}
