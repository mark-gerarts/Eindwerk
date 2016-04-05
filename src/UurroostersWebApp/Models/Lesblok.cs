using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Lesblok
    {
        public int Id { get; set; }

        public TimeSpan Starttijd { get; set; }

        public TimeSpan Eindtijd { get; set; }
    }
}
