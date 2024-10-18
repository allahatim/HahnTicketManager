using MediatR;
using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Data;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.GetAllTickets
{
	public class GetAllTicketsQueryHandler : IRequestHandler<GetAllTicketsQuery, List<Ticket?>>
	{
		private readonly DataContext _context;
		public GetAllTicketsQueryHandler(DataContext dataContext)
		{
			_context = dataContext;
		}

		public async Task<List<Ticket?>> Handle(GetAllTicketsQuery request, CancellationToken cancellationToken)
		{
			return await _context.Tickets.ToListAsync();
		}
	}
}
