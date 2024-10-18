using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Data;
using TicketManagementAPI.Entities;
using TicketManagementAPI.Features.Tickets.CreateTicket;
using TicketManagementAPI.Features.Tickets.DeleteTicket;
using TicketManagementAPI.Features.Tickets.GetAllTickets;
using TicketManagementAPI.Features.Tickets.GetTicketById;
using TicketManagementAPI.Features.Tickets.UpdateTicket;

namespace TicketManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ISender _sender;
        public TicketsController( ISender sender) 
        {
            _sender = sender;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> GetAllTickets()
        {
            var tickets = await _sender.Send(new GetAllTicketsQuery()); ;
            return Ok(tickets);
        }

		[HttpGet("{id}")]
		public async Task<ActionResult<Ticket>> GetTicketById(int id)
		{
            var ticket = await _sender.Send(new GetTicketByIdQuery(id));
            if (ticket is null)
                return NotFound("Ticket not found.");
			return Ok(ticket);
		}

		[HttpPost]
		public async Task<ActionResult<int>> AddTicket(CreateTicketCommand command)
		{
            var ticketId = await _sender.Send(command);

            return Ok(ticketId);
		}

		[HttpPut]
		public async Task<ActionResult<List<Ticket>>> UpdateTicket(UpdateTicketCommand command)
		{
			var result = await _sender.Send(command);
			if (result is null)
				return NotFound("Ticket not found.");
			return Ok(result);
		}

		[HttpDelete]
		public async Task<ActionResult<List<Ticket>>> DeleteTicket(int id)
		{
			var result = await _sender.Send(new DeleteTicketCommand(id));
			if (result is null)
				return NotFound("Ticket not found.");

			return Ok(result);
		}
	}
}
