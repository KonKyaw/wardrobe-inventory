import { Injectable, inject } from '@angular/core';
import { Database, getDatabase, push, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public database: Database = inject(Database);
  public db = getDatabase();
  public dbRef = ref(this.db);

  constructor() { }

  create(product: any) {
    const productRef = ref(this.db, 'products/');
    set(push(productRef), {
      product
    });
  }
}
