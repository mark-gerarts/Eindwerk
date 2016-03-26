using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Vak
    {
        public int Id { get; set; }

        public string Naam { get; set; }

        public List<Leerkracht> leerkrachten { get; set; }

    }
}
