using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.LesRepo
{
    public interface ILesRepository
    {
        int Insert(Les les);

        void Delete(int id);

        IEnumerable<Les> GetByKlasID(int id);

        IEnumerable<Les> GetByLeerkrachtID(int id);

        void Update(Les les);
    }
}
