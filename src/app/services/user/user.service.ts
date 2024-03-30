import { Injectable } from '@angular/core';
import { IUser } from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'currentUser';
  private user: IUser;

  constructor() {
    this.user = JSON.parse(localStorage.getItem(this.userKey) || '{}') as IUser;
  }

  getUser(): IUser {
    return this.user;
  };
  setUser(user: IUser) {
    this.user = user;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  };

}
