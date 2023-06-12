import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from 'src/app/components/item/item.component';
import { ProductComponent } from 'src/app/components/product/product.component';

@NgModule({
  declarations: [ProductComponent, ItemComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProductComponent, ItemComponent],
})
export class SharedModule {}
