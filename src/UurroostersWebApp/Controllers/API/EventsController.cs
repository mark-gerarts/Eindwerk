using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/events")]
    public class EventsController : Controller
    {
        private IEventRepository _ev;

        public EventsController(IEventRepository ev)
        {
            _ev = ev;
        }
        
        [HttpGet("{klasID}")]
        public JsonResult GetByKlasID(int klasID)
        {
            var events = _ev.GetAllByKlasID(klasID);
            return Json(events);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertEventViewModel eventvm)
        {
            return Json(true);
        }
    }
}
