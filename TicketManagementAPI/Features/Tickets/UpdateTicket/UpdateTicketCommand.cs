using MediatR;
using TicketManagementAPI.Entities;

namespace TicketManagementAPI.Features.Tickets.UpdateTicket
{
	public record UpdateTicketCommand(int TicketId, string Description, string Status, DateTime Date) : IRequest<Ticket?>;

}
