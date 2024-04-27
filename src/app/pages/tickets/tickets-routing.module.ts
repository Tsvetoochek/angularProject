import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from "./tickets.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {path: '',
    component: TicketsComponent,
    children: [
      {
        path: 'ticketList',
        component: TicketListComponent
      },
      {
        path: 'ticket/:id',
        loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {asideHidden: true}
      },
      // {
      //   path: 'orders',
      //   loadChildren: () => import('../')
      // }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
