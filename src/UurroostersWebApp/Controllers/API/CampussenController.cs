using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.CampusRepo;
using UurroostersWebApp.Models;
using UurroostersWebApp.ViewModels.CampusViewModels;
using AutoMapper;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/campussen")]
    public class CampussenController : Controller
    {
        private ICampusRepository _campus;

        public CampussenController(ICampusRepository campus)
        {
            _campus = campus;
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            return Json(_campus.GetAll());
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Campus campus = _campus.Find(id);

            if (campus == null)
            {
                Response.StatusCode = 404;
                return Json("Campus niet gevonden");
            }

            return Json(campus);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertCampusViewModel campusvm)
        {
            if (ModelState.IsValid)
            {
                Campus campus = Mapper.Map<Campus>(campusvm);
                int identity = _campus.Insert(campus);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]UpdateCampusViewModel campusvm)
        {
            //ToDo: make ViewModels for different validations
            if (ModelState.IsValid)
            {
                Campus campus = Mapper.Map<Campus>(campusvm);
                _campus.Update(campus);
                return Json("Update succesful");
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _campus.Delete(id);
            return Json("Delete sucesful");
        }
    }
}
