using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace UurroostersWebApp.Repositories
{
    public class LeerkrachtRepository : ILeerkrachtRepository
    {
        private SqlConnection _db;

        public LeerkrachtRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }

        public int Insert(Leerkracht leerkracht)
        {
            string vakkenIDsString = string.Join(" ", leerkracht.Vakken.Select(l => l.Id).ToList());

            var parameters = new DynamicParameters();
            parameters.Add("@leerkrachtID", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@naam", leerkracht.Naam);
            parameters.Add("@voornaam", leerkracht.Voornaam);
            parameters.Add("@vakken", vakkenIDsString);

            _db.Execute("spInsertLeerkracht", parameters, commandType: CommandType.StoredProcedure);

            return parameters.Get<int>("leerkrachtID");
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM LeerkrachtVakken WHERE LeerkrachtID = @id " +
                "DELETE FROM Leerkrachten WHERE id = @id";
            _db.Execute(query, new { id });
        }

        public void Update(Leerkracht leerkracht)
        {
            string vakkenIDsString = string.Join(" ", leerkracht.Vakken.Select(p => p.Id).ToList());

            var parameters = new DynamicParameters();
            parameters.Add("@leerkrachtID", leerkracht.Id);
            parameters.Add("@naam", leerkracht.Naam);
            parameters.Add("@voornaam", leerkracht.Voornaam);
            parameters.Add("@vakken", vakkenIDsString);

            _db.Execute("spUpdateLeerkracht", parameters, commandType: CommandType.StoredProcedure);
        }

        public Leerkracht Find(int id)
        {
            string query = "SELECT l.id, l.naam, l.voornaam, v.id, v.naam " +
                "FROM Leerkrachten l " +
                "INNER JOIN LeerkrachtVakken lv ON l.id = lv.leerkrachtID " +
                "INNER JOIN Vakken v ON v.id = lv.vakID " +
                "WHERE l.id = @id";
            var lookup = new Dictionary<int, Leerkracht>();
            return _db.Query<Leerkracht, Vak, Leerkracht>(query, (l, v) =>
            {
                Leerkracht leerkracht;
                if (!lookup.TryGetValue(l.Id, out leerkracht))
                {
                    lookup.Add(l.Id, leerkracht = l);
                }
                if (leerkracht.Vakken == null)
                {
                    leerkracht.Vakken = new List<Vak>();
                }
                if(v != null)
                {
                    leerkracht.Vakken.Add(v);
                }
                return leerkracht;
            }, new { id }).FirstOrDefault();
            //var result = lookup.Values;
        }

        public IEnumerable<Leerkracht> GetAll()
        {
            string query = "SELECT l.id, l.naam, l.voornaam, v.id, v.naam " +
                "FROM Leerkrachten l " +
                "LEFT JOIN LeerkrachtVakken lv ON l.id = lv.leerkrachtID " +
                "LEFT JOIN Vakken v ON v.id = lv.vakID";
            var lookup = new Dictionary<int, Leerkracht>();
            _db.Query<Leerkracht, Vak, Leerkracht>(query, (l, v) =>
            {
                Leerkracht leerkracht;
                if (!lookup.TryGetValue(l.Id, out leerkracht))
                {
                    lookup.Add(l.Id, leerkracht = l);
                }
                if (leerkracht.Vakken == null)
                {
                    leerkracht.Vakken = new List<Vak>();
                }
                if(v != null)
                {
                    leerkracht.Vakken.Add(v);
                }
                return leerkracht;
            }).AsQueryable();
            return lookup.Values;
        }

        public void addVak(int leerkrachtID, int vakID)
        {
            //Fix
            string query = "INSERT INTO LeerkrachtVakken (leerkrachtID, vakID) VALUES (@lkid, @vid)";
            try
            {
                _db.Execute(query, new { leerkrachtID, vakID });
            }
            catch(Exception)
            {
                return;
            }
        }

        public void removeVak(int leerkrachtID, int vakID)
        {
            //fix
            string query = "DELETE FROM LeerkrachtVakken WHERE leerkrachtID = @lkid AND vakID = @vid";
            try
            {
                _db.Execute(query, new { leerkrachtID, vakID });
            }
            catch (Exception)
            {
                return;
            }
        }
    }
}
