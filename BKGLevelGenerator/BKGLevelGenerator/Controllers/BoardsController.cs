using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BKGLevelGenerator.Data;
using BKGLevelGenerator.Models;
using System.Collections;
using System.Xml.Serialization;
using System.IO;

namespace BKGLevelGenerator.Controllers
{
    public class BoardsController : Controller
    {
        private readonly GameDbContext _context;




        public BoardsController(GameDbContext context)
        {
            _context = context;
        }

      
        public FileResult ExportBoard(int? id)
        {


            var board = _context.Boards.Include(x => x.Categories).Include(x => x.Squares).ThenInclude(x => x.Answers).FirstOrDefault(x=>x.Id == id);


            Board b = new Board();

            b.Categories = board.Categories.OrderBy(x => x.OrderId).ToList();
            b.Id = board.Id;
            b.Title = board.Title;
            b.Level = board.Level;
            b.Squares = board.Squares.OrderBy(x => x.SquareId).ToList();



            
            var serializer = new XmlSerializer(typeof(Board));


            MemoryStream stream = new MemoryStream();
            serializer.Serialize(stream, b);

            return File(stream.ToArray(), "application/xml",fileDownloadName: $"level{b.Level}.xml");

        }

        // GET: Boards
        public async Task<IActionResult> Index()
        {
            return View(await _context.Boards.ToListAsync());
        }

        // GET: Boards/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = await _context.Boards.Include(x=>x.Categories).Include(x=>x.Squares)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (board == null)
            {
                return NotFound();
            }

            return View(board);
        }

        // GET: Boards/Create
        public IActionResult Create()
        {
           

            return View();
        }

        [HttpGet]
        public IActionResult GetPartial(string id)
        {
            var square = _context.Squares.FirstOrDefault(x => x.Id == int.Parse(id)); 

            PartialViewResult result =  PartialView("_Square", square);
            return result;
        }

        private Answer CreateAnswer(Square square)
        {
            return new Answer()
            {
                Display = string.Empty,
              //  Square = square,
                //SquareId = square.Id,
                
            };
        
            
        }

        // POST: Boards/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title")] Board board)
        {
            if (ModelState.IsValid)
            {
               
                
                board.Categories = new List<Category>();
                board.Squares = new List<Square>();



                for (int i = 0; i < 5; i++)
                {
                    var category = new Category()
                    {
                        Title = $"New category: {i}",
                        OrderId = i
                    };

                    _context.Categories.Add(category);
                    board.Categories.Add(category);

                }

              

                var categories = board.Categories.OrderBy(x=>x.OrderId).ToList();
                ViewBag.CategoryId = new SelectList(categories, "Id", "Title");
                
                int categoryIndex = 0;
                int value = 100;


                for (int i = 0; i < 20; i++)
                {
                    Square square = new Square
                    {
                        Category = categories[categoryIndex],
                        CategoryId = categories[categoryIndex].Id,
                        Answers = new List<Answer>(),
                        SquareId = i,
                        Question = string.Empty,
                        Value = value,
                        Image = null
                      

                    };


                   
                    for (int a = 0; a < 4; a++)
                        square.Answers.Add(CreateAnswer(square));
                    
    
                    board.Squares.Add(square);
                    categoryIndex++;
                    if (categoryIndex > 4)
                    {
                        categoryIndex = 0;
                        value += 100;
                        
                    } 
                
                }

                _context.Boards.Add(board);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(board);
        }

        // GET: Boards/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = _context.Boards.Include(x => x.Squares).Include(x => x.Categories).FirstOrDefault(x => x.Id == id);
            if (board == null)
            {
                return NotFound();
            }
            return View(board);
        }

        // POST: Boards/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title","Level")] Board board)
        {
            if (id != board.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(board);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BoardExists(board.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(board);
        }

        // GET: Boards/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = await _context.Boards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (board == null)
            {
                return NotFound();
            }

            return View(board);
        }

        // POST: Boards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var board = await _context.Boards.FindAsync(id);
            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BoardExists(int id)
        {
            return _context.Boards.Any(e => e.Id == id);
        }
    }
}
