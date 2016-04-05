﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.ViewModels.LokaalViewModels
{
    public class InsertLokaalViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Naam { get; set; }

        [Required]
        [RegularExpression("([0-9]+)")]
        public int CampusID { get; set; }
    }
}
