using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace UurroostersWebApp.Repositories.LeerkrachtRepo
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
            string query = "INSERT INTO Leerkrachten (naam, voornaam) OUTPUT Inserted.id VALUES (@naam, @voornaam)";

            _db.Open();
            int identity = _db.Query<int>(query, new { leerkracht.Naam, leerkracht.Voornaam }).Single();
            if(leerkracht.Vakken != null && leerkracht.Vakken.Count() > 0)
            {
                string vakQuery = "INSERT INTO LeerkrachtVakken (leerkrachtID, vakID) VALUES (@lid, @vid)";
                foreach (Vak vak in leerkracht.Vakken)
                {
                    try
                    {
                        _db.Execute(vakQuery, new { lid = identity, vid = vak.Id });
                    }
                    catch(Exception)
                    {
                        break;
                    }
                }
            }
            _db.Close();
            return identity;
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM LeerkrachtVakken WHERE LeerkrachtID = @id " +
                "DELETE FROM Leerkrachten WHERE id = @id";
            _db.Execute(query, new { id });
        }

        public void Update(Leerkracht leerkracht)
        {
            string query = "UPDATE Leerkrachten SET naam = @naam, voornaam = @voornaam";
            _db.Execute(query, new { leerkracht.Naam, leerkracht.Voornaam });
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
