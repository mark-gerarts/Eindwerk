using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.Models
{
    public class Vak
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "{0} is een verplicht veld.")]
        public string Naam { get; set; }

        //public List<Leerkracht> leerkrachten { get; set; }

    }
}
