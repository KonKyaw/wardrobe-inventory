import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent],
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [NavbarComponent],
})
export class CoreModule {}
