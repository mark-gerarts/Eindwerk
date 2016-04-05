using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UurroostersWebApp.Models;
using UurroostersWebApp.ViewModels.CampusViewModels;
using UurroostersWebApp.ViewModels.KlasViewModels;
using UurroostersWebApp.ViewModels.LesViewModels;
using UurroostersWebApp.ViewModels.LokaalViewModels;

namespace UurroostersWebApp
{
    public class AutoMapperConfig
    {
        private static string ConvertTimeSpan(TimeSpan ts)
        {
            return string.Format("{0:00}:{1:00}", ts.Hours, ts.Minutes);
        }

        public static void RegisterMappings()
        {
            Mapper.Initialize(config =>
            {
                //Lessen
                config.CreateMap<Les, DisplayLesViewModel>()
                    .ForMember(dest => dest.Starttijd, opt => opt.MapFrom(src => ConvertTimeSpan(src.Lesblok.Starttijd)))
                    .ForMember(dest => dest.Eindtijd, opt => opt.MapFrom(src => ConvertTimeSpan(src.Lesblok.Eindtijd)))
                    .ForMember(dest => dest.LeerkrachtNaam, opt => opt.MapFrom(src => src.Leerkracht.Naam + " " + src.Leerkracht.Voornaam));

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
            });
        }
    }
}
