import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'



@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {



  id :String ="";
  name :string ="";
  productInfo = [];
  attr=[];
 


  constructor(public navCtrl: NavController, public navParams: NavParams ,public genrator:GenratorProvider) {
   this.id = this.navParams.get("productId");
   this.name = this.navParams.get("prouductName");
   this.getProductInf();

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }


  getProductInf(){
    this.genrator.getProudctInfo(this.id).subscribe((data) => {
      this.productInfo=data['products'];
  });
  }


}
