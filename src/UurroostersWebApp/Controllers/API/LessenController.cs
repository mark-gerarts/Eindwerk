using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.LesRepo;
using AutoMapper;
using UurroostersWebApp.Models;
using UurroostersWebApp.ViewModels.LesViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/lessen")]
    public class LessenController : Controller
    {
        private ILesRepository _les;

        public LessenController(ILesRepository les)
        {
            _les = les;
        }
        
        [HttpGet("{klasID}")]
        public JsonResult getLessenByKlasID(int klasID)
        {
            var lessen = _les.getByKlasID(klasID);
            var result = Mapper.Map<IEnumerable<DisplayLesViewModel>>(lessen);

            return Json(result);
        }

        [HttpGet("{klasID}/uitgebreid")]
        public JsonResult getDetailedLessenByKlasID(int klasID)
        {
            var lessen = _les.getByKlasID(klasID);
            return Json(lessen);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertLesViewModel lesvm)
        {
            // ToDo: check of de les al ingepland is of niet
            // mss in stored procedure
            if (ModelState.IsValid)
            {
                Les les = Mapper.Map<Les>(lesvm);
                int identity = _les.insert(les);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }
    }
}
