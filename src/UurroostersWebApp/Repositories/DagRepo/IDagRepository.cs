using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.DagRepo
{
    public interface IDagRepository
    {
        IEnumerable<Dag> GetAll();
    }
}
