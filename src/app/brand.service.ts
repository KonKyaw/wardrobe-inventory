import { Injectable, inject } from '@angular/core';
import { Database, query, ref, listVal, push, getDatabase, orderByValue } from '@angular/fire/database';

@Injectable()
export class BrandService {
  private database: Database = inject(Database);
  private db = getDatabase();
  
  constructor() {}

  getAll(): any{
    const quRef = query(ref(this.database, 'brands'), orderByValue());  // , orderByChild('name')
    return listVal(quRef,{keyField: "key"});
  }

  create(brand: string) {
    const brandRef = ref(this.db, 'brands/');
    console.log("create()", brand)
    push(brandRef, brand); // can return then able reference to get key and reference.
  }
}
