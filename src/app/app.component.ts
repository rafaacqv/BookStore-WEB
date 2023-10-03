import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/material/loading.service';
import { Subject } from 'rxjs';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService,
              private basketService: BasketService) {}

  ngOnInit(): void {
    const basket_id = localStorage.getItem('basket_id');
    if(basket_id) this.basketService.getBasket(basket_id);
  }
}
