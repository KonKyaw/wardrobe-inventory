import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { authGuard } from 'shared/services/auth-guard/auth-guard';
import { adminAuthGuard } from 'shared/services/auth-guard/admin-auth-guard';

@NgModule({
  declarations: [AdminDashboardComponent, ProductFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [authGuard, adminAuthGuard],
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [authGuard, adminAuthGuard],
      },
      {
        path: 'admin/products',
        component: AdminDashboardComponent,
        canActivate: [authGuard, adminAuthGuard],
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [authGuard, adminAuthGuard],
        pathMatch: 'full',
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class AdminModule {}
