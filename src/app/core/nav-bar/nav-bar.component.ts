import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) {}

  loadHome() {
    this.router.navigate(['/']);
  }
}
