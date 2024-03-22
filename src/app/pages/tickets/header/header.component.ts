import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import { IUser } from "../../../models/users";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  user: IUser;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.items = [
      {
        label: 'Билеты',
        routerLink:['ticketList']
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
      }
    ];
  }

}
