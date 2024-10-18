using System.ComponentModel.DataAnnotations;

namespace TicketManagementAPI.Entities
{
    public class Ticket
    {
		
		public int TicketId { get; set; }
		public string Description { get; set; } = String.Empty;
		public string Status { get; set; } = String.Empty;
		public DateTime Date { get; set; }
	}
}
