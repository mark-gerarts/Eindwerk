using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
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

        public IEnumerable<Vak> GetVakkenByLeerkrachtId(int id)
        {
            string query = "SELECT v.id, v.naam " +
                "FROM LeerkrachtVakken lv " +
                "LEFT JOIN Vakken v " +
                "ON lv.vakID = v.id " +
                "WHERE lv.leerkrachtID = @id";
            var lookup = new Dictionary<int, Vak>();
            return _db.Query<Vak>(query, new { id }).ToList();
        }

        public int Insert(Vak vak)
        {
            string query = "INSERT INTO Vakken (naam) " +
                "OUTPUT Inserted.Id " +
                "VALUES (@naam)";
            return _db.Query<int>(query, new { vak.Naam }).Single();
        }

        public void Update(Vak vak)
        {
            string query = "UPDATE Vakken SET naam = @naam WHERE id = @id";
            _db.Execute(query, new { vak.Naam, vak.Id });
        }
    }
}
