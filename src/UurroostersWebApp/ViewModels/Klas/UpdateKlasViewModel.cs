using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.ViewModels
{
    public class UpdateKlasViewModel
    {
        [Required]
        [RegularExpression("([0-9]+)")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }

        [Required]
        [RegularExpression("([0-9]+)")]
        public int Leerjaar { get; set; }

        [Required]
        [RegularExpression("([0-9]+)")]
        public int CampusId { get; set; }

        [Required]
        [RegularExpression("([0-9]+)")]
        public int StudierichtingId { get; set; }
    }
}
