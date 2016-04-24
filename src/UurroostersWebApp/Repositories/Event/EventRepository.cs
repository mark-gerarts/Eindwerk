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
    public class EventRepository : IEventRepository
    {
        private SqlConnection _db;

        public EventRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }
        
        public IEnumerable<Event> GetByKlasID(int id, DateTime startTijdstip, DateTime eindTijdstip)
        {
            string query = "SELECT e.* FROM Events e " +
                "JOIN EventsKlassen ek ON e.id = ek.eventID " +
                "WHERE ek.klasID = @klasID " +
                "AND e.startTijdstip <= @eindtijd " +
                "AND e.eindTijdstip >= @starttijd";

            var parameters = new DynamicParameters();
            parameters.Add("@klasID", id);
            parameters.Add("@eindtijd", eindTijdstip);
            parameters.Add("@starttijd", startTijdstip);

            return _db.Query<Event>(query, parameters).ToList();
        }

        public IEnumerable<Event> GetAllByKlasID(int klasID)
        {
            string query = "SELECT * FROM Events e " +
                "JOIN EventsKlassen ek ON e.id = ek.eventID " +
                "WHERE ek.klasID = @klasID";
            return _db.Query<Event>(query, new { klasID }).ToList();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Event Find(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Event> GetAll()
        {
            throw new NotImplementedException();
        }
        
        public int Insert(Event entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Event entity)
        {
            throw new NotImplementedException();
        }
    }
}
