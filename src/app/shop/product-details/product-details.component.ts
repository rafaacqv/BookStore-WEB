import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product?: Product;
  numbers: Array<number> = [1, 2, 3, 4, 5];
  selected: number = 1;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private basketService: BasketService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  addItemToBasket() {
    this.product && this.basketService.addItemToBasket(this.product, this.selected);
  }

  getProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe({
      next: product => this.product = product,
      error: error => console.error(error)
    });
  }

}
