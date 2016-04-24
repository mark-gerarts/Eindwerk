using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
{
    public class KlasRepository : IKlasRepository
    {
        private SqlConnection _db;

        public KlasRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM Klassen WHERE id = @id";
            _db.Execute(query, new { id });
        }

        public Klas Find(int id)
        {
            string query = "SELECT k.id, k.naam, k.leerjaar, c.id, c.naam, sr.id, sr.naam " +
                "FROM Klassen k " +
                "LEFT JOIN Campussen c ON c.id = k.campusID " +
                "LEFT JOIN Studierichtingen sr ON sr.id = k.studierichtingID " +
                "WHERE k.id = @id";

            return _db.Query<Klas, Campus, Studierichting, Klas>(query, (k, c, sr) =>
            {
                k.Campus = c;
                k.Studierichting = sr;
                return k;
            }, new { id }).SingleOrDefault();
        }

        public IEnumerable<Klas> GetAll()
        {
            string query = "SELECT k.id, k.naam, k.leerjaar, c.id, c.naam, sr.id, sr.naam " +
                "FROM Klassen k " +
                "LEFT JOIN Campussen c ON c.id = k.campusID " +
                "LEFT JOIN Studierichtingen sr ON sr.id = k.studierichtingID";

            return _db.Query<Klas, Campus, Studierichting, Klas>(query, (k, c, sr) =>
            {
                k.Campus = c;
                k.Studierichting = sr;
                return k;
            }).ToList();
        }

        public int Insert(Klas klas)
        {
            string query = "INSERT INTO Klassen (studierichtingID, campusID, leerjaar, naam) " +
                "OUTPUT Inserted.Id " +
                "VALUES (@studierichtingID, @campusID, @leerjaar, @naam)";

            var parameters = new DynamicParameters();
            parameters.Add("@studierichtingID", klas.Studierichting.Id);
            parameters.Add("@campusID", klas.Campus.Id);
            parameters.Add("@leerjaar", klas.Leerjaar);
            parameters.Add("@naam", klas.Naam);

            return _db.Query<int>(query, parameters).Single();
        }

        public void Update(Klas klas)
        {
            string query = "UPDATE Klassen SET " +
                "studierichtingID = @studierichtingID, " +
                "campusID = @campusID, " +
                "leerjaar = @leerjaar, " +
                "naam = @naam " +
                "WHERE id = @id";

            var parameters = new DynamicParameters();
            parameters.Add("@studierichtingID", klas.Studierichting.Id);
            parameters.Add("@campusID", klas.Campus.Id);
            parameters.Add("@leerjaar", klas.Leerjaar);
            parameters.Add("@naam", klas.Naam);
            parameters.Add("@id", klas.Id);

            _db.Execute(query, parameters);
        }
    }
}
