import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tickets-storage.service";
import {BlockStyleDirective} from "../../../directive/block-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService) {

  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(filter: string = ''): void {
    this.ticketService.getTickets(filter).subscribe(
      (data: ITour[]) => {
        this.tickets = data;
        this.blockDirective.initStyle(0);
        this.ticketStorage.setStorage(data);
      }
    )
  }

  filterTickets(filter: string) {
    this.loadTickets(filter);
  }

  ngAfterViewInit() {

  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate(['/tickets/ticket/', item.id]);
  }

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #F0FFFF')
    this.blockDirective.initStyle(3)
  }
}
