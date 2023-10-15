import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthService } from './services/auth-guard/auth.service';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { SizeService } from './services/size.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, ProductCardComponent],
  providers: [
    AuthService,
    BrandService,
    CategoryService,
    DatePipe,
    ProductService,
    SizeService,
    // DeleteImageService,
    // UploadImageService,
    UserService,
  ],
})
export class SharedModule {}
