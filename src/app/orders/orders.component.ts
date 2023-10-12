import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  displayedColumns: string[] = ['order', 'date', 'total', 'status', 'details'];
  dataSource : Order[] = [];

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => this.dataSource = orders
    })
  }

}
