import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {Component, OnInit} from "@angular/core";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  localStorage: boolean = false;
  isSave: boolean = false;

  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  localStorageChecked(checked: boolean){
    this.localStorage = checked;
  }

  registration(ev: Event):void|boolean{
    if(!this.passwordsMatch()){
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'});
      return false;
    }
    const userObj: IUser ={
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      email: this.email
    }
    if(this.authService.checkUser(userObj)){
      this.messageService.add({severity:'warn', summary: 'Пользователь с этим логином уже существует'});
      return;
    }
    this.authService.setUser(userObj, this.isSave);
    this.messageService.add({severity:'success', summary: 'Вы успешно зарегистрировались'});
    if(this.localStorage){
      localStorage.setItem(userObj.login, JSON.stringify(userObj));
    }
  }

  passwordsMatch(): boolean {
    return this.psw === this.pswRepeat;
  }
}
