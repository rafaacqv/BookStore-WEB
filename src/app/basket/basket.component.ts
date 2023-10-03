import { Component } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  numbers: Array<number> = [1, 2, 3, 4, 5];
}
