import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination.model';
import { Product } from '../shared/models/product.model';
import { CategoryResponse } from '../shared/models/category.model';
import { FormatResponse } from '../shared/models/format.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getProducts(categoryId?: number, formatId?: number, sort?: string) {
    let params = new HttpParams()

    if(categoryId) params = params.append('categoryId', categoryId);
    if(formatId) params = params.append('formatId', formatId);
    if(sort) params = params.append('sort', sort);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + '/products', { params });
  }

  getCategories() {
    return this.http.get<CategoryResponse>(this.baseUrl + '/categories')
  }

  getFormats() {
    return this.http.get<FormatResponse>(this.baseUrl + '/formats')
  }
}
