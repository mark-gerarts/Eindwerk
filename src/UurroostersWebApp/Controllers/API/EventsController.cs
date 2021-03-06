﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.ViewModels;
using UurroostersWebApp.Models;
using AutoMapper;

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

        [HttpGet("")]
        public JsonResult GetAll()
        {
            IEnumerable<Event> events = _ev.GetAll();
            return Json(events);
        }
        
        [HttpGet("{klasID}")]
        public JsonResult GetByKlasID(int klasID)
        {
            IEnumerable<Event> events = _ev.GetAllByKlasID(klasID);
            IEnumerable<DisplayEventViewModel> output = Mapper.Map<IEnumerable<DisplayEventViewModel>>(events);
            return Json(output);
        }

        [HttpPost("")]
        public JsonResult Insert([FromBody]InsertEventViewModel eventvm)
        {
            if(ModelState.IsValid)
            {
                Event ev = Mapper.Map<Event>(eventvm);
                int identity = _ev.Insert(ev);
                return Json(identity);
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Enitity"); //ToDo
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody]UpdateEventViewModel eventvm)
        {
            if (ModelState.IsValid)
            {
                Event ev = Mapper.Map<Event>(eventvm);
                _ev.Update(ev);
                return Json("Update Succesful");
            }
            else
            {
                Response.StatusCode = 422;
                return Json("Unprocessable Enitity"); //ToDo
            }
        }

        [HttpDelete("{eventID}")]
        public JsonResult Delete(int eventID)
        {
            _ev.Delete(eventID);
            return Json("Delete sucesful");
        }
    }
}
