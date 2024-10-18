import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './shared/components/ticket-list/ticket-list.component';
const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'tickets', component: TicketListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
