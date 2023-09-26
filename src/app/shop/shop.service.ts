import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination.model';
import { Product } from '../shared/models/product.model';
import { CategoryResponse } from '../shared/models/category.model';
import { Format, FormatResponse } from '../shared/models/format.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Pagination<Product[]>>(this.baseUrl + '/products?pageSize=50');
  }

  getCategories() {
    return this.http.get<CategoryResponse>(this.baseUrl + '/categories')
  }

  getFormats() {
    return this.http.get<FormatResponse>(this.baseUrl + '/formats')
  }
}
