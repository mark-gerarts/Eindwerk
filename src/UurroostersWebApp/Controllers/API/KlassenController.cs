﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.KlasRepo;
using UurroostersWebApp.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/klassen")]
    public class KlassenController : Controller
    {
        private IKlasRepository _klas;

        public KlassenController(IKlasRepository klas)
        {
            _klas = klas;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            return Json(_klas.GetAll());
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Klas klas = _klas.Find(id);

            if (klas == null)
            {
                Response.StatusCode = 404;
                return Json("Klas niet gevonden");
            }

            return Json(klas);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]Klas klas)
        {
            if (ModelState.IsValid)
            {
                int identity = _klas.Insert(klas);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Entity"); //ToDo: return validation errors
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]Klas klas)
        {
            //ToDo: make ViewModels for different validations
            if (ModelState.IsValid)
            {
                _klas.Update(klas);
                return Json("Update succesful");
            }
            else
            {
                Response.StatusCode = 422;
                return Json(klas); //ToDo: return validation errors
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _klas.Delete(id);

            return Json("Delete sucesful");
        }
    }
}