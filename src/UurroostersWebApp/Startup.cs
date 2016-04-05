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
using UurroostersWebApp.Repositories.LeerkrachtRepo;
using UurroostersWebApp.Repositories.VakRepo;
using UurroostersWebApp.Repositories.CampusRepo;
using UurroostersWebApp.Repositories.StudierichtingRepo;
using UurroostersWebApp.Repositories.KlasRepo;
using UurroostersWebApp.Repositories.LokaalRepo;
using UurroostersWebApp.Repositories.LesRepo;

namespace UurroostersWebApp
{
    public class Startup
    {
        public static IConfiguration Configuration { get; private set; }
        public Startup(IApplicationEnvironment env)
        {
            var configurationBuilder = new ConfigurationBuilder()
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();
            Configuration = configurationBuilder.Build();
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();

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
