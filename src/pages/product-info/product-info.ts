import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Config } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { SignInPage } from '../sign-in/sign-in'
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {

  count = 1 ;


  id: String = "";
  name: string = "";
  productInfo = [];
  relatedProducts = [];

  buttonIcon: string = "heart";




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    config: Config,
    public SocialSharing: SocialSharing) {


    this.id = this.navParams.get("productId");
    this.name = this.navParams.get("prouductName");
    this.getProductInf();
    this.getRelatedProducts();
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }


  getProductInf() {
    this.genrator.getProudctInfo(this.id).subscribe((data) => {
      this.productInfo = data['products'];
    });
  }

  toggleIcon(getIcon: string) {

    if (localStorage.getItem('customerid') === "") {

      this.navCtrl.push(SignInPage);

    } else {
      if (this.buttonIcon === 'heart') {
        this.buttonIcon = "star";
        this.genrator.addToWishlist(this.id, localStorage.getItem("customerid")).subscribe((data) => {
          if (data.Items != null) {
            let alert = this.alertCtrl.create({
              title: this.translate.instant('PAGE_TITLE.dilog'),
              subTitle: this.translate.instant('FAVADD'),
              buttons: [this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();

          }
        });
      }
    }
  }


  getRelatedProducts() {
    this.genrator.getRelatedProducts(this.id).subscribe((data) => {
      this.relatedProducts = data['products'];
    });
  }




  goRelatedProduct(id, name) {
    this.navCtrl.push(ProductInfoPage, {
      productId: id,
      prouductName: name
    });
  }

  share() {


    let st: string = encodeURIComponent(this.name.replace(' ', '-'))
    this.SocialSharing.share("http://sedragift.com/"+st).then(() => {
      console.log("shareSheetShare: Success");
    }).catch((err) => {
      console.error("shareSheetShare: failed");
    });
  }


  up(){
    this.count++;
  }

  dwon(){
    if(this.count<=1){
      return;
    }else{
      this.count--;
    }
  }



}
