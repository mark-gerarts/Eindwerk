using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.LesRepo
{
    public class LesRepository : ILesRepository
    {
        private SqlConnection _db;

        public LesRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM Lessen WHERE id = @id";

            _db.Execute(query, new { id });
        }

        public IEnumerable<Les> GetByKlasID(int id)
        {
            //Mss naar SP
            string query = "SELECT " +
                    "l.id, l.jaar, " +
                    "lb.id, lb.starttijd, lb.eindtijd, " +
                    "dag.id, dag.naam, " +
                    "lrk.id, lrk.naam, lrk.voornaam, " +
                    "v.id, v.naam, " +
                    "lok.id, lok.naam, " +
                    "c.id, c.naam " +
                "FROM " +
                    "Lessen l " +
                    "JOIN Lesblokken lb ON l.lesblokID = lb.id " +
                    "JOIN Dagen dag ON l.dagID = dag.id " +
                    "JOIN Leerkrachten lrk ON l.leerkrachtID = lrk.id " +
                    "JOIN Vakken v ON l.vakID = v.id " +
                    "JOIN Lokalen lok ON l.lokaalID = lok.id " +
                    "JOIN Campussen c ON lok.campusID = c.id " +
                    "JOIN Klassen kl ON l.klasID = kl.id " +
                "WHERE " +
                    "l.klasID = @id";

            return _db.Query<Les, Lesblok, Dag, Leerkracht, Vak, Lokaal, Campus, Les>(query, (l, lb, dag, lrk, v, lok, c) => 
            {
                l.Lesblok = lb;
                l.Dag = dag;
                l.Leerkracht = lrk;
                l.Vak = v;
                lok.Campus = c;
                l.Lokaal = lok;
                return l;
            }, new { id });
        }

        public IEnumerable<Les> GetByLeerkrachtID(int id)
        {
            //Mss naar SP
            string query = "SELECT " +
                    "l.id, l.jaar, " +
                    "lb.id, lb.starttijd, lb.eindtijd, " +
                    "dag.id, dag.naam, " +
                    "lrk.id, lrk.naam, lrk.voornaam, " +
                    "v.id, v.naam, " +
                    "lok.id, lok.naam, " +
                    "c.id, c.naam " +
                "FROM " +
                    "Lessen l " +
                    "JOIN Lesblokken lb ON l.lesblokID = lb.id " +
                    "JOIN Dagen dag ON l.dagID = dag.id " +
                    "JOIN Leerkrachten lrk ON l.leerkrachtID = lrk.id " +
                    "JOIN Vakken v ON l.vakID = v.id " +
                    "JOIN Lokalen lok ON l.lokaalID = lok.id " +
                    "JOIN Campussen c ON lok.campusID = c.id " +
                    "JOIN Klassen kl ON kl.id = l.klasID " +
                "WHERE " +
                    "l.leerkrachtID = @id";

            return _db.Query<Les, Lesblok, Dag, Klas, Vak, Lokaal, Campus, Les>(query, (l, lb, dag, kl, v, lok, c) =>
            {
                l.Lesblok = lb;
                l.Dag = dag;
                l.Klas = kl;
                l.Vak = v;
                lok.Campus = c;
                l.Lokaal = lok;
                return l;
            }, new { id });
        }

        public int Insert(Les les)
        {
            //ToDo
            string query = "INSERT INTO Lessen (jaar, lesblokID, dagID, leerkrachtID, lokaalID, klasID, vakID)" +
                "OUTPUT Inserted.Id" +
                "VALUES (@jaar, @lesblokID, @dagID, @leerkrachtID, @lokaalID, @klasID, @vakID)";

            var parameters = new DynamicParameters();
            parameters.Add("@jaar", les.Jaar);
            parameters.Add("@lesblokID", les.Lesblok.Id);
            parameters.Add("@dagID", les.Dag.Id);
            parameters.Add("leerkrachtID", les.Leerkracht.Id);
            parameters.Add("@lokaalID", les.Lokaal.Id);
            parameters.Add("@klasID", les.Klas.Id);
            parameters.Add("@vakID", les.Vak.Id);

            return _db.Query<int>(query, parameters).Single();
        }

        public void Update(Les les)
        {
            throw new NotImplementedException();
        }
    }
}
