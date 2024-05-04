import { Injectable } from '@angular/core';
import { TicketRestService} from "../rest/ticket-rest.service";
import { map, Observable, Subject} from "rxjs";
import { ITour, ITourTypeSelect, INearestTour, ITourLocation, INearestTourWithCountry } from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject = new Subject<ITourTypeSelect>();

  constructor(private ticketServiceRest: TicketRestService) { }

  transformNearestTours(nearestTours: INearestTour[], toursLocation: ITourLocation[]): INearestTourWithCountry[] {
    return nearestTours.map((tour) => {
      const location = toursLocation.find((loc) => loc.id === tour.locationId);
      const country = location ? location.country : 'Unknown';
      return { ...tour, country } as INearestTourWithCountry;
    });
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
   }
    
  updateTour(type:ITourTypeSelect): void {
     this.ticketSubject.next(type);
   }

   getTickets(filter: string = ''): Observable<ITour[]> {
    
    return this.ticketServiceRest.getTickets(filter).pipe(map(
       (value: ITour[]) => {
        const singleTours = value.filter((el: ITour) => el.type ===  "single");
        return value.concat(singleTours);
       })); 
     
  }

  getError(): Observable<any> {
    return new Observable((observer) => {
      this.ticketServiceRest.getRestError().subscribe({
        next: (data) => {
          observer.next(data);
          observer.complete(); 
        },
        error: (err) => {
          observer.error(err);
        }

        });
       });
      }

  getNearestTours():Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation():Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketServiceRest.sendTourData(data);
  }
}
