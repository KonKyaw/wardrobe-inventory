import { Injectable, inject } from '@angular/core';
import { Database, query, ref, listVal, orderByChild } from '@angular/fire/database';

@Injectable()
export class SizeService {
  private database: Database = inject(Database);

  constructor() { }

  getAll(): any{
    const quRef = query(ref(this.database, 'sizes'), orderByChild('id'));  // , 
    return listVal(quRef,{keyField: "key"});
  }
}
