using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Activities;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

// add services to the container

builder.Services.AddControllers();
//     opt => 
// {
//     var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
//     opt.Filters.Add(new AuthorizeFilter(policy));
// });
builder.Services.AddApplicationServices(builder.Configuration);
// builder.Services.AddIdentityServices(builder.Configuration);

// Configure the HTTP request pipeline

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
            
if (builder.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();


using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
var context = services.GetRequiredService<DataContext>();
await context.Database.MigrateAsync();
await Seed.SeedData(context);
}
catch (Exception ex)
{                
var logger = services.GetRequiredService<ILogger<Program>>();
logger.LogError(ex, "An error occured during migration.");
}

app.Run();

