using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.EventRepo
{
    public interface IEventRepository : IRepository<Event>
    {
        IEnumerable<Event> GetByKlasID(int id, DateTime startTijdstip, DateTime eindTijdstip);
    }
}
