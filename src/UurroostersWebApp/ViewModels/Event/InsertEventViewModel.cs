using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.ViewModels
{
    public class InsertEventViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }

        [Required]
        public string Omschrijving { get; set; }

        [Required]
        public string StartTijdstip { get; set; }

        [Required]
        public string EindTijdstip { get; set; }
    }
}
