import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Config } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { SignInPage } from '../sign-in/sign-in'
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {
  count = 1;
  id: String = "";
  name: string = "";
  productInfo = [];
  relatedProducts = [];
  min ="" ;
  max ="" ;

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
       //Get Max and min Preparing product
       let obj = this.productInfo['0'];
       let attr = obj['attributes'];
       let max = attr['0'];
       let min =attr['1'];
       this.min=min.default_value;
       this.max=max.default_value;
    });
  }

  toggleIcon(getIcon: string) {

    if (localStorage.getItem('customerid') === null) {

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
    this.SocialSharing.share("http://sedragift.com/" + st).then(() => {
      console.log("shareSheetShare: Success");
    }).catch((err) => {
      console.error("shareSheetShare: failed");
    });
  }


  up() {
    this.count++;
  }

  dwon() {
    if (this.count <= 1) {
      return;
    } else {
      this.count--;
    }
  }


  addToCart() {


    if (localStorage.getItem("customerid") === null) {

      this.navCtrl.push(SignInPage);
    } else {

      let cartItem = {
        shopping_cart_item: {
          id: "null",
          customer_entered_price: "0",
          quantity: "0",
          created_on_utc: "2017-06-13T16:15:47-04:00",
          updated_on_utc: "2017-06-13T16:15:47-04:00",
          shopping_cart_type: "1",
          product_id: '0',
          customer_id: '0'
        }
      }
      cartItem.shopping_cart_item.quantity = this.count + "";
      cartItem.shopping_cart_item.product_id = this.id + "";
      cartItem.shopping_cart_item.customer_id = localStorage.getItem("customerid");

      this.genrator.addToShoppingCart(cartItem).then((result) => {

        if (result['shopping_carts'] != null) {

          this.getShoppingCartCount(localStorage.getItem("customerid"));

        

          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: this.translate.instant('ADEDD'),
            buttons: [
              {
                text: this.translate.instant('CONTINE'),
                handler: () => {
                  //ٌResume Shopping
                  this.navCtrl.popTo(TabsPage);

                  console.log(localStorage.getItem("cartCount"))
                }
              },
              {
                text: this.translate.instant('END'),
                handler: () => {

                  //Go to shopping cart
                  this.navCtrl.push(ShoppingCartPage);
                }
              }
            ]
          });
          alert.present();

          console.log(result);
        }

      }, (err) => {

        console.log(err);

      });
    }
  }



  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId).subscribe((data) => {
      let items  = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length + "");
    });
  }





}
