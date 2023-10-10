import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent {
  constructor(private router: Router) {}

  viewOrders() {
    this.router.navigateByUrl('/');
  }
}
