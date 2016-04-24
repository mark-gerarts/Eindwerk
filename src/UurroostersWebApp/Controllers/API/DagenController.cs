using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/dagen")]
    public class DagenController : Controller
    {
        private IDagRepository _dag;

        public DagenController(IDagRepository dag)
        {
            _dag = dag;
        }
        [HttpGet("")]
        public JsonResult GetAll()
        {
            return Json(_dag.GetAll());
        }
    }
}
