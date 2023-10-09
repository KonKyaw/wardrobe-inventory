import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getDatabase, provideDatabase } from '@angular/fire/database';
// import { getStorage, provideStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './admin/admin-products/dashboard/dashboard.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth-guard/auth.service';
import { authGuard } from './auth-guard/auth-guard';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { BrandService } from './brand.service';
import { CategoryService } from './category.service';
import { SizeService } from './size.service';
import { adminAuthGuard } from './auth-guard/admin-auth-guard';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

// import { UploadImageService } from './upload-image.service';
// import { DeleteImageService } from './delete-image.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    DashboardComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    // provideStorage(() => getStorage()),
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
      { path: 'login', component: LoginComponent},
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [authGuard, adminAuthGuard]},
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [authGuard, adminAuthGuard]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [authGuard, adminAuthGuard]},
      { path: 'admin/dashboard', component: DashboardComponent, canActivate: [authGuard]}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    BrandService,
    CategoryService,
    SizeService,
    DatePipe,
    // DeleteImageService,
    // UploadImageService,
    UserService,
    ProductService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
