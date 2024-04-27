import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from "./settings-routing.module";
import { StatisticComponent } from './statistic/statistic.component';
import { SharedModule } from 'primeng/api';
import { TabView, TabViewModule } from 'primeng/tabview';
import { TableModule } from "primeng/table"
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from "primeng/api";
import { UsersComponent } from './users/users.component'
import { InputTextModule } from 'primeng/inputtext';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    ChangePasswordComponent,
    UsersComponent,
    FilterPipe,
  ],
  imports: [
    SharedModule,
    CommonModule,
    TabViewModule,
    SettingsRoutingModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule
  ],
  providers: [ MessageService, TabView ]
})
export class SettingsModule {

  constructor() {
    console.log('Settings loaded.');
  }

  ngOnInit(): void {
  }
}
