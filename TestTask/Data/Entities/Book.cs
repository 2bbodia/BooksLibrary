namespace TestTask.Data.Entities;

public class Book
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime PublishingDate { get; set; }
    public string Description { get; set; } = string.Empty;
    public int PagesCount { get; set; }
}


