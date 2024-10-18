using MediatR;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.GetAllTickets
{
	public class GetAllTicketsQuery : IRequest<List<Ticket?>>
	{
	}
}
