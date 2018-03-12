import { Component } from '@angular/core';
import { NavController , LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { ProductInfoPage } from '../product-info/product-info'

@Component({
  selector: 'page-cookes',
  templateUrl: 'cookes.html'
})
export class CookesPage {

  public productsList =[];
 
  constructor(public navCtrl: NavController, public statusBar: StatusBar,public genrator : GenratorProvider,public loadingCtrl: LoadingController,private translate: TranslateService) {


    this.getProducts();
  

  }

  getProducts(){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getProductsById(3).subscribe((data) => {
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