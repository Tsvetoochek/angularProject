import { Injectable } from '@angular/core';
import { ITour } from '../../models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketStorage: ITour[]


  constructor() { }

  setStorage(data: ITour[]): void {
    console.log('xxx', data)
    this.ticketStorage = data;
  }
  getStorage(): ITour[] {
    return this.ticketStorage || [];
  }
}
