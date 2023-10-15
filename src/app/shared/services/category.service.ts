import { Injectable, inject } from '@angular/core';
import { Database, query, ref, orderByChild, listVal } from '@angular/fire/database';

@Injectable()
export class CategoryService {
  private database: Database = inject(Database);
  
  constructor() {}

  getAll(): any{
    const quRef = query(ref(this.database, 'categories'), orderByChild('name'));
    return listVal(quRef,{keyField: "key"});
  }
}
