using MediatR;

namespace TicketManagementAPI.Features.Tickets.CreateTicket
{
	public record CreateTicketCommand(string Description, string Status, DateTime Date) : IRequest<int>;
}
