import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/product/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl : string = environment.serverUrl

  constructor(private http : HttpClient) { }

  getCategories() {

    let url = this.baseUrl + '/api/categories'

    return this.http.get<CategoryModel[]>(url)
  }
}
