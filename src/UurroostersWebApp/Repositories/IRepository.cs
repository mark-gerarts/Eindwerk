using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Find(int id);
        int Insert(T entity);
        void Delete(int id);
        void Update(T entity);
    }
}
