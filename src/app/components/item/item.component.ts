import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() set item(res: Product) {
    this.itemInfo = res;
  }

  itemInfo: Product = {} as Product;
}
