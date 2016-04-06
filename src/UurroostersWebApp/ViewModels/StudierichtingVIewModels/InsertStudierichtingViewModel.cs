using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.ViewModels.StudierichtingVIewModels
{
    public class InsertStudierichtingViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }
    }
}
