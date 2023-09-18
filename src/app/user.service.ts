import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '@angular/fire/auth';
import { getDatabase, ref, child, get, set, Database, object } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public database: Database = inject(Database);
  public db = getDatabase();
  public dbRef = ref(this.db);

  constructor() { }

  save(user: User) {
    // const db = getDatabase();
    console.log(this.db);
    set(ref(this.db, 'users/' + user.uid), {
      name: user.displayName,
      email: user.email
    });
  }

  // get(uid: string) {
  //   return get(child(this.dbRef, `users/${uid}`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }
}
