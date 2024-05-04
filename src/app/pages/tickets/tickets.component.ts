import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationStart } from '@angular/router';
import { IMenuType } from 'src/app/models/menuType';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap, filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType;
  showAside = true;
  destroyer = new Subject();
  dataProp = 'asideHidden';
  constructor(private router: Router, private route: ActivatedRoute,) { }

  getSelectedType(): IMenuType {
    return this.getSelectedType();
  }
   updateSelectedType(ev: IMenuType): void {
     this.selectedType = ev;
   }

  ngOnInit(): void {

    this.showAside = !this.recursFindPropertyInData(this.route.snapshot, this.dataProp);

    this.router.events.pipe(
      tap((data) => {
        console.log("data", data)
      }),
      filter((ev) => ev instanceof ActivationStart ),
      takeUntil(this.destroyer),
    ).subscribe((data) => {
      if (data instanceof ActivationStart) {
        this.showAside = !this.recursFindPropertyInData(data.snapshot,  this.dataProp)
    }
  });


}

ngOnDestroy() {
  this.destroyer.next(true);
  this.destroyer.complete();
}

recursFindPropertyInData(currentSnapshot: ActivatedRouteSnapshot, searchProp: string): boolean {
  console.log('currentSnapshot', currentSnapshot)

  if (currentSnapshot?.data[searchProp]) {
    return true;
  } else {
    if (Array.isArray(currentSnapshot.children)) {
      let result = false;

      currentSnapshot.children.every((el:ActivatedRouteSnapshot, i:number) => {
        result = this.recursFindPropertyInData(el, searchProp);
        if (result) {
          return false;
        } else {
          return true;
        }
      });

      return result; 
      }else{
        return false;
      }
    }
  }
}

 