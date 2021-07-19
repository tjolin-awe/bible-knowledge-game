using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BKGLevelGenerator.Data;
using BKGLevelGenerator.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Diagnostics;
using System.Collections.ObjectModel;
using Microsoft.Extensions.Configuration;
using System.Xml.Serialization;

namespace BKGLevelGenerator.Controllers
{
    public class SquaresController : Controller
    {
        private readonly GameDbContext _context;

        public SquaresController(GameDbContext context)
        {
            _context = context;
        }

        // GET: Squares
        public async Task<IActionResult> Index()
        {
            var gameDbContext = _context.Squares.Include(s => s.Category);
            return View(await gameDbContext.ToListAsync());
        }

        // GET: Squares/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var square = await _context.Squares
                .Include(s => s.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (square == null)
            {
                return NotFound();
            }

            if (square.Image != null)
            {
                var base64 = Convert.ToBase64String(square.Image);
                var imgSrc = String.Format("data:image/png;base64,{0}", base64);
                ViewBag.ImageBase64 = imgSrc;
            }

            return View(square);
        }

        // GET: Squares/Create
        public IActionResult Create()
        {
            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id");
            return View();
        }

        // POST: Squares/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,SquareId,Question,Value,CategoryId,Image")] Square square)
        {
            if (ModelState.IsValid)
            {
                _context.Add(square);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Title", square.CategoryId);
            return View(square);
        }

        // GET: Squares/Edit/5
        public async Task<IActionResult> Edit(int? id, int category, int board)
        {
            ViewBag.Category = category;
            ViewBag.Board = board;
            if (id == null)
            {
                return NotFound();
            }

            var square = _context.Squares.Include(x=>x.Answers).Include(x=>x.Category).FirstOrDefault(x=>x.Id == id);
            if (square == null)
            {
                return NotFound();
            }

            if (square.Image != null)
            {
                var base64 = Convert.ToBase64String(square.Image);
                var imgSrc = String.Format("data:image/png;base64,{0}", base64);
                ViewBag.ImageBase64 = imgSrc;
            }

            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Title", square.CategoryId);
            return View(square);
        }

        // POST: Squares/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SquareId,Question,Value,CategoryId,Image,Answers")] Square square, int board, IFormFile file)
        {
            if (id != square.Id)
            {
                return NotFound();
            }


            var config = new ConfigurationBuilder()
                     .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                     .AddJsonFile("appsettings.json").Build();


            var section = config.GetSection(nameof(EditorClientConfig));
            var editorClientConfig = section.Get<EditorClientConfig>();
            var path = editorClientConfig.GamePath;

            var boardobj = _context.Boards.FirstOrDefault(x => x.Id == board);
           
            if (file != null)        
                if (file.Length > 0)
                {
                    // full path to file in temp location
                    var filePath = Path.GetTempFileName(); //we are using Temp file name just for the example. Add your own file path.

                    using (var stream = new MemoryStream())
                    {
                        await file.CopyToAsync(stream);
                        square.Image = stream.ToArray();
                        square.ImageFilename = file.FileName;

                        var levelpath = $"{path}/public/assets/levels/level{boardobj.Level}/";
                        if (!Directory.Exists(levelpath))
                            Directory.CreateDirectory(levelpath);

                        System.IO.File.WriteAllBytes(levelpath + file.FileName, square.Image);
                    }


                    var board_output = _context.Boards.Include(x => x.Categories).Include(x => x.Squares).ThenInclude(x => x.Answers).FirstOrDefault(x => x.Id == board);


                    Board b = new Board();

                    b.Categories = board_output.Categories.OrderBy(x => x.OrderId).ToList();
                    b.Id = board_output.Id;
                    b.Title = board_output.Title;
                    b.Level = board_output.Level;
                    b.Squares = board_output.Squares.OrderBy(x => x.SquareId).ToList();




                    var serializer = new XmlSerializer(typeof(Board));


                    Stream filestream = new FileStream($"{path}/levels/level{board}/level.xml",FileMode.Create);
                    serializer.Serialize(filestream, b);
                }



            try
                {
                    Debug.WriteLine(square.SquareId);

                  
                   
                    _context.Update(square);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SquareExists(square.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Details),"boards",new { id=board });
            
            
        }

        // GET: Squares/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var square = await _context.Squares
                .Include(s => s.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (square == null)
            {
                return NotFound();
            }

            return View(square);
        }

        // POST: Squares/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var square = await _context.Squares.FindAsync(id);
            _context.Squares.Remove(square);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SquareExists(int id)
        {
            return _context.Squares.Any(e => e.Id == id);
        }
    }
}
