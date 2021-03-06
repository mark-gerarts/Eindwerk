﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.Models;
using UurroostersWebApp.ViewModels;
using AutoMapper;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/vakken")]
    public class VakkenController : Controller
    {
        private IVakRepository _vak;

        public VakkenController(IVakRepository vak)
        {
            _vak = vak;
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            return Json(_vak.GetAll());
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Vak vak = _vak.Find(id);

            if(vak == null)
            {
                Response.StatusCode = 404;
                return Json("Vak niet gevonden");
            }

            return Json(vak);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertVakViewModel vakvm)
        {
            if (ModelState.IsValid)
            {
                Vak vak = Mapper.Map<Vak>(vakvm);
                int identity = _vak.Insert(vak);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]UpdateVakViewModel vakvm)
        {
            if (ModelState.IsValid)
            {
                Vak vak = Mapper.Map<Vak>(vakvm);
                _vak.Update(vak);
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
            _vak.Delete(id);
            return Json("Delete sucesful");
        }
    }
}
