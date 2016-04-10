using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.LesblokRepo;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/lesblokken")]
    public class LesblokkenController : Controller
    {
        private ILesblokRepository _lb;

        public LesblokkenController(ILesblokRepository lb)
        {
            _lb = lb;
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            return Json(_lb.GetAll());
        }
    }
}
