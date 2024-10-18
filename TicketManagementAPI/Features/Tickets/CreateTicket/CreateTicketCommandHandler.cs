using MediatR;
using TicketManagementAPI.Data;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.CreateTicket
{
	public class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand, int>
	{
		private readonly DataContext _context;
		public CreateTicketCommandHandler(DataContext context) 
		{
			_context = context;
		}

		public async Task<int> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
		{
			var ticket = new Ticket { Description = request.Description, Status = request.Status, Date = request.Date };
			_context.Tickets.Add(ticket);
			await _context.SaveChangesAsync();

			return ticket.TicketId;
		}
	}
}
