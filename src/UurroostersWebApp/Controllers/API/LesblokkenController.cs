using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories;
using AutoMapper;
using UurroostersWebApp.ViewModels;
using UurroostersWebApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/lesblokken")]
    public class LesblokkenController : Controller
    {
        private ILesblokRepository _lb;

        public LesblokkenController(ILesblokRepository lb)
        {
            _lb = lb;
        }

        [HttpGet("")]
        public JsonResult GetAll()
        {
            var lesblokken = _lb.GetAll();
            var result = Mapper.Map<IEnumerable<DisplayLesblokViewModel>>(lesblokken);
            return Json(result);
        }
    }
}
