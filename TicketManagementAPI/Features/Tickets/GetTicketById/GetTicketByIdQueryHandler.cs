using MediatR;
using TicketManagementAPI.Data;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.GetTicketById
{
	public class GetTicketByIdQueryHandler : IRequestHandler<GetTicketByIdQuery, Ticket?>
	{
		private readonly DataContext _context;
		public GetTicketByIdQueryHandler(DataContext context)
		{
			_context = context;
		}
		public async Task<Ticket?> Handle(GetTicketByIdQuery request, CancellationToken cancellationToken)
		{
			var ticket = await _context.Tickets.FindAsync(request.TicketId);
			return ticket;
		}
	}
}
