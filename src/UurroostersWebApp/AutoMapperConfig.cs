using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;
using UurroostersWebApp.ViewModels;

namespace UurroostersWebApp
{
    public class AutoMapperConfig
    {
        /// <summary>
        /// Zet een TimeSpan om in een hh:ii string
        /// </summary>
        /// <param name="ts">De TimeSpan</param>
        /// <returns>hh:ii string</returns>
        private static string ConvertTimeSpan(TimeSpan ts)
        {
            return string.Format("{0:00}:{1:00}", ts.Hours, ts.Minutes);
        }

        public static void RegisterMappings()
        {
            // Registreert alle mappings.
            Mapper.Initialize(config =>
            {
                //Lessen
                config.CreateMap<Les, DisplayLesViewModel>()
                    .ForMember(dest => dest.Starttijd, opt => opt.MapFrom(src => ConvertTimeSpan(src.Lesblok.Starttijd)))
                    .ForMember(dest => dest.Eindtijd, opt => opt.MapFrom(src => ConvertTimeSpan(src.Lesblok.Eindtijd)))
                    .ForMember(dest => dest.LeerkrachtNaam, opt => opt.MapFrom(src => src.Leerkracht.Naam + " " + src.Leerkracht.Voornaam))
                    .ForMember(dest => dest.KlasNaam, opt => opt.MapFrom(src => src.Klas.Naam));
                
                //Lesblokken
                config.CreateMap<Lesblok, DisplayLesblokViewModel>()
                    .ForMember(dest => dest.Starttijd, opt => opt.MapFrom(src => ConvertTimeSpan(src.Starttijd)))
                    .ForMember(dest => dest.Eindtijd, opt => opt.MapFrom(src => ConvertTimeSpan(src.Eindtijd)));

                config.CreateMap<InsertLesViewModel, Les>()
                    .ForMember(dest => dest.Lesblok, opt => opt.MapFrom(src => new Lesblok { Id = src.LesblokID }))
                    .ForMember(dest => dest.Leerkracht, opt => opt.MapFrom(src => new Leerkracht { Id = src.LeerkrachtID }))
                    .ForMember(dest => dest.Dag, opt => opt.MapFrom(src => new Dag { Id = src.DagID }))
                    .ForMember(dest => dest.Lokaal, opt => opt.MapFrom(src => new Lokaal { Id = src.LokaalID }))
                    .ForMember(dest => dest.Klas, opt => opt.MapFrom(src => new Klas { Id = src.KlasID }))
                    .ForMember(dest => dest.Vak, opt => opt.MapFrom(src => new Vak { Id = src.VakID }));

                //Events
                config.CreateMap<InsertEventViewModel, Event>()
                    .ForMember(dest => dest.StartTijdstip, opt => opt.MapFrom(src => DateTime.Parse(src.StartTijdstip)))
                    .ForMember(dest => dest.EindTijdstip, opt => opt.MapFrom(src => DateTime.Parse(src.EindTijdstip)))
                    .ForMember(dest => dest.Klassen, opt => opt.ResolveUsing(src => ConvertKlasList(src.Klassen)));
                config.CreateMap<UpdateEventViewModel, Event>()
                    .ForMember(dest => dest.StartTijdstip, opt => opt.MapFrom(src => DateTime.Parse(src.StartTijdstip)))
                    .ForMember(dest => dest.EindTijdstip, opt => opt.MapFrom(src => DateTime.Parse(src.EindTijdstip)))
                    .ForMember(dest => dest.Klassen, opt => opt.ResolveUsing(src => ConvertKlasList(src.Klassen)));
                config.CreateMap<Event, DisplayEventViewModel>();

                //Campussen
                config.CreateMap<InsertCampusViewModel, Campus>();
                config.CreateMap<UpdateCampusViewModel, Campus>();

                //Klassen
                config.CreateMap<InsertKlasViewModel, Klas>()
                    .ForMember(dest => dest.Studierichting, opt => opt.MapFrom(src => new Studierichting { Id = src.StudierichtingId}))
                    .ForMember(dest => dest.Campus, opt => opt.MapFrom(src => new Campus { Id = src.CampusId }));
                config.CreateMap<UpdateKlasViewModel, Klas>()
                    .ForMember(dest => dest.Studierichting, opt => opt.MapFrom(src => new Studierichting { Id = src.StudierichtingId }))
                    .ForMember(dest => dest.Campus, opt => opt.MapFrom(src => new Campus { Id = src.CampusId }));

                //Lokalen
                config.CreateMap<InsertLokaalViewModel, Lokaal>()
                    .ForMember(dest => dest.Campus, opt => opt.MapFrom(src => new Campus { Id = src.CampusID }));
                config.CreateMap<UpdateLokaalViewModel, Lokaal>()
                    .ForMember(dest => dest.Campus, opt => opt.MapFrom(src => new Campus { Id = src.CampusID }));

                //Vakken
                config.CreateMap<InsertVakViewModel, Vak>();
                config.CreateMap<UpdateVakViewModel, Vak>();

                //Studierichtingen
                config.CreateMap<InsertStudierichtingViewModel, Studierichting>();
                config.CreateMap<UpdateStudierichtingViewModel, Studierichting>();

                //Leerkrachten
                config.CreateMap<InsertLeerkrachtViewModel, Leerkracht>()
                    .ForMember(dest => dest.Vakken, opt => opt.ResolveUsing(src => ConvertVakList(src.Vakken)));
                config.CreateMap<UpdateLeerkrachtViewModel, Leerkracht>()
                    .ForMember(dest => dest.Vakken, opt => opt.ResolveUsing(src => ConvertVakList(src.Vakken)));
            });
        }

        /// <summary>
        /// Zet een List van vakIDs om in een List van Vakken
        /// </summary>
        /// <param name="src"></param>
        /// <returns></returns>
        private static List<Vak> ConvertVakList(List<int> src)
        {
            List<Vak> output = new List<Vak>();

            foreach (int vakID in src)
            {
                output.Add(new Vak { Id = vakID });
            }

            return output;
        }

        private static List<Klas> ConvertKlasList(List<int> src)
        {
            List<Klas> output = new List<Klas>();

            foreach(int klasID in src)
            {
                output.Add(new Klas { Id = klasID });
            }

            return output;
        }
    }
}
