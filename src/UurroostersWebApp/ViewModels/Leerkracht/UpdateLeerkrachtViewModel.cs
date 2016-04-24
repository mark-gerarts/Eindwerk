using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.ViewModels
{
    public class UpdateLeerkrachtViewModel
    {
        [Required]
        [RegularExpression("([0-9]+)")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }

        [Required]
        [MaxLength(255)]
        public string Voornaam { get; set; }

        public List<int> Vakken { get; set; }
    }
}
