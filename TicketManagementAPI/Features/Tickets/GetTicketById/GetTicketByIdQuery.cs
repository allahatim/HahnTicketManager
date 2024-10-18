using MediatR;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.GetTicketById
{
	public record GetTicketByIdQuery(int TicketId) : IRequest<Ticket?>;
}
