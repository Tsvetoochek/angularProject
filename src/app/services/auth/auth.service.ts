import { Injectable } from '@angular/core';
import {IUser, USER_STORE_NAME} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage:IUser[] = [];
  constructor() { }

  checkUser(user: IUser):boolean {
    const isUserExists = this.usersStorage.find((el: IUser) => el.login === user.login);
    let isUserSavedInStore = window.localStorage.getItem(USER_STORE_NAME);
    let userInStore: IUser = <IUser>{};

    if (isUserSavedInStore) {
      userInStore = JSON.parse(isUserSavedInStore);
    }

    if (isUserExists) {
      return isUserExists.psw === user.psw;
    } else if (userInStore?.login) {
      return userInStore.psw === user.psw;
    }
    return false;
  }

  setUser(user: IUser, saveToLocalStorage: boolean = false): void {

    if (saveToLocalStorage) {
      window.localStorage.setItem("user_"+user.login, JSON.stringify(user));
    }

    const isUserExists = this.usersStorage.find((el: IUser) => el.login === user.login);
    if (!isUserExists && user?.login){
      this.usersStorage.push(user);
    }
  }
}
