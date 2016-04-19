using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string Naam { get; set; }

        public string Omschrijving { get; set; }

        public DateTime StartTijdstip { get; set; }

        public DateTime EindTijdstip { get; set; }
    }
}
