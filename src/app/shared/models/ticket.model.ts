export interface TicketModel {
    ticketId: number;          
    description: string; 
    status: 'Open' | 'Closed'; 
    date: Date;        
  }