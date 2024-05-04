import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password';
import { IUser } from 'src/app/models/users';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private user: IUser | null;

  constructor(private userService: UserService,
              private messageService: MessageService,
  ) { }
  
  changePasswordForm: FormGroup;

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('',[Validators.required,]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6),createPasswordStrengthValidator()]),
      newPasswordRepeat: new FormControl('', [Validators.required, Validators.minLength(6),createPasswordStrengthValidator()]),
    });
  }

  onSubmitChangePassword(): void | boolean {
    console.log('click')
    const currentPsw = this.changePasswordForm.get("currentPassword")?.value;
    const newPsw = this.changePasswordForm.get("newPassword")?.value;
    const repeatNewPsw = this.changePasswordForm.get("newPasswordRepeat")?.value;

    if(!this.user) {
      this.messageService.add({
        severity:'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Что-то не так'
      });
      return false;
    }
    if(this.user.psw !== currentPsw) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Пароль не верный'
      });
      return false;
    }

    if (newPsw!== repeatNewPsw) {
      console.log('пароли не совпадают');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Пароли не совпадают'
      });
      return false
    }

    this.user.psw = this.changePasswordForm.value.newPassword;
  }

}
