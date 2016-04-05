using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Les
    {
        public int Id { get; set; }

        public int Jaar { get; set; }

        public Lesblok Lesblok { get; set; }

        public Leerkracht Leerkracht { get; set; }

        public Lokaal Lokaal { get; set; }

        public Klas Klas { get; set; }

        public Dag Dag { get; set; }

        public Vak Vak { get; set; }
    }
}
