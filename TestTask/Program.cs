using Microsoft.EntityFrameworkCore;
using TestTask.Data;

var builder = WebApplication.CreateBuilder(args);


//builder.Services.AddDbContext<AppDbContext>(options =>
//              options.UseSqlServer(builder.Configuration.GetConnectionString("AppDbContext"),
//                  builder => builder.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

builder.Services.AddDbContext<AppDbContext>(options =>
              options.UseInMemoryDatabase("AppDbContext"));

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt => opt.AddDefaultPolicy(builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
};

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<AppDbContext>();
        //dbContext.Database.Migrate();
        DbInitializer.Seed(dbContext);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

app.Run();
