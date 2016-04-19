using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using UurroostersWebApp.Repositories.LeerkrachtRepo;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.Models;
using AutoMapper;
using UurroostersWebApp.ViewModels.LeerkrachtViewModels;
using UurroostersWebApp.Repositories.EventRepo;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/events")]
    public class EventController : Controller
    {
        private IEventRepository _event;

        public EventController(IEventRepository eventrepo)
        {
            _event = eventrepo;
        }
    }
}
