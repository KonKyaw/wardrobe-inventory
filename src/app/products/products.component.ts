import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../shared/models/app-product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Array<AppProduct> = [];
  filteredProducts: any[] = []; //cannot use interface cos doesn't have key
  // products$: Observable<any> = new Observable
  productsService: any;
  category: string | null = '';

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {
      productService.getAll().subscribe((products: Array<any>) => {
        this.products = products;
        // this.products$ = productService.getAll();

        //needs refactoring with switchMap
        //Dealing with Multiple Asynchronous Operations
        route.queryParamMap.subscribe(params => {  
          this.category = params.get('category');
  
          if(this.category) {
            this.category = this.category.toLowerCase();
          }
  
          this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category.toLowerCase() === this.category) :
          this.products;
        });
      });
    }
  }
