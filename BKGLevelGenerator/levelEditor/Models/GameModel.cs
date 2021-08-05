﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace levelEditor.Models
{
    public class Game
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set;}

        public byte[] Image { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public bool Active { get; set; }

        public bool Featured { get; set; }
    }
}
