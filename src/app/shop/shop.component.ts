import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ShopService } from './shop.service';
import { Category } from '../shared/models/category.model';
import { Format } from '../shared/models/format.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  formats: Format[] = [];

  categoryIdSelected = 0;
  formatIdSelected = 0;

  gridColumns = 3;

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getFormats();
  }

  getProducts() {
    this.shopService.getProducts(this.categoryIdSelected, this.formatIdSelected).subscribe({
      next: response => this.products = response.data,
      error: error => console.error(error)
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: response => this.categories = [{id: 0, name: 'All'}, ...response.categories],
      error: error => console.error(error)
    });
  }

  getFormats(){
    this.shopService.getFormats().subscribe({
      next: response => this.formats = [{ id: 0, type: 'All' },...response.formats],
      error: error => console.log(error)
    })
  }

  onCategorySelected(categoryId: number) {
    this.categoryIdSelected = categoryId;
    this.getProducts();
  }

  onFormatSelected(formatId: number) {
    this.formatIdSelected = formatId;
    this.getProducts;
  }
}
