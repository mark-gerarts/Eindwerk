using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
{
    public class DagRepository : IDagRepository
    {
        private SqlConnection _db;

        public DagRepository()
        {
            _db = new SqlConnection(Startup.Configuration["Data:CN"]);
        }
        public IEnumerable<Dag> GetAll()
        {
            string query = "SELECT id, naam FROM Dagen";
            return _db.Query<Dag>(query).ToList();
        }
    }
}
