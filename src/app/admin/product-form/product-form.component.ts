import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs';
import { AppProduct } from 'src/app/models/app-product';
import { UploadImageService } from 'src/app/upload-image.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any> = new Observable;
  editProduct$: Observable<any> = new Observable;
  private idProduct: string | null = '';
  public isEdit: boolean = false;
  public downloadUrl: any = null;
  // public product: AppProduct = {"title": ' ', "price": 0, "category": '', "imageUrl": ''};

  // private urlPattern = /^(https?|http?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/;
  
  productForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    price: new FormControl<number>(0, [
      // Validators.required,
      Validators.min(0)
    ]),
    category: new FormControl<string>('', [
      Validators.required
    ]),
    imageUrl: new FormControl<string>('', [
        // Validators.pattern(this.urlPattern)
    ])
  });

//   this.imageUrl.valueChanges.subscribe(checked => {
//     if (checked) {
//       this.optionBExtra.setValidators([Validators.required, Validators.minLength(5)]);
//     } else {
//       this.optionBExtra.setValidators(null);
//     }
//     this.optionBExtra.updateValueAndValidity();
//   });
// }
    
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private uploadImageService: UploadImageService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.categories$ = this.categoryService.getAll();
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.editProduct$ = productService.get(this.idProduct);
    if (this.idProduct) {
      this.isEdit = true;
      this.editProduct$.subscribe(product => {
        // this.product = product;
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

  async onUpload(imageInput: any) {
    this.downloadUrl =  this.uploadImageService.uploadImage(imageInput)

      if(this.downloadUrl) {
        this.downloadUrl.then((link: any) => {
          this.downloadUrl = link;
          this.productForm.patchValue({
            imageUrl: link})
          console.log("UrlResult", link)
        })
      }
    // console.log("result", this.downloadUrl)
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?') && this.idProduct) {
      console.log("delete:idProduct", this.idProduct);
      this.productService.delete(this.idProduct);
      this.router.navigate(['/admin/products']);
    }
  }
}
