import { inject } from "@angular/core";
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from "@angular/router";
import { filter, map } from "rxjs";

export const authGuard = (state: RouterStateSnapshot) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    // const state : RouterStateSnapshot;
  
    return auth.authState$.pipe(
      filter((currentUser) => currentUser !== undefined),
      map((currentUser) => {
        if (!currentUser) {
          router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        return true;
      })
    );
  };