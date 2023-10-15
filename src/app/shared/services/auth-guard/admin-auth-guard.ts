import { inject } from "@angular/core";
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from "@angular/router";
import { filter, map, of, switchMap } from "rxjs";
import { UserService } from "shared/services/user.service";

export const adminAuthGuard = (state: RouterStateSnapshot) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const userService = inject(UserService);

    return auth.authState$.pipe(
      filter((user) => user !== undefined),
      switchMap((user) => {
        if(user) {
          return userService.get(user.uid);
        } else {
          return of(null);
        }
      }),
      map((appUser) => {
        if (!appUser?.isAdmin) {
          router.navigate(['/'], { queryParams: { returnUrl: state.url }});
          console.warn("User is not an Admin!");
          return false;
        }
        return appUser?.isAdmin;
        }
      )
    )
  };