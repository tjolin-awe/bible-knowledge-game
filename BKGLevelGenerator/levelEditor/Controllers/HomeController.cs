using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using levelEditor.Models;
using levelEditor.Data;

namespace levelEditor.Controllers
{
    public class HomeController : Controller
    {
        protected ApplicationDbContext _context;

        public async Task<ActionResult> RenderImage(int id)
        {
            Game game = await _context.Games.FindAsync(id);
            byte[] photoImage = game.Image;
            return File(photoImage, "image/png");
        }

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var games = _context.Games.ToList();
            return View(games);
        }

        public IActionResult Game(int id)
        {
            var game =_context.Games.FirstOrDefault(x => x.Id == id);
            return View(game);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
