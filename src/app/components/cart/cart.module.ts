import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/shared/services/shared.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedModule],
})
export class CartModule {}
