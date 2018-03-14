import { Component } from '@angular/core';
import { NavController , LoadingController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { ProductInfoPage } from '../product-info/product-info'
import { SignInPage } from '../sign-in/sign-in'
import { ShoppingCartPage } from '../shopping-cart/shopping-cart'

@Component({
  selector: 'page-gifts',
  templateUrl: 'gifts.html'
})
export class GiftsPage {

  public productsList =[];
  badgeValue ;


  constructor(public navCtrl: NavController,public genrator : GenratorProvider,public loadingCtrl: LoadingController,private translate: TranslateService) {
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
    return this.genrator.getProductsById(2).subscribe((data) => {
      this.productsList=data['products'];
      this.setCartCount();
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
    if (localStorage.getItem("customerid") === "") {
      this.navCtrl.push(SignInPage);
    } else {
      this.navCtrl.push(ShoppingCartPage);
    }
  }

}
