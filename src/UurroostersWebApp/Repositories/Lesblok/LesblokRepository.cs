using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
{
    public class LesblokRepository : ILesblokRepository
    {
        private SqlConnection _db;

        public LesblokRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }
        public IEnumerable<Lesblok> GetAll()
        {
            string query = "SELECT id, starttijd, eindtijd FROM Lesblokken";
            return _db.Query<Lesblok>(query).ToList();
        }
    }
}
