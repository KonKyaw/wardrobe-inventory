import { OnDestroy, inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect, User, authState } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { getRedirectResult } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private auth: Auth = inject(Auth);
  
  public user?: User | null
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        this.user = aUser;
      console.log(aUser);
    })
  }

  async login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const provider = new GoogleAuthProvider();

    await signInWithRedirect(this.auth, provider);
    
    // After returning from the redirect when your app initializes you can obtain the result
    const result = await getRedirectResult(this.auth);
    if (result) {
      // This is the signed-in user
      const user = result.user;
      // This gives you a Facebook Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    }
    // As this API can be used for sign-in, linking and reauthentication,
    // check the operationType to determine what triggered this redirect
    // operation.
    const operationType = result?.operationType;
  }

  logout(){
    this.auth.signOut();
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }
}
