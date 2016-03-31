using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Lokaal
    {
        public int Id { get; set; }

        public string Naam { get; set; }

        public Campus Campus { get; set; }
    }
}
