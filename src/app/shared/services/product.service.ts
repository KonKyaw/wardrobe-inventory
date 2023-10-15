import { Injectable, inject } from '@angular/core';
import { Database, getDatabase, listVal, objectVal, push, query, ref, remove, set } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppProduct } from 'shared/models/app-product';
// import { DeleteImageService } from './delete-image.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private database: Database = inject(Database);
  private db = getDatabase();
  public promiseReturn: any = null;
  
  constructor() { }

  create(product: AppProduct) {
    const productRef = ref(this.db, 'products/');
    console.log("create()", product)
    push(productRef, product); // can return then able reference to get key and reference.
    // set(push(productRef), { product });
  }

  update(product: AppProduct, productId: string) {
    const refId = ref(this.database, 'products/' + productId)
    return set(refId, product)
  }

  delete(productId: string) {
    const refId = ref(this.database, 'products/' + productId);

    // objectVal(refId).subscribe(data => {
    //   if(data) {
    //     console.log("delete()", data);
    //     let product:any = data;
    //     this.promiseReturn = this.deleteImageService.deleteImage(product);
    //   }
    // })

    return remove(refId)
  }

  getAll() {
    const quRef = query(ref(this.database, 'products')) // , orderByChild('name'));

    return listVal(quRef, {keyField: "key"});
  }

  get(productId: string | null): Observable<AppProduct> {
    const refId = ref(this.database, 'products/' + productId)
    
    return objectVal(refId, {keyField: "key"})
  }
}
