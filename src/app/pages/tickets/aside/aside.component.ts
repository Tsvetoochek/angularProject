import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { MessageService } from 'primeng/api';
import { SettingsService } from 'src/app/services/settings/settings.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  tourTypes: ITourTypeSelect[] = [
    { label: 'Все', value: 'all' },
    { label: 'Одиночный', value: 'single' },
    { label: 'Групповой', value: 'multi' },
  ];

  @Output() updateMenuType: EventEmitter<IMenuType> =
    new EventEmitter<IMenuType>();

  constructor(private ticketService: TicketService, private messageService: MessageService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.menuTypes = [
      { type: 'custom', label: 'Обычное' },
      { type: 'extended', label: 'Расширенное' },
    ];
  }

  onSelectType(menuType: IMenuType): void {
    this.selectedMenuType = menuType;
    this.updateMenuType.emit(menuType);
  }

  changeType(ev: { ev: Event; value: IMenuType }): void {
    console.log('ev', ev);
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev: { ev: Event; value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value);
  }

  selectDate(ev: string) {
    console.log('ev', ev);
    this.ticketService.updateTour({ date: ev });
  }

  initRestError(): void {
    this.ticketService.getError().subscribe(
      (data) => {},
      (err) => {
        console.log('err', err);
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Произошла ошибка: ' + err.message });
   }
  );
}


  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    });
  }
}
