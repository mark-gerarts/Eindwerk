using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.Models;
using AutoMapper;
using UurroostersWebApp.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/leerkrachten")]
    public class LeerkrachtenController : Controller
    {
        private ILeerkrachtRepository _leerkracht;

        public LeerkrachtenController(ILeerkrachtRepository leerkracht)
        {
            _leerkracht = leerkracht;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            return Json(_leerkracht.GetAll());
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Leerkracht leerkracht = _leerkracht.Find(id);

            if (leerkracht == null)
            {
                Response.StatusCode = 404;
                return Json("Leerkracht niet gevonden");
            }

            return Json(leerkracht);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertLeerkrachtViewModel leerkrachtvm)
        {
            if (ModelState.IsValid)
            {
                Leerkracht leerkracht = Mapper.Map<Leerkracht>(leerkrachtvm);
                int identity = _leerkracht.Insert(leerkracht);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]UpdateLeerkrachtViewModel leerkrachtvm)
        {
            if (ModelState.IsValid)
            {
                Leerkracht leerkracht = Mapper.Map<Leerkracht>(leerkrachtvm);
                _leerkracht.Update(leerkracht);
                return Json("Update succesful");
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable entity"); //ToDo: return validation errors
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _leerkracht.Delete(id);
            return Json("Delete sucesful");
        }
    }
}
