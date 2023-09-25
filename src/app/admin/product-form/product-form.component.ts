import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { AppProduct } from 'src/app/models/app-product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = new Observable;
  editProduct$: Observable<any> = new Observable;
  private idProduct: string | null = '';

  private urlPattern = /^(https?|http?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/;
  
  productForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    price: new FormControl<number | string>('', [
      // Validators.required,
      Validators.min(0)
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    imageUrl: new FormControl('', [
      Validators.pattern(this.urlPattern)
    ])
  });
    
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.categories$ = this.categoryService.getCategories();
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.editProduct$ = productService.get(this.idProduct);
    if (this.idProduct) {
      this.editProduct$.subscribe(product => {
      this.productForm.setValue({
        title: product.title,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl})
      })
    }
  }

  get title() { return this.productForm.get('title');}
  get price() { return this.productForm.get('price');}
  get category() { return this.productForm.get('category');}
  get imageUrl() { return this.productForm.get('imageUrl');}

  // save (product: any) {
  //   console.log(product);
  //   this.productService.create(product);
  // }

  onSubmit(product: any) {
    if(this.idProduct) {
      console.log("onSubmit:idProduct", product);
      this.productService.update(product, this.idProduct);
      this.router.navigate(['/admin/products']);
    } else{
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
    // TODO: Use EventEmitter with form value
    // console.warn(this.productForm.value);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?') && this.idProduct) {
      console.log("delete:idProduct", this.idProduct);
      this.productService.delete(this.idProduct);
      this.router.navigate(['/admin/products']);
    }
  }
}
