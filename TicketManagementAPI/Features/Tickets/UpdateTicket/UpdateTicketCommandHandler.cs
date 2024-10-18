using MediatR;
using TicketManagementAPI.Data;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.UpdateTicket
{
	public class UpdateTicketCommandHandler : IRequestHandler<UpdateTicketCommand, Ticket?>
	{
		private readonly DataContext _context; 
		public UpdateTicketCommandHandler(DataContext context) 
		{
			_context = context;
		}
		public async Task<Ticket?> Handle(UpdateTicketCommand request, CancellationToken cancellationToken)
		{
			var dbTicket = await _context.Tickets.FindAsync(request.TicketId);
			if (dbTicket is null)
				return null;
			dbTicket.Description = request.Description;
			dbTicket.Status = request.Status;
			dbTicket.Date = request.Date;
			await _context.SaveChangesAsync();
			return dbTicket;
		}
	}
}
