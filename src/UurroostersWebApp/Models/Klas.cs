using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Klas
    {
        public int Id { get; set; }

        public string Naam { get; set; }

        public int Leerjaar { get; set; }

        public Campus Campus { get; set; }
        
        public Studierichting Studierichting { get; set; }
    }
}
