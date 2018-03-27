import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config , LoadingController , AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'



@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  cartItemsList = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
     private translate: TranslateService,
     config :Config,
     public genrator : GenratorProvider,
     public loader : LoadingController ,
     public alertCtrl : AlertController) {

      config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
      this.getCartItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }



  getCartItems(){
    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    this.genrator.getShoppingCartItems(localStorage.getItem("customerid")).subscribe((data)=>{
      this.cartItemsList=data['shopping_carts'];
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


  delItem(id){
    this.genrator.deleteFromShoppingCart(id).subscribe((data)=>{
      this.getCartItems();
      this.getShoppingCartCount(localStorage.getItem("customerid"));
    });
  }


  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId).subscribe((data) => {
      let items  = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length + "");
    });
  }

}
