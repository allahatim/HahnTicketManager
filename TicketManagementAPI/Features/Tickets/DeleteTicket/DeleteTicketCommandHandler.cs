using Auth0.ManagementApi.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Data;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.DeleteTicket
{
	public class DeleteTicketCommandHandler : IRequestHandler<DeleteTicketCommand, List<Entities.Ticket?>>
	{
		private readonly DataContext _context;
		public DeleteTicketCommandHandler(DataContext dataContext)
		{
			_context = dataContext;
		}
		public async Task<List<Entities.Ticket?>> Handle(DeleteTicketCommand request, CancellationToken cancellationToken)
		{
			var dbticket = await _context.Tickets.FindAsync(request.TicketId);
			if (dbticket is null)
				return null;

			_context.Tickets.Remove(dbticket);
			await _context.SaveChangesAsync();
			return await _context.Tickets.ToListAsync();

		}
	}
}
