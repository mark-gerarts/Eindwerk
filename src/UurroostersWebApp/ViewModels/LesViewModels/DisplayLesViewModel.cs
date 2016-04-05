using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.ViewModels.LesViewModels
{
    public class DisplayLesViewModel
    {
        public int Id { get; set; }

        public int Jaar { get; set; }

        public string Starttijd { get; set; }

        public string Eindtijd { get; set; }

        public string LeerkrachtNaam { get; set; }

        public string LokaalNaam { get; set; }

        public string DagNaam { get; set; }

        public string VakNaam { get; set; }
    }
}
