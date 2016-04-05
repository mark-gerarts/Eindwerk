using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;

namespace UurroostersWebApp.ViewModels.KlasViewModels
{
    public class InsertKlasViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }

        [Required]
        public int Leerjaar { get; set; }

        [Required]
        public int CampusId { get; set; }

        [Required]
        public int StudierichtingId { get; set; }
    }
}
