import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TabViewModule } from 'primeng/tabview';
import { AuthComponent } from './auth.component'
import { InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import {ToastModule} from "primeng/toast";
import {RegistrationComponent} from "./registration/registration.component";
import {MessageService} from "primeng/api";
import {TicketsRoutingModule} from "../tickets/tickets-routing.module";
import {TicketsModule} from "../tickets/tickets.module";

@NgModule({
  declarations: [
    AuthorizationComponent,
    AuthComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    TicketsRoutingModule,
    ToastModule,
    TicketsModule
  ],
  providers:[
    MessageService
  ]
})
export class AuthModule { }
