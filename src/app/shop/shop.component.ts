import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ShopService } from './shop.service';
import { Category } from '../shared/models/category.model';
import { Format } from '../shared/models/format.model';
import { ShopParams } from '../shared/models/shopParams.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  formats: Format[] = [];

  searchTerm: string = "";

  shopParams = new ShopParams();

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  gridColumns = 3;

  totalCount = 0;

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getFormats();
  }

  getProducts() {

    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data,
        this.shopParams.pageNumber = response.pageIndex,
        this.shopParams.pageSize = response.pageSize,
        this.totalCount = response.count
      },
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
    this.shopParams.pageNumber = 1;
    this.shopParams.categoryId = categoryId;
    this.getProducts();
  }

  onFormatSelected(formatId: number) {
    this.shopParams.pageNumber = 1;
    this.shopParams.formatId = formatId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.value;
    this.getProducts();
  }

  handlePageEvent(event: any) {
    if(this.shopParams.pageNumber != event.pageIndex + 1) {
      this.shopParams.pageNumber = event.pageIndex + 1;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm ?? "";
    this.getProducts();
  }
}
