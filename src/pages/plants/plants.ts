import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-plants',
  templateUrl: 'plants.html',
})
export class PlantsPage {
  public productsList =[];
 
  
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public genrator : GenratorProvider,public loadingCtrl: LoadingController,private translate: TranslateService) {
   
   
    
    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantsPage');
  }
  getProducts(){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getProductsById(10).subscribe((data) => {
      this.productsList=data['products'];
      loader.dismiss();
    });
  }
}
