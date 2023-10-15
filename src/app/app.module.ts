import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
// import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './core/login/login.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
// import { UploadImageService } from './upload-image.service';
// import { DeleteImageService } from './delete-image.service';

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductFilterComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AdminModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    NgbModule,
    RouterModule.forRoot([
      
      { path: 'products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: '', component: ProductsComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
