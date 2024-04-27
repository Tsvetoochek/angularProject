import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from "primeng/menubar";
import { DropdownModule } from 'primeng/dropdown';
import {FormsModule} from "@angular/forms";
import {BlockStyleDirective} from "../../directive/block-style.directive";
import { CalendarModule } from "primeng/calendar";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlockStyleDirective
  ],
  imports: [
    CommonModule,
    CalendarModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    NgOptimizedImage,
    ToastModule,
    InputTextModule
  ],
  providers: [
    MessageService 
  ]
})
export class TicketsModule {
  constructor() {
    console.log('TicketsModule loaded.');
  }

  ngOnInit(): void {
  }
}
