import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { ProductInfoPage } from '../product-info/product-info'

@Component({
  selector: 'page-flowers',
  templateUrl: 'flowers.html'
})
export class FlowersPage {
  public productsList =[];

  constructor(public navCtrl: NavController,public genrator : GenratorProvider , public loadingCtrl: LoadingController,private translate: TranslateService) {

    this.getProducts();
  }


  getProducts(){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getProductsById(1).subscribe((data) => {
      this.productsList=data['products'];
      loader.dismiss();
    });
  }


  
  goProductInfo(id,name){
    this.navCtrl.push( ProductInfoPage, {
      productId: id,
      prouductName: name
    });
  }




}
