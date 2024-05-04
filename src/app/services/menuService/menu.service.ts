import { Injectable } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  selectedType: IMenuType;

  constructor() { }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

  getSelectedType(): IMenuType {
    return this.selectedType;
  }
}
