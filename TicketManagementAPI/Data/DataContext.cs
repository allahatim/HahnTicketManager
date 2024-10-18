using Auth0.ManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        { 
        }
        public DbSet<Entities.Ticket> Tickets { get; set; }

    }
}
