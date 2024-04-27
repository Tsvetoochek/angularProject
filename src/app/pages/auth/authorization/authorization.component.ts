import { Component, OnInit } from '@angular/core';
import { IUser } from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import { ConfigServiceService } from 'src/app/services/config/config-service.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText= 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean;
  
  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private config: ConfigServiceService) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigServiceService.config.useUserCard;
    console.log('init');
    this.authTextButton="Авторизироваться";
  }

  vipStatusSelected(): void {
    if (this.selectedValue) {
      console.log('vip');
    }
  }

  onAuth(ev: Event):void{
    const authUser: IUser={
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber || ''
    }


    if(this.authService.checkUser(authUser)){
      console.log('auth true');
      this.userService.setUser(authUser);
      this.userService.setToken('user-private-token');
      this.router.navigate(['tickets/ticketList']);
    } else {
      console.log('auth false');
      this.messageService.add({severity: "error", summary: 'Такого пользователя не существует'});
    }
  }
}
