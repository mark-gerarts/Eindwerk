using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.LokaalRepo;
using UurroostersWebApp.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/lokalen")]
    public class LokalenController : Controller
    {
        private ILokaalRepository _lokaal;

        public LokalenController(ILokaalRepository lokaal)
        {
            _lokaal = lokaal;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            return Json(_lokaal.GetAll());
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Lokaal lokaal = _lokaal.Find(id);

            if (lokaal == null)
            {
                Response.StatusCode = 404;
                return Json("Lokaal niet gevonden");
            }

            return Json(lokaal);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]Lokaal lokaal)
        {
            if (ModelState.IsValid)
            {
                int identity = _lokaal.Insert(lokaal);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]Lokaal lokaal)
        {
            //ToDo: make ViewModels for different validations
            if (ModelState.IsValid)
            {
                _lokaal.Update(lokaal);
                return Json("Update succesful");
            }
            else
            {
                Response.StatusCode = 422;
                return Json(lokaal); //ToDo: return validation errors
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _lokaal.Delete(id);

            return Json("Delete sucesful");
        }
    }
}
