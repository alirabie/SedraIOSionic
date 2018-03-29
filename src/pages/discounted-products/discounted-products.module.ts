import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountedProductsPage } from './discounted-products';

@NgModule({
  declarations: [
    // DiscountedProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountedProductsPage),
  ],
})
export class DiscountedProductsPageModule {}
