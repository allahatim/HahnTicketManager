import { Pipe, PipeTransform } from '@angular/core';
import { TicketModel } from '../models/ticket.model';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tickets: TicketModel[], searchTerm: string): TicketModel[] {
    if (!tickets || !searchTerm) {
      return tickets;
    }

    return tickets.filter(ticket =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketId.toString().includes(searchTerm)
    );
  }

}
