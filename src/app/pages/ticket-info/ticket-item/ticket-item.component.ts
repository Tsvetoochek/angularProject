import { AfterViewInit, Component, OnInit } from '@angular/core';
import { INearestTour, ITour, ITourLocation, INearestTourWithCountry } from '../../../models/tours';
import { IUser } from 'src/app/models/users';
import { ActivatedRoute } from '@angular/router';
import { TicketsStorageService } from '../../../services/tiсkets-storage/tickets-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { forkJoin } from 'rxjs';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;
  // item: any;
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];
  // nearestToursWithCountry: INearestTourWithCountry[]; 

  constructor(
    private route: ActivatedRoute,
    private ticketStorage: TicketsStorageService,
    private userService: UserService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required }),
      lastName: new FormControl('', 
      [Validators.required, Validators.minLength(2),]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(''),
      age: new FormControl(),
      citizen: new FormControl(''),
    });

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      this.nearestTours = data[0];
      this.toursLocation = data[1];
    })

    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket);
    }
  }
  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
  }

  onSubmit(): void {}

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    // console.log('postData', postData)
    // console.log('this.userForm.getRawValue()', this.userForm.getRawValue())
     this.ticketService.sendTourData(postData).subscribe()
  }
  
  selectDate(ev: Event): void {}
}
