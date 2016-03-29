using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.VakRepo
{
    public interface IVakRepository : IRepository<Vak>
    {
        IEnumerable<Vak> GetVakkenByLeerkrachtId(int id);
    }
}
