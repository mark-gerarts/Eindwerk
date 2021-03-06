﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories
{
    public interface ILeerkrachtRepository : IRepository<Leerkracht>
    {
        void addVak(int leerkrachtID, int vakID);

        void removeVak(int leerkrachtID, int vakID);
    }
}
