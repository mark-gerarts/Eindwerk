using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.LokaalRepo
{
    public class LokaalRepository : ILokaalRepository
    {
        private SqlConnection _db;

        public LokaalRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }
        public void Delete(int id)
        {
            string query = "DELETE FROM Lokalen WHERE id = @id";
            _db.Execute(query, new { id });
        }

        public Lokaal Find(int id)
        {
            string query = "SELECT l.id, l.naam, c.id, c.naam " +
                "FROM Lokalen l " +
                "LEFT JOIN Campussen c ON c.id = l.campusID " +
                "WHERE l.id = @id";

            return _db.Query<Lokaal, Campus, Lokaal>(query, (l, c) =>
            {
                l.Campus = c;
                return l;
            }, new { id }).SingleOrDefault();
        }

        public IEnumerable<Lokaal> GetAll()
        {
            string query = "SELECT l.id, l.naam, c.id, c.naam " +
                "FROM Lokalen l " +
                "LEFT JOIN Campussen c ON c.id = l.campusID";

            return _db.Query<Lokaal, Campus, Lokaal>(query, (l, c) =>
            {
                l.Campus = c;
                return l;
            }).ToList();
        }

        public int Insert(Lokaal lokaal)
        {
            string query = "INSERT INTO Lokalen (campusID, naam) " +
                "OUTPUT Inserted.Id " +
                "VALUES (@campusID, @naam)";

            var parameters = new DynamicParameters();
            parameters.Add("@campusID", lokaal.Campus.Id);
            parameters.Add("@naam", lokaal.Naam);

            return _db.Query<int>(query, parameters).Single();
        }

        public void Update(Lokaal lokaal)
        {
            string query = "UPDATE Lokalen SET " +
                "campusID = @campusID, " +
                "naam = @naam " +
                "WHERE id = @id";

            var parameters = new DynamicParameters();
            parameters.Add("@campusID", lokaal.Campus.Id);
            parameters.Add("@naam", lokaal.Naam);
            parameters.Add("@id", lokaal.Id);

            _db.Execute(query, parameters);
        }
    }
}
