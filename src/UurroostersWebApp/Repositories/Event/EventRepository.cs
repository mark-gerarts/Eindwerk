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

        public void Delete(int eventID)
        {
            string query = "DELETE FROM EventsKlassen WHERE eventID = @eventID; " +
                "DELETE FROM Events WHERE id = @eventID";
            _db.Execute(query, new { eventID });
        }

        public Event Find(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Event> GetAll()
        {
            string query = "SELECT e.*, k.*  FROM Events e " +
                "JOIN EventsKlassen ek ON e.id = ek.eventID " +
                "JOIN Klassen k ON k.id = ek.klasID";

            var lookup = new Dictionary<int, Event>();
            _db.Query<Event, Klas, Event>(query, (e, k) => 
            {
                Event ev;
                if (!lookup.TryGetValue(e.Id, out ev))
                {
                    lookup.Add(e.Id, ev = e);
                }
                if (ev.Klassen == null)
                {
                    ev.Klassen = new List<Klas>();
                }
                if (k != null)
                {
                    ev.Klassen.Add(k);
                }
                return ev;
            }).AsQueryable();

            return lookup.Values;
        }
        
        public int Insert(Event ev)
        {
            string klasIDs = string.Join(" ", ev.Klassen.Select(k => k.Id).ToList());

            var parameters = new DynamicParameters();
            parameters.Add("@eventID", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@naam", ev.Naam);
            parameters.Add("@omschrijving", ev.Omschrijving);
            parameters.Add("@startTijdstip", ev.StartTijdstip);
            parameters.Add("@eindTijdstip", ev.EindTijdstip);
            parameters.Add("@klasIDs", klasIDs);

            _db.Execute("spInsertEvent", parameters, commandType: CommandType.StoredProcedure);

            return parameters.Get<int>("eventID");
        }

        public void Update(Event ev)
        {
            string klasIDs = string.Join(" ", ev.Klassen.Select(k => k.Id).ToList());

            var parameters = new DynamicParameters();
            parameters.Add("@eventID", ev.Id);
            parameters.Add("@naam", ev.Naam);
            parameters.Add("@omschrijving", ev.Omschrijving);
            parameters.Add("@startTijdstip", ev.StartTijdstip);
            parameters.Add("@eindTijdstip", ev.EindTijdstip);
            parameters.Add("@klasIDs", klasIDs);

            _db.Execute("spUpdateEvent", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
