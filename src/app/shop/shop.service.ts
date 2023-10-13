import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination.model';
import { Product } from '../shared/models/product.model';
import { CategoryResponse } from '../shared/models/category.model';
import { FormatResponse } from '../shared/models/format.model';
import { ShopParams } from '../shared/models/shopParams.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams()

    if(shopParams.categoryId) params = params.append('categoryId', shopParams.categoryId);
    if(shopParams.formatId) params = params.append('formatId', shopParams.formatId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if(shopParams.search) params = params.append('search', shopParams.search);


    return this.http.get<Pagination<Product[]>>(this.baseUrl + '/products', { params });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + '/products/' + id);
  }

  getCategories() {
    return this.http.get<CategoryResponse>(this.baseUrl + '/categories')
  }

  getFormats() {
    return this.http.get<FormatResponse>(this.baseUrl + '/formats')
  }
}
