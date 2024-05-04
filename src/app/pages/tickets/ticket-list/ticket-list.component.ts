import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {BlockStyleDirective} from "../../../directive/block-style.directive";
import { Subscription } from 'rxjs';
import { ITourTypeSelect, INearestTour, INearestTourWithCountry, ITourLocation } from '../../../models/tours';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  nearestToursWithCountry: INearestTourWithCountry[];
  private tourUnsubscriber: Subscription;
  tickets: ITour[] = [];
  ticketsCopy: ITour[];
  loadCountBlock = false;
  defaultDate: string;



  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService) {

  }

  ngOnInit(): void {
    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {  console.log('data', data)

      // let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;

      }

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue);
        this.tickets = this.tickets.filter((el) => el.date === dateValue);
      }

      setTimeout(() => {

        this.blockDirective.updateItems();

        this.blockDirective.initStyle(0);
      });
    });


    this.loadTickets(true);
  }

  loadTickets(firstInit = true, filter: string = ''): void {
    this.ticketService.getTickets(filter).subscribe(
      (data: ITour[]) => {
        this.tickets = data;
        if (!firstInit) {
          this.ticketsCopy = [...this.tickets];
          this.blockDirective.updateElements();
          this.blockDirective.initStyle(0);
        }

        this.ticketStorage.setStorage(data);
      }
    )
  }

  filterTickets(filter: string) {
    this.loadTickets(false, filter);
  }

  ngAfterViewInit() {
    
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate(['/tickets/ticket/', item.id]);
  }

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #F0FFFF')
    this.blockDirective.initStyle(0)
  }

  getTickets() {
    this.ticketService.getTickets().subscribe(
    (data) => {
         this.tickets = data;
         this.ticketsCopy = [...this.tickets];
         this.ticketStorage.setStorage(data);
    })
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
   }
}
