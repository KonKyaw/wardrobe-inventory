import { Component, OnDestroy, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  public user?: User | null
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        this.user = aUser;
      console.log(aUser);
    })
  }

  logout(){
    this.auth.signOut();
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }
}