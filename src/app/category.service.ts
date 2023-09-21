import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Database, query, ref, orderByChild, listVal } from '@angular/fire/database';

@Injectable()
export class CategoryService {
  private database: Database = inject(Database);
  
  constructor( private db: AngularFireDatabase ) {
  }

  getCategories(): any{
    const quRef = query(ref(this.database, 'categories'), orderByChild('name'));

    listVal(quRef).subscribe(data => 
      console.log("category.service", data)
      )
    return listVal(quRef);
    
  }

}
