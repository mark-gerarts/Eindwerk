using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.LesRepo
{
    public interface ILesRepository
    {
        int insert(Les les);

        void delete(int id);

        IEnumerable<Les> getByKlasID(int id);

        IEnumerable<Les> getByLeerkrachtID(int id);

        void update(Les les);
    }
}
