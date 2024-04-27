import { Injectable } from '@angular/core';
import { IUser } from "../../models/users";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'currentUser';
  private token: string;
  private user: IUser;

  private userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSubject$ = this.userBehSubject.asObservable();

  constructor() {
    this.user = JSON.parse(localStorage.getItem(this.userKey) || '{}') as IUser;
  }

  getUser(): IUser {
    return this.user || this.getFromStorage();
  }
  setUser(user: IUser): void {
    this.user = user;
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userBehSubject.next(this.user);
  }
  setToken(token: string): void{
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }

  public getFromStorage(): IUser | null {
    const userFromStore = localStorage.getItem(this.userKey);
    if (userFromStore) {
      return JSON.parse(userFromStore);
    }
   return null;
  }
}
