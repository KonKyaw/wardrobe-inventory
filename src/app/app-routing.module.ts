import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  // { path: 'products', component: ProductsComponent },
  { path: '', component: ProductsComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    // canMatch: [authGuard, adminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
