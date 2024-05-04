import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SettingUsersService, SettingsUsers } from '../services/setting-users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: SettingsUsers[];
  searchValue: string;
  asyncUsers = this.usersSettingService.getUsers();

  constructor(private usersSettingService: SettingUsersService) { }

  ngOnInit(): void {
  }

}
