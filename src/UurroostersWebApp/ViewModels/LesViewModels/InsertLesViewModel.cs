using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UurroostersWebApp.ViewModels.LesViewModels
{
    public class InsertLesViewModel
    {
        [Required]
        public int Jaar { get; set; }
        
        [Required]
        public int LesblokID { get; set; }

        [Required]
        public int LeerkrachtID { get; set; }

        [Required]
        public int DagID { get; set; }

        [Required]
        public int LokaalID { get; set; }

        [Required]
        public int KlasID { get; set; }

        [Required]
        public int VakID { get; set; }
    }
}