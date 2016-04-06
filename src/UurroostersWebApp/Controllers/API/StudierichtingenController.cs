using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.StudierichtingRepo;
using UurroostersWebApp.Models;
using UurroostersWebApp.ViewModels.StudierichtingVIewModels;
using AutoMapper;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/studierichtingen")]
    public class StudierichtingenController : Controller
    {
        private IStudierichtingRepository _studierichting;

        public StudierichtingenController(IStudierichtingRepository studierichting)
        {
            _studierichting = studierichting;
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            return Json(_studierichting.GetAll());
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Studierichting studierichting = _studierichting.Find(id);

            if (studierichting == null)
            {
                Response.StatusCode = 404;
                return Json("Studierichting niet gevonden");
            }

            return Json(studierichting);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertStudierichtingViewModel studierichtingvm)
        {
            if (ModelState.IsValid)
            {
                Studierichting studierichting = Mapper.Map<Studierichting>(studierichtingvm);
                int identity = _studierichting.Insert(studierichting);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]UpdateStudierichtingViewModel studierichtingvm)
        {
            if (ModelState.IsValid)
            {
                Studierichting studierichting = Mapper.Map<Studierichting>(studierichtingvm);
                _studierichting.Update(studierichting);
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
            _studierichting.Delete(id);
            return Json("Delete sucesful");
        }
    }
}
