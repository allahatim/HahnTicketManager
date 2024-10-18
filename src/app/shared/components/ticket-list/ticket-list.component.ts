import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketModel } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import { ticketValidationSchema } from '../../validators/ticket-validation.schema';
import * as Yup from 'yup';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: TicketModel[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  ticketForm: FormGroup; 
  editingTicket: TicketModel | null = null; 
  createModal!: bootstrap.Modal;
  editModal!: bootstrap.Modal;
  sortColumn: string = 'ticketId';
  sortOrder: boolean = true;

  constructor(private ticketService: TicketService, private formBuilder: FormBuilder) {
    this.ticketForm = this.formBuilder.group({
      description: ['', Validators.required],
      status: ['Open', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchTickets();
    const modalElement = document.getElementById('createTicketModal');
    const editModalElement = document.getElementById('editTicketModal'); 
    if (modalElement) {
      this.createModal = new bootstrap.Modal(modalElement);
    }
    if (editModalElement) {
      this.editModal = new bootstrap.Modal(editModalElement);
    }
  }

  fetchTickets(): void {
    this.loading = true;
    this.ticketService.getTickets().subscribe({
      next: (data: TicketModel[]) => {
        this.tickets = data; 
        this.sortTickets();
        this.loading = false;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching tickets.',
          text: error.message
        });
        this.loading = false;
      }
    });
  }

  sortTickets(): void {
    this.tickets.sort((a, b) => {
      const aValue = a[this.sortColumn as keyof TicketModel];
      const bValue = b[this.sortColumn as keyof TicketModel];
  
      if (aValue < bValue) {
        return this.sortOrder ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortOrder ? 1 : -1;
      }
      return 0;
    });
  }

  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortOrder = !this.sortOrder;
    } else {
      this.sortColumn = column;
      this.sortOrder = true; 
    }
    this.sortTickets(); 
  }

 
  
  filterTickets(): void {
    if (this.searchTerm) {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.tickets = this.tickets.filter(ticket =>
        ticket.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        ticket.ticketId.toString().includes(lowerCaseSearchTerm))
    } else {
      this.fetchTickets();
    }
  }
  
  clearSearch() {
    this.searchTerm = '';
    this.filterTickets(); 
  }
  createNewTicket(): void {
    this.editingTicket = null; 
    this.ticketForm.reset({ status: 'Open' });
    this.createModal.show();
  }

  editTicket(ticket: TicketModel): void {
    this.editingTicket = ticket; 
    const date = new Date(ticket.date);
    const formattedDate = 
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;    
        
    this.ticketForm.patchValue({
      description: ticket.description,
      status: ticket.status,
      date: formattedDate
    });
    this.editModal.show();
  }
  async saveTicket(): Promise<void> {
    const ticketData = this.ticketForm.value;
  
    try {
      await ticketValidationSchema.validate(ticketData, { abortEarly: false });
  
      if (this.editingTicket) {
        const updatedTicket: TicketModel = { ...this.editingTicket, ...ticketData };
        
        this.ticketService.updateTicket(updatedTicket).subscribe({
          next: () => {
            const index = this.tickets.findIndex(t => t.ticketId === this.editingTicket!.ticketId);
            if (index !== -1) {
              this.tickets[index] = updatedTicket; 
            }
            Swal.fire({
              icon: 'success',
              title: 'Ticket updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.editingTicket = null; 
            this.ticketForm.reset();
            this.fetchTickets();
            this.closeModal(); 
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to update ticket.',
              text: error.message
            });
          }
        });
      } else {
        this.ticketService.createTicket(ticketData).subscribe({
          next: (newTicket: TicketModel) => {
            this.tickets.push(newTicket); 
            Swal.fire({
              icon: 'success',
              title: 'Ticket created successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.ticketForm.reset();
            this.fetchTickets();
            this.closeModal(); 
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to create ticket.',
              text: error.message
            });
          }
        });
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Errors',
          html: error.errors.map(err => `<p>${err}</p>`).join(''),
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Unexpected Error',
          text: 'An unexpected error occurred. Please try again later.',
        });
        console.error('Unexpected error:', error); 
      }
    }
  }
  closeModal(): void {
    const modalElement = document.getElementById('createTicketModal') as HTMLElement;
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
      
    }
  }


  deleteTicket(ticket: TicketModel): void {
    Swal.fire({
      title: `Are you sure you want to delete ticket ID ${ticket.ticketId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.deleteTicket(ticket.ticketId).subscribe({
          next: () => {
            this.tickets = this.tickets.filter(t => t.ticketId !== ticket.ticketId);
            Swal.fire({
              icon: 'success',
              title: 'Ticket deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete ticket.',
              text: error.message
            });
          }
        });
      }
    });
  }
}
