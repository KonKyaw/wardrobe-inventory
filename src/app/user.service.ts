import { Injectable, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { getDatabase, ref, set, Database, object, objectVal } from '@angular/fire/database';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public database: Database = inject(Database);
  public db = getDatabase();
  public dbRef = ref(this.db);

  constructor() { }

  save(user: User) {
    console.log("save()", this.db);
    set(ref(this.db, 'users/' + user.uid + '/name'), user.displayName);
    set(ref(this.db, 'users/' + user.uid + '/email'), user.email);
    // set(ref(this.db, 'users/' + user.uid), {
    //   name: user.displayName,
    //   email: user.email,
    // });
  }
  get(uid: string): Observable<AppUser> {
    object(ref(this.database, 'users/' + uid)).subscribe(data => 
      console.log("get(uid)", data)
      )
    return objectVal(ref(this.database, 'users/' + uid));
  }
}
