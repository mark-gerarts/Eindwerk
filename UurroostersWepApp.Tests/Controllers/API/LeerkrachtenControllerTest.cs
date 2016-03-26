using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UurroostersWepApp.Tests.Controllers.API
{
    [TestClass]
    public class LeerkrachtenControllerTest
    {
        [TestMethod]
        public void TestGetAllLeerkrachten()
        {
            var controller = new LeerkrachtenController(repository);
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
        }
    }
}
