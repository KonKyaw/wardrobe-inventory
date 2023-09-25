import { Injectable, inject } from '@angular/core';
import { Database, getDatabase, list, listVal, object, objectVal, push, query, ref, remove, set, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppProduct } from './models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public database: Database = inject(Database);
  public db = getDatabase();

  constructor() { }

  create(product: AppProduct) {
    const productRef = ref(this.db, 'products/');
    console.log("create()", product)
    push(productRef, product);
    // set(push(productRef), { product });
  }

  update(product: AppProduct, productId: string) {
    const refId = ref(this.database, 'products/' + productId)
    return set(refId, product)
  }

  delete(productId: string) {
    const refId = ref(this.database, 'products/' + productId)
    return remove(refId)

  }

  getAll() {
    const quRef = query(ref(this.database, 'products')) // , orderByChild('name'));

    listVal(quRef, {keyField: "key"}).subscribe(data => 
      console.log("getAll.product.service", data)
      )
    return listVal(quRef, {keyField: "key"});
  }

  get(productId: string | null): Observable<AppProduct> {
    const refId = ref(this.database, 'products/' + productId)
    
    return objectVal(refId, {keyField: "key"})
  }
}
