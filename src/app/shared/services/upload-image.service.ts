// import { Injectable } from '@angular/core';
// import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

// @Injectable({
//   providedIn: 'root'
// })
// export class UploadImageService {
//   private store = getStorage();
  
//   constructor() { }
  
//   async uploadImage(image: HTMLInputElement): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       if (!image.files) {
//         reject("No image files found");
//         return;
//       }

//       const file: File = image.files[0];
//       console.log("uploadImage", image.files);
//       const storageRef = ref(this.store, 'products/images/' + file.name); //keyname?
    
//       if (file) {
//         uploadBytes(storageRef, file).then((snapshot) => {
//           console.log('Uploaded a blob or file!');
//           getDownloadURL(snapshot.ref)
//           .then(link => {
//             console.log("uploadBytes", link);
//             resolve(link);
//           })
//           .catch(error => {
//             reject(error); // Reject the promise in case of an error
//           });
//         })
//         .catch(error => {
//           reject(error); // Reject the promise in case of an error during upload
//         });
//       } else {
//         reject("No file selected");
//       }
//    })
//   }
// }
