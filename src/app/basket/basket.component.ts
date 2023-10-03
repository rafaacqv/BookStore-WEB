import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket, BasketItem } from '../shared/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  numbers: Array<number> = [1, 2, 3, 4, 5];

  updateQuantity(basket: Basket, item: BasketItem) {
    var result = basket.items.map(e => e.id == item.id ? {...e, quantity: item.quantity}: e);
    if(result) basket.items = result;

    this.basketService.setBasket(basket);
  }
}
