using Microsoft.EntityFrameworkCore;
using TestTask.Data.Entities;

namespace TestTask.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Book>()
               .Property(u => u.PublishingDate)
               .HasColumnType("date");
    }

}
