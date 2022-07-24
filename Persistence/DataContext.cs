using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions options) : base(options) 
        {

        }
        // Represents a table in the Database
        public DbSet<Activity> Activities { get; set;}
    }
}