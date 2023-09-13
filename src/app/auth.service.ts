import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { getRedirectResult } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
