using BKGLevelGenerator.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BKGLevelGenerator.Data
{
    public class GameDbContext : DbContext
    {
        public DbSet<Board> Boards { get; set; }

        public DbSet<Square> Squares { get; set; }

        public DbSet<Answer> Answers { get; set; }

        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=gameDB.db;");
        }
    }


}
