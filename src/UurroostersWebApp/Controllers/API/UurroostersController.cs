using AutoMapper;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;
using UurroostersWebApp.Repositories;
using UurroostersWebApp.Repositories.EventRepo;
using UurroostersWebApp.Repositories.LesRepo;
using UurroostersWebApp.ViewModels.LesViewModels;

namespace UurroostersWebApp.Controllers.API
{
    [Route("api/uurroosters")]
    public class UurroostersController : Controller
    {
        private IEventRepository _event;
        private ILesRepository _les;

        private DateTime start;
        private DateTime einde;
        private List<DisplayLesViewModel> OpgesplitsteLessen;

        public UurroostersController(ILesRepository les, IEventRepository eventrepo)
        {
            _les = les;
            _event = eventrepo;
            OpgesplitsteLessen = new List<DisplayLesViewModel>();
        }

        [HttpGet("{klasID}/{startOfWeek}")]
        public JsonResult Get(int klasID, string startOfWeek)
        {
            try
            {
                start = DateTime.ParseExact(startOfWeek, "yyyyMMdd", CultureInfo.InvariantCulture);
            }
            catch
            {
                Response.StatusCode = 422;
                return Json("Couldn't parse date.");
            }
            
            // Einde = start + 7 dagen
            einde = start.AddDays(6).AddHours(23).AddMinutes(59).AddSeconds(59);
            
            // Haal alle lessen op, en alle events van de gegeven week.            
            var lessen = Mapper.Map<IEnumerable<DisplayLesViewModel>>(_les.GetByKlasID(klasID)).ToList();
            var events = _event.GetByKlasID(klasID, start, einde);
            
            // Nakijken welke events de lessen overlappen. De lessen worden dan uit de lijst verwijderd,
            // Of de start/eindtijd wordt aangepast.
            foreach (Event ev in events)
            {
                // Omgekeerde for zodat er elementen uit de lijst verwijderd kunnen worden.
                for (int i = lessen.Count() - 1; i >= 0; i--)
                {
                    DisplayLesViewModel les = lessen.ElementAt(i);

                    DateTime lesDate = getDateFromLes(les);
                    DateTime lesStartDateTime = lesDate.Date + TimeSpan.Parse(les.Starttijd);
                    DateTime lesEindDateTime = lesDate.Date + TimeSpan.Parse(les.Eindtijd);

                    if (!(lesEindDateTime > ev.StartTijdstip || lesStartDateTime < ev.EindTijdstip))
                    {
                        // Er is geen overlap tussen het event en de les
                        continue;
                    }
                    if (lesStartDateTime > ev.StartTijdstip && lesEindDateTime < ev.EindTijdstip)
                    {
                        // Volledige overlap => les mag verwijderd worden;
                        lessen.RemoveAt(i);
                    }
                    else if (lesStartDateTime < ev.EindTijdstip && lesStartDateTime > ev.EindTijdstip)
                    {
                        // Er is overlap en de les eindig NA het event;
                        if (lesStartDateTime < ev.EindTijdstip)
                        {
                            SplitsLes(les, ev);
                            lessen.RemoveAt(i);
                        }
                        else
                        {
                            les.Starttijd = ev.EindTijdstip.ToString("H:mm");
                        }
                    }
                    else if (lesEindDateTime > ev.StartTijdstip && lesEindDateTime < ev.EindTijdstip)
                    {
                        // Er is overlap en de les begint VOOR het event
                        if (lesEindDateTime > ev.EindTijdstip)
                        {
                            SplitsLes(les, ev);
                            lessen.RemoveAt(i);
                        }
                        else
                        {
                            les.Eindtijd = ev.StartTijdstip.ToString("H:mm");
                        }
                    }
                }
            }

            // Merge met de opgesplitste lessen.
            lessen.AddRange(OpgesplitsteLessen);

            var output = new
            {
                lessen = lessen,
                events = events
            };

            return Json(output);
        }

        private void SplitsLes(DisplayLesViewModel les, Event ev)
        {
            DisplayLesViewModel deel1 = CopyLes(les);
            DisplayLesViewModel deel2 = CopyLes(les);
            deel1.Eindtijd = ev.StartTijdstip.ToString("H:mm");
            deel2.Starttijd = ev.EindTijdstip.ToString("H:mm");
            OpgesplitsteLessen.Add(deel1);
            OpgesplitsteLessen.Add(deel2);
        }

        private DisplayLesViewModel CopyLes(DisplayLesViewModel les)
        {
            return new DisplayLesViewModel
            {
                Jaar = les.Jaar,
                Starttijd = les.Starttijd,
                Eindtijd = les.Eindtijd,
                LeerkrachtNaam = les.LeerkrachtNaam,
                DagNaam = les.DagNaam,
                VakNaam = les.VakNaam,
                LokaalNaam = les.LokaalNaam,
                KlasNaam = les.KlasNaam
            };
        }

        private DateTime getDateFromLes(DisplayLesViewModel les)
        {
            int days; 
            switch(les.DagNaam)
            {
                case "Maandag":
                    days = 0;
                    break;
                case "Dinsdag":
                    days = 1;
                    break;
                case "Woensdag":
                    days = 2;
                    break;
                case "Donderdag":
                    days = 3;
                    break;
                case "Vrijdag":
                    days = 4;
                    break;
                default:
                    days = 0;
                    break;
            }

            DateTime lesDate = start.Date;
            return lesDate.AddDays(days);
        }
    }
}
