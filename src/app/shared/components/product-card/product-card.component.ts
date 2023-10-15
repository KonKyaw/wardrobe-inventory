import { Component, Input } from '@angular/core';
import { AppProduct } from 'shared/models/app-product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: any | AppProduct = {"title": '', "price": 0, "category": '', "imageUrl": ''};
  @Input('showActions') showActions = true;
  @Input('inputBrand') inputBrand: string | null = '';
}
