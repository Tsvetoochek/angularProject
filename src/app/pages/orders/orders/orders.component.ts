import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ITour } from 'src/app/models/tours';
import { OrderType } from 'src/app/shared/mocks/orders';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _destroyer: Subscription;
  tableData$: Observable<TreeNode<OrderType[]>[]> ;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {

    this.initOrders();

    this._destroyer = this.ordersService.groupOrders$.subscribe((data) => {
      this.initOrders();
    });
  }

  ngOnDestroy(): void {
    this._destroyer.unsubscribe();
  }


  initOrders(): void {
    this.tableData$ = this.ordersService.getOrders();
  }

}
