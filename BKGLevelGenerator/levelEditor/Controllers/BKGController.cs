using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using levelEditor.Data;
using levelEditor.Models.BKG;
using System.Collections;
using System.Xml.Serialization;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace levelEditor.Controllers
{
    [Authorize]
    public class BKGController : Controller
    {
        private readonly GameDbContext _context;




        public BKGController(GameDbContext context)
        {
            _context = context;
        }

        public ActionResult UpdateGame(int? id)
        {
            var board = _context.Boards.Include(x => x.Categories).Include(x => x.Squares).ThenInclude(x => x.Answers).FirstOrDefault(x => x.Id == id);

            if (board == null)
            {
                return NotFound();
            }


            var serializedBoard = new Board();
            serializedBoard.Categories = board.Categories.ToList();
            serializedBoard.Id = board.Id;
            serializedBoard.Level = board.Level;
            serializedBoard.Squares = board.Squares.OrderBy(x => x.SquareId).ToList();
            serializedBoard.Title = board.Title;

            var config = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json").Build();


            var section = config.GetSection(nameof(EditorClientConfig));
            var editorClientConfig = section.Get<EditorClientConfig>();
            var path = editorClientConfig.GamePath;

            var serializer = new XmlSerializer(typeof(Board));

            string levelDir = $"{path}/levels/level{serializedBoard.Level}";
            string levelFile = levelDir + "/level.xml";
            if (!Directory.Exists(levelDir))
                Directory.CreateDirectory(levelDir);

           
                if (System.IO.File.Exists(levelFile))
                    System.IO.File.Delete(levelFile);

                using (Stream filestream = new FileStream(levelFile, FileMode.Create))
                    serializer.Serialize(filestream, serializedBoard);
           
            return View("Details",board);
        }

        public FileResult ExportBoard(int? id)
        {


            var board = _context.Boards.Include(x => x.Categories).Include(x => x.Squares).ThenInclude(x => x.Answers).FirstOrDefault(x => x.Id == id);


            Board b = new Board();

            b.Categories = board.Categories.OrderBy(x => x.OrderId).ToList();
            b.Id = board.Id;
            b.Title = board.Title;
            b.Level = board.Level;
            b.Squares = board.Squares.OrderBy(x => x.SquareId).ToList();




            var serializer = new XmlSerializer(typeof(Board));


            MemoryStream stream = new MemoryStream();
            serializer.Serialize(stream, b);

            return File(stream.ToArray(), "application/xml", fileDownloadName: $"level{b.Level}.xml");

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

            var board = await _context.Boards.Include(x => x.Categories).Include(x => x.Squares)
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
        public async Task<IActionResult> Create([Bind("Id,Title,Level")] Board board)
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



                var categories = board.Categories.OrderBy(x => x.OrderId).ToList();
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
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title", "Level")] Board board)
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

        // GET: Categories
        public async Task<IActionResult> CategoryIndex()
        {
            return View(await _context.Categories.ToListAsync());
        }

        // GET: Categories/Details/5
        public async Task<IActionResult> CategoryDetails(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var category = await _context.Categories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // GET: Categories/Create
        public IActionResult CreateCategory()
        {
            return View();
        }

        // POST: Categories/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateCategory([Bind("Id,Title")] Category category)
        {
            if (ModelState.IsValid)
            {
                _context.Add(category);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(category);
        }

        // GET: Categories/Edit/5
        public async Task<IActionResult> EditCategory(int? id, int? board)
        {
            ViewBag.Board = board;
            if (id == null)
            {
                return NotFound();
            }

            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // POST: Categories/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditCategory(int id, [Bind("Id,Title")] Category category, int board)
        {
            ViewBag.Board = board;
            if (id != category.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(category);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CategoryExists(category.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Details", "BKG", new { id = board });
            }
            return View(category);
        }

        // GET: Categories/Delete/5
        public async Task<IActionResult> DeleteCategory(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var category = await _context.Categories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // POST: Categories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CategoryDeleteConfirmed(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }

        // GET: Squares/Edit/5
        public async Task<IActionResult> EditSquare(int? id, int category, int board)
        {
            ViewBag.Category = category;
            ViewBag.Board = board;
            if (id == null)
            {
                return NotFound();
            }

            var square = _context.Squares.Include(x => x.Answers).Include(x => x.Category).FirstOrDefault(x => x.Id == id);
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
        public async Task<IActionResult> EditSquare(int id, [Bind("Id,SquareId,Question,Value,CategoryId,Image,ImageFilename,Answers")] Square square, int board, IFormFile file)
        {
            if (id != square.Id)
            {
                return NotFound();
            }

            var boardobj = _context.Boards.FirstOrDefault(x => x.Id == board);
            var config = new ConfigurationBuilder()
                 .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                 .AddJsonFile("appsettings.json").Build();


            var section = config.GetSection(nameof(EditorClientConfig));
            var editorClientConfig = section.Get<EditorClientConfig>();
            var path = editorClientConfig.GamePath;
            if (file != null)
            {
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
                }
            }

            try
            {

               

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

            

            return RedirectToAction(nameof(Details), "BKG", new { id = board });


        }

        private bool SquareExists(int id)
        {
            return _context.Squares.Any(e => e.Id == id);
        }
    }
}