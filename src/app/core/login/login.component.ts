import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth-guard/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.authState$.subscribe((user: User | null) => {
      if(user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl!);
      }
    });
  }

  async login(){
    this.auth.login();
  }
}
