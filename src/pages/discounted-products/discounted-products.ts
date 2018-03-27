import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config , LoadingController , AlertController} from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { TranslateService } from '@ngx-translate/core';
import { ProductInfoPage } from '../product-info/product-info'

@IonicPage()
@Component({
  selector: 'page-discounted-products',
  templateUrl: 'discounted-products.html',
})
export class DiscountedProductsPage {

  public discountedProducts=[];
  public categoriesList = [];
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams , config :Config,
    public genrator : GenratorProvider,
    public loader : LoadingController ,
    public translate : TranslateService,
    public alertCtrl : AlertController  ) {

      this.getDiscountedProducts();
      this.getCategories();

      config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
  }

 




  getDiscountedProducts(){
    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    this.genrator.getAlldisounted().subscribe((data)=>{

      loader.dismiss();
      this.discountedProducts=data['products'];

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


  getCategories() {
    return this.genrator.getCategories().subscribe((data) => {
      this.categoriesList = data['categories'];
    });
  }

  getDiscountedById(id){
    this.genrator.getdiscountedById(id).subscribe((data)=>{
      this.discountedProducts=data['products'];
    })
  }


  goProductInfo(id,name){
    this.navCtrl.push( ProductInfoPage, {
      productId: id,
      prouductName: name
    });
  }

}
