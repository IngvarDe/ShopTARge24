using Microsoft.AspNetCore.Mvc;
using ReactCRUD.Core.ServiceInterface;
using ReactCRUD.Data;
using ReactCRUD.Server.ViewModels;

namespace ReactCRUD.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class SchoolController : ControllerBase
    {
        private readonly ReactCRUDContext _context;
        private readonly SchoolInterface _schoolInterface;

        public SchoolController
            (
                ReactCRUDContext context,
                SchoolInterface schoolInterface
            )
        {
            _context = context;
            _schoolInterface = schoolInterface;
        }


        //[HttpGet(Name = "SchoolList")]
        public IActionResult GetSchools()
        {
            var result = _context.Schools
                .Select(x => new SchoolListViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address,
                    StudentCount = x.StudentCount,
                })
                .ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(Guid id)
        {
            var school = await _schoolInterface.SchoolDetail(id);
            if (school == null)
            {
                return NotFound();
            }
            var result = new SchoolListViewModel
            {
                Id = school.Id,
                Name = school.Name,
                Address = school.Address,
                StudentCount = school.StudentCount,
            };

            return Ok(result);
        }
    }
}
