// import { Injectable } from '@angular/core';
// import { deleteObject, getStorage, ref } from '@angular/fire/storage';
// import { AppProduct } from './models/app-product';

// @Injectable({
//   providedIn: 'root'
// })
// export class DeleteImageService {
//   private storage = getStorage();

//   constructor() { }

//   async deleteImage(product: AppProduct): Promise<any> {
//     const Ref = ref(this.storage, product.imageUrl);

//     deleteObject(Ref).then(() => {
//       // File deleted successfully
//     }).catch((error) => {
//       // Uh-oh, an error occurred!
//     });
//   }
// }
