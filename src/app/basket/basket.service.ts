import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryMethod } from '../shared/models/deliveryMethod.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  shipping = 0;
  //shippingValue: number = 1;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    const basket = this.getCurrentBasketValue();
    this.shipping = deliveryMethod.price;
    if(basket) {
      basket.deliveryMethodId = deliveryMethod.id;
      this.setBasket(basket);
    }
  }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotal();
      }
    });
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotal();
      }
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(e => e.id === itemToAdd.id);
    if(item) {
      var sumLimit = item.quantity + quantity;
      if(sumLimit <= 5) {
        item.quantity += quantity;
        return items;
      }
      else {
        this._snackBar.open("Maximum limit of five for this product.", "Close")
        return items;
      }
    }
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }

    return items;
  }

  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.title,
      price: item.price,
      quantity: 0,
      imageUrl: item.imageUrl,
      category: item.category,
      format: item.format
    }
  }

  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    if(!basket) return;

    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = this.shipping + subtotal;
    this.basketTotalSource.next({shipping: this.shipping, total, subtotal});
  }

  removeItemFromBasket(id: number) {
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    basket.items = basket.items.filter(x => x.id !== id);
    if(basket.items.length > 0) this.setBasket(basket);
    else this.deleteBasket(basket);
  }

  deleteBasket(basket: Basket){

    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    });
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
}
