import { inject } from "@angular/core";
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from "@angular/router";
import { filter, map } from "rxjs";
import { UserService } from "./user.service";

export const authGuard = (state: RouterStateSnapshot) => {
    // const auth = inject(AuthService);
    // const router = inject(Router);
    // const userService = inject(UserService);
    // // const state : RouterStateSnapshot;
  
    // return auth.authState$.pipe(
    //     map((user) => this.userService {
    //     if (!currentUser) {
    //       router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //       return false;
    //     }
    //     return true;
    //   })
    // );
  };