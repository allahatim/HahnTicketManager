using MediatR;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.DeleteTicket
{
	public record DeleteTicketCommand(int TicketId) : IRequest<List<Ticket?>>;
}
