﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.Repositories.LesblokRepo
{
    public interface ILesblokRepository
    {
        IEnumerable<Lesblok> GetAll();
    }
}
