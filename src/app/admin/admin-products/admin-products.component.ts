import { Component } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  product$: any;

  constructor( private productService: ProductService ) {
    this.product$ = this.productService.getAll()
  }

  filter(query: string) {
    console.log("filter", query);
    
  }
}
