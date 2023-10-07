import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  constructor(private router: Router, public basketService: BasketService) {}

  items: BasketItem[] = [];

  ngOnInit(): void {
    this.basketService.basketSource$.subscribe(res => {
      if(res?.items) this.items = res.items;
    })
  }

  getCount(items: BasketItem[]) {
    console.log(items)
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
