import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { getRedirectResult } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  constructor(){

  }

  async login(){
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
}
