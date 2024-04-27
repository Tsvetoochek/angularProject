import {Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ElementRef} from '@angular/core';
import {MenuItem} from "primeng/api";
import { IUser } from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {IMenuType} from "../../../models/menuType";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges{
  items: MenuItem[];
  user: IUser | null;
  time: Date;
  private timerInterval: number;
  private settingsActive = false;
  @Input() menuType: IMenuType;
  public btn: any;
  constructor(private userService: UserService,
              private AuthService: AuthService,
              private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.items = this.initMenuItems();
    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();


  }



  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['ticketList']
      },
      {
        label: 'Настройки',
        routerLink: ['/settings'],
        // visible: this.settingsActive
       },
       {
        label: 'Заказы',
        routerLink:['orders'],
       },
      {
        label: 'Выйти',
        routerLink: ['/auth'],
      },
    ];
  }
}

