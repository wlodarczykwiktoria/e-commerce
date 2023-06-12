import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/services/shared.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class ProductsModule {}
