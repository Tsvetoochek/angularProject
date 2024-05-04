import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour, INearestTour, ITourLocation} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets(filter: string = ''): Observable<ITour[]> {
    let url = 'https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours';
    if (filter !== '') {
      url += `?name=${filter}`
    }
    return this.http.get<ITour[]>(url);
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/');
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
  }

  sendTourData(data: any): Observable<any> {
    return this.http.post('/assets/', data);
  }
}
