import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config , LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { ProductInfoPage } from '../product-info/product-info'
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoritesList =[] ;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private translate: TranslateService,
     config :Config,
     public genrator : GenratorProvider,
     public loader : LoadingController) {

      this.getFavorites();

      config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }



  getFavorites(){
    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();

    this.genrator.getCustomerWishlist(localStorage.getItem("customerid")).subscribe((data)=>{
      this.favoritesList=data.Items;
      loader.dismiss();
    })

  }



  //delete from wish list
  delete(id){
    this.genrator.removeFromWishlist(id,localStorage.getItem("customerid")).subscribe((data)=>{
      this.getFavorites();
    })
  }


  //view product 
  goPInfo(id,name){
    this.navCtrl.push( ProductInfoPage, {
      productId: id,
      prouductName: name
    }); 
  }

}
