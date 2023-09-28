import { Injectable, inject } from '@angular/core';
import { Database, getDatabase, listVal, objectVal, push, query, ref, remove, set } from '@angular/fire/database';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AppProduct } from './models/app-product';
import { getStorage } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private database: Database = inject(Database);
  private db = getDatabase();
  private storage: Storage = inject(Storage);
  private store = getStorage();

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

//   uploadImage(image: HTMLInputElement) {
//     if (!image.files) return
//     const file: File = image.files[0];
//     console.log("uploadImage", image.files);
//     const stoRef = ref(this.store, file.name);
    
    
//     if (file) {
//       uploadBytes(storageRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//       });
//     }
// }
}
