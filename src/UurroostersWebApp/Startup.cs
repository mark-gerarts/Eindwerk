using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.Extensions.Configuration;
using UurroostersWebApp.Models;
using UurroostersWebApp.Repositories;

namespace UurroostersWebApp
{
    public class Startup
    {
        public static IConfiguration Configuration { get; private set; }
        public Startup(IApplicationEnvironment env)
        {
            // Het config.json bestand beschikbaar maken.
            // Hierin staat oa de connection string.
            var configurationBuilder = new ConfigurationBuilder()
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();
            Configuration = configurationBuilder.Build();
        }
        

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            // Register the repositories.
            services.AddTransient<ILeerkrachtRepository, LeerkrachtRepository>();
            services.AddTransient<IVakRepository, VakRepository>();
            services.AddTransient<ICampusRepository, CampusRepository>();
            services.AddTransient<IStudierichtingRepository, StudierichtingRepository>();
            services.AddTransient<IKlasRepository, KlasRepository>();
            services.AddTransient<ILokaalRepository, LokaalRepository>();
            services.AddTransient<ILesRepository, LesRepository>();
            services.AddTransient<ILesblokRepository, LesblokRepository>();
            services.AddTransient<IDagRepository, DagRepository>();
            services.AddTransient<IEventRepository, EventRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            // Om JS bestanden etc te kunnen serven
            app.UseStaticFiles();

            // In de AutoMapperConfig class worden alle mappings geregistreerd
            AutoMapperConfig.RegisterMappings();

            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
