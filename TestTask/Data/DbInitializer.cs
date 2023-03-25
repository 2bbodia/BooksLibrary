using TestTask.Data.Entities;

namespace TestTask.Data;

public static class DbInitializer
{
    public static void Seed(AppDbContext db)
    {
        db.Database.EnsureCreated();
        SeedBooks(db);
        db.SaveChanges();
    }

    private static void SeedBooks(AppDbContext dbContext)
    {
        // Look for any users
        if (dbContext.Books.Any())
        {
            return; // DB has been seeded
        }

        Book[] books = new Book[]
        {
            new Book
            {
              Name="Book1",
              Description="Book1Desc",
              PagesCount = 100,
              PublishingDate = new DateTime(2023, 03, 24),

            },
            new Book
            {
              Name="Book2",
              Description="Book2Desc",
              PagesCount = 150,
              PublishingDate = new DateTime(2023, 03, 23),

            },
            new Book
            {
              Name="Book3",
              Description="Book3Desc",
              PagesCount = 50,
               PublishingDate = new DateTime(2023, 03, 22),

            },
            new Book
            {
                Name = "The Catcher in the Rye",
                PublishingDate = new DateTime(1951, 7, 16),
                Description = "A novel by J. D. Salinger, partially published in serial form in 1945–46 and as a novel in 1951.",
                PagesCount = 224
            },
            new Book
            {
                Name = "To Kill a Mockingbird",
                PublishingDate = new DateTime(1960, 7, 11),
                Description = "A novel by Harper Lee, published in 1960. It has been widely praised for its sensitive treatment of a child’s awakening to racism and prejudice in the American South.",
                PagesCount = 281
            },
            new Book
            {
                Name = "1984",
                PublishingDate = new DateTime(1949, 6, 8),
                Description = "A dystopian novel by George Orwell published in 1949. The novel is set in Airstrip One, formerly Great Britain, a province of the superstate Oceania, whose residents are victims of perpetual war, omnipresent government surveillance, and public manipulation.",
                PagesCount = 328
            },
            new Book
            {
                Name = "Brave New World",
                PublishingDate = new DateTime(1932, 1, 1),
                Description = "A novel by Aldous Huxley, published in 1932. The book presents a nightmarish vision of a future society.",
                PagesCount = 311
            },
            new Book
            {
                Name = "Pride and Prejudice",
                PublishingDate = new DateTime(1930, 1, 28),
                Description = "Pride and Prejudice, Jane Austen’s witty comedy of manners—one of the most popular novels of all time— that features splendidly civilized sparring between the proud Mr. Darcy and the prejudiced Elizabeth Bennet as they play out their spirited courtship in a series of eighteenth-century drawing-room intrigues",
                PagesCount = 352
            }
        };

        dbContext.Books.AddRange(books);

    }

}
