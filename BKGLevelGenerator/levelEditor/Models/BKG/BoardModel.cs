using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Serialization;

namespace levelEditor.Models.BKG
{


    

    public class Board
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [XmlIgnore]
        public int Id { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public string Title { get; set; }

        public List<Category> Categories { get; set; } = new List<Category>();
        public List<Square> Squares { get; set; } = new List<Square>();

    }


    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [XmlIgnore]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [XmlIgnore]
        public int OrderId { get; set; }
    }

    public class Square
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [XmlIgnore]
        public int Id { get; set; }

        [Required]
        public int SquareId { get; set; }

        [Required]
        public string Question { get; set; }

        [Required]
        public int Value { get; set; }
        public Category Category { get; set; }

        [Required]
        [XmlIgnore]
        public int CategoryId { get; set; }


        public string ImageFilename { get; set; }

        [XmlIgnore]
        public byte[] Image { get; set; }

        [Required]
        public List<Answer> Answers { get; set; } = new List<Answer>();
    
    }

    public class Answer
    {
        [Key]
        [XmlIgnore]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Display { get; set; }

        
        
        public bool Correct { get; set; }

    
    }
}
