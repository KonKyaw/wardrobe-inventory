import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from 'shared/services/auth-guard/admin-auth-guard';
import { authGuard } from 'shared/services/auth-guard/auth-guard';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const adminRoutes: Routes = [
  {
    path: 'admin/products/:id',
    title: 'Edit product',
    component: ProductFormComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin/products/new',
    title: 'Create new product',
    component: ProductFormComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin/products',
    title: 'Dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
  {
    path: 'admin',
    title: 'Dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
