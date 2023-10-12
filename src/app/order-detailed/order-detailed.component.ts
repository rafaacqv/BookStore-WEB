import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders/orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.css']
})
export class OrderDetailedComponent implements OnInit {
  order?: Order;

  constructor(private orderService: OrdersService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(+id).subscribe({
      next: order => {
      this.order = order;
    }
  })
}

}
