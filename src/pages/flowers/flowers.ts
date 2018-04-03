import { Component } from '@angular/core';
import { NavController, LoadingController ,  AlertController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { ProductInfoPage } from '../product-info/product-info'
import { SignInPage } from '../sign-in/sign-in'
import { ShoppingCartPage } from '../shopping-cart/shopping-cart'

@Component({
  selector: 'page-flowers',
  templateUrl: 'flowers.html'
})
export class FlowersPage {
  public productsList =[];
  badgeValue ;

  constructor(public navCtrl: NavController,public genrator : GenratorProvider , public loadingCtrl: LoadingController,private translate: TranslateService , public alertCtrl : AlertController) {

    this.getProducts();
  }

  ionViewDidEnter() {
   
    this.setCartCount();
      
    }

  getProducts(){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getProductsById(1).subscribe((data) => {
      this.productsList=data['products'];
      this.setCartCount();
      loader.dismiss();
    },(err)=>{
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      loader.dismiss();

    });
  }


  
  goProductInfo(id,name){
    this.navCtrl.push( ProductInfoPage, {
      productId: id,
      prouductName: name
    });
  }


  setCartCount(){
    if(localStorage.getItem("cartCount")=="0"){
      this.badgeValue=null;
    }else{
      this.badgeValue=localStorage.getItem("cartCount");
    }
  }

  goShoppingCartPage() {
    if (localStorage.getItem("customerid") === null) {
      this.navCtrl.push(SignInPage);
    } else if (localStorage.getItem('cartCount')=='0') {

      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('cartempty'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();

    }else
      this.navCtrl.push(ShoppingCartPage);
    }
  

}
