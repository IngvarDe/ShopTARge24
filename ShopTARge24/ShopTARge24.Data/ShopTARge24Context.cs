using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopTARge24.Core.Domain;


namespace ShopTARge24.Data
{
    public class ShopTARge24Context : IdentityDbContext<ApplicationUser>
    {
        public ShopTARge24Context(DbContextOptions<ShopTARge24Context> options)
            : base(options) { }

        public DbSet<Spaceships> Spaceships { get; set; }
        public DbSet<FileToApi> FileToApis { get; set; }
        public DbSet<RealEstate> RealEstates { get; set; }
        public DbSet<FileToDatabase> FileToDatabases { get; set; }

        public DbSet<IdentityRole> IdentityRoles { get; set; }
    }
}
