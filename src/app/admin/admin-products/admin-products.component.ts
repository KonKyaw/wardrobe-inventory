import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppProduct } from 'src/app/models/app-product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  // product$: any = new Observable;
  products: Array<AppProduct> = [];
  filteredProducts: any[] = []; //cannot use interface cos doesn't have key
  subscription: Subscription = new Subscription;

  displayedColumns = ["title", "price", "category", "edit"];
  // Since the table optimizes for performance, it will not automatically check for changes to the data array.
  // Instead, when objects are added, removed, or moved on the data array, you can trigger an update to the table's rendered rows by calling its renderRows() method.

  constructor( private productService: ProductService ) {
    // this.product$ = this.productService.getAll()
    this.subscription = this.productService.getAll().subscribe((products: Array<any>) =>
       this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    console.log("filter", query, this.filteredProducts);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
