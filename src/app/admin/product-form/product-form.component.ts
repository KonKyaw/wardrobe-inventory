import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'shared/services/brand.service';
import { CategoryService } from 'shared/services/category.service';
import { SizeService } from 'shared/services/size.service';
import { ProductService } from 'shared/services/product.service';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth-guard/auth.service';
import { User } from '@angular/fire/auth';
// import { UploadImageService } from 'src/app/upload-image.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  brands$: Observable<any> = new Observable();
  categories$: Observable<any> = new Observable();
  sizes$: Observable<any> = new Observable();
  editProduct$: Observable<any> = new Observable();
  private idProduct: string | null = '';
  public isEdit: boolean = false;
  public downloadUrl: any = null;
  private user: any;
  imgFile: any;
  // private urlPattern = /^(https?|http?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/;

  productForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40),
    ]),
    brand: new FormControl<string>('', []),
    size: new FormControl<string>('', []),
    price: new FormControl<number>(0, [
      // Validators.required,
      Validators.min(0),
    ]),
    category: new FormControl<string>('', [Validators.required]),
    imageUrl: new FormControl<string>('', [
      // Validators.pattern(this.urlPattern)
    ]),
    note: new FormControl<string>('', []),
  });

  inputBrand = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(15),
  ]);
  inputSize = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(5),
  ]);
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
    private auth: AuthService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private sizeService: SizeService,
    // private uploadImageService: UploadImageService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.brands$ = this.brandService.getAll();
    this.categories$ = this.categoryService.getAll();
    this.sizes$ = this.sizeService.getAll();
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.editProduct$ = productService.get(this.idProduct);
    this.isEdit = false;
    if (this.idProduct && this.idProduct != 'new') {
      this.isEdit = true;
      this.editProduct$.subscribe((product) => {
        this.productForm.setValue({
          title: product.title,
          price: product.price || 0,
          category: product.category || '',
          imageUrl: product.imageUrl || '',
          brand: product.brand || '',
          size: product.size || '',
          note: product.note || '',
        });
        if (!(product.size in this.sizes$)) {
          this.inputSize.setValue(product.size);
          this.productForm.patchValue({
            size: "Others"
          })
        } 
      });
    }

    auth.authState$.subscribe((user: User | null) => {
      if (user) {
        this.user = user.displayName;
      }
    });
  }

  //needed for ngIf etc..
  get title() {
    return this.productForm.get('title');
  }
  get brand() {
    return this.productForm.get('brand');
  }
  get size() {
    return this.productForm.get('size');
  }
  get price() {
    return this.productForm.get('price');
  }
  get category() {
    return this.productForm.get('category');
  }
  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  onSubmit(product: any) {
    const currDateTime = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    );
    
    if (this.brand && this.brand.value == 'Add new brand' && this.inputBrand.value) {
      product.brand = this.inputBrand.value;
      this.brandService.create(this.inputBrand.value);
    }
    if (this.size && this.size.value == 'Others' && this.inputSize.value) {
      product.size = this.inputSize.value;
    }
    if (this.idProduct && this.idProduct != 'new') {
      product.updatedDate = currDateTime;
      product.updatedUser = this.user;
      this.editProduct$.subscribe((Data) => {
        product.createdDate = Data.createdDate;
        product.createdUser = Data.createdUser;
        this.productService.update(product, this.idProduct!);
        this.router.navigate(['/admin/products']);
      });
    } else {
      product.createdDate = product.updatedDate = currDateTime;
      product.createdUser = product.updatedUser = this.user;
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
  }

  // async onUpload(imageInput: any) {
  //   this.downloadUrl =  this.uploadImageService.uploadImage(imageInput)

  //     if(this.downloadUrl) {
  //       this.downloadUrl.then((link: any) => {
  //         this.downloadUrl = link;
  //         this.productForm.patchValue({
  //           imageUrl: link})
  //         console.log("UrlResult", link)
  //       })
  //     }
  // }

  onImageChange(e: any) {
    const reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      const imgfile = e.target.files[0];
      reader.readAsDataURL(imgfile);
      reader.onload = async () => {
        await this.resizeImage(reader.result as string).then((resolve: any) => {
          this.imgFile = resolve;
          this.downloadUrl = true;
          this.productForm.patchValue({
            imageUrl: resolve,
          });
        });
      };
    }
  }

  resizeImage(imageURL: any): Promise<any> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        if (ctx != null) {
          ctx.drawImage(image, 0, 0, 300, 400);
        }
        var data = canvas.toDataURL('image/jpeg', 1);
        resolve(data);
      };
      image.src = imageURL;
    });
  }

  delete() {
    if (
      confirm('Are you sure you want to delete this product?') &&
      this.idProduct
    ) {
      this.productService.delete(this.idProduct);
      this.router.navigate(['/admin/products']);
    }
  }

  // onInputCategory(e: any) {
  //   this.category?.setValue(e.target.value);
  // }
}
