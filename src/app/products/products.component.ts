import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../models/app-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Array<AppProduct> = [];
  filteredProducts: any[] = []; //cannot use interface cos doesn't have key
  // products$: Observable<any> = new Observable
  categories$: Observable<any> = new Observable
  productsService: any;
  category: string | null = '';

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {
      productService.getAll().subscribe((products: Array<any>) =>
      this.products = products);
      // this.products$ = productService.getAll();

      this.categories$ = categoryService.getAll();

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        if(this.category) {
          this.category = this.category.toLowerCase();
        }

        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category.toLowerCase() === this.category) :
        this.products;
        console.log("filter",this.category, this.products, this.filteredProducts);
      })
    }
}
