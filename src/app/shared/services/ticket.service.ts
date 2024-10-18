import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketModel } from '../models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'https://localhost:7205/api/Tickets';

  constructor(private http: HttpClient) {}
  
  // Fetch all tickets
  getTickets(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.apiUrl);
  }
  
  // Create a new ticket
  createTicket(ticket: TicketModel): Observable<TicketModel> {
    return this.http.post<TicketModel>(this.apiUrl, ticket);
  }

  // Update an existing ticket
  updateTicket(ticket: TicketModel): Observable<TicketModel> {
    return this.http.put<TicketModel>(`${this.apiUrl}`, ticket);
  }

  // Delete a ticket
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
  
}
