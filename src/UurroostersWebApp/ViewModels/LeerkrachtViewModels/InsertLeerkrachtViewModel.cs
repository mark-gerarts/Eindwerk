﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.ViewModels.VakVIewModels;

namespace UurroostersWebApp.ViewModels.LeerkrachtViewModels
{
    public class InsertLeerkrachtViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }

        [Required]
        [MaxLength(255)]
        public string Voornaam { get; set; }
        
        public List<int> Vakken { get; set; }
    }
}
