using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
          [Required]
        public DateTime DataOfBirth { get; set; }
          [Required]
        public string City { get; set; }
          [Required]
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAactive { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastAactive = DateTime.Now;
        }
    }
}