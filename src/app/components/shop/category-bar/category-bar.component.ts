import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/models/product/category-model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit{

  categories: CategoryModel[] = []

  private _activeCategoryId?: number

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit(): void {

    let allCategory = new CategoryModel()
    allCategory.id = 0
    allCategory.name = "Wszystkie"

    let activeCategoryId = this.productService.activeCategoryId

    this.categoryService.getCategories().subscribe((data: CategoryModel[]) => {
      this.categories.push(allCategory)
      this.categories = this.categories?.concat(data)

      this.highlightCategory(activeCategoryId)
    })
  }

  activateCategory(categoryId: number) {
    this.highlightCategory(categoryId);
    this.productService.activeCategoryId = categoryId
    this.productService.getShopProducts(5,0)
  }


  private highlightCategory(categoryId: number) {
    if (this._activeCategoryId != null) {
      this.categories.find((category: CategoryModel) => category.id == this._activeCategoryId)!.active = false;
    }

    this.categories.find((category: CategoryModel) => category.id == categoryId)!.active = true;

    this._activeCategoryId = categoryId
  }
}
