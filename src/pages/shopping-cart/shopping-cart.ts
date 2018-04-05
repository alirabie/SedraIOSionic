import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'



@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  cartItemsList = [];
  approverules : boolean =false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    config: Config,
    public genrator: GenratorProvider,
    public loader: LoadingController,
    public alertCtrl: AlertController) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.getCartItems();

    console.log(this.approverules);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }



  getCartItems() {
    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    this.genrator.getShoppingCartItems(localStorage.getItem("customerid")).subscribe((data) => {
      this.cartItemsList = data['shopping_carts'];
      loader.dismiss();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      loader.dismiss();

    });
  }


  delItem(id) {
    this.genrator.deleteFromShoppingCart(id).subscribe((data) => {
      this.getCartItems();
      this.getShoppingCartCount(localStorage.getItem("customerid"));
    });
  }


  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId).subscribe((data) => {
      let items = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length + "");
    });
  }



  rulesAccepted(e:any){
    this.approverules=e.checked;
    console.log(this.approverules);
  }


  placeorder() {

   

    if (this.cartItemsList.length == 0) {
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: "Cart Empty",
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();

    } else {

      let cartItems = [];
      for (let i = 0; i < this.cartItemsList.length; i++) {
        let obj = this.cartItemsList[i];
        let item = {
          product_id: obj.product.id,
          quantity: obj.quantity,
          shopping_cart_item_id : obj.id
        }
        cartItems.push(item)
      }
      let custdata = JSON.parse(localStorage.getItem('customerdata'));
      let order = {
        order:
          {
            billing_address: {
              address1: custdata.billing_address.address1,
              city: custdata.billing_address.city,
              country: custdata.billing_address.country,
              country_id: custdata.billing_address.country_id,
              created_on_utc: custdata.billing_address.created_on_utc,
              email: custdata.billing_address.email,
              first_name: custdata.billing_address.first_name,
              id: custdata.billing_address.id,
              last_name: custdata.billing_address.last_name,
              phone_number: custdata.billing_address.phone_number,
              province: custdata.billing_address.province,
              state_province_id: custdata.billing_address.state_province_id,
              zip_postal_code: custdata.billing_address.zip_postal_code
            },
            customer_id: localStorage.getItem('customerid'),
            order_items: cartItems,
            payment_method_system_name: "Payments.Manual"
          }
      }

     

      if(this.approverules){
        console.log(order);
        let loader = this.loader.create({
          content: this.translate.instant('LOADING'),
        });
        loader.present();
      this.genrator.createOrder(order).then((data)=>{
        loader.dismiss();
        if(data['orders']!=null){
          localStorage.setItem('cartCount',"0");
          this.navCtrl.popToRoot();
          console.log(data);
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: this.translate.instant('ordercreated'),
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();

        }
        
      },(err)=>{

        loader.dismiss();
        console.log(err);
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: err,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
      
      alert.present();
      });

    }else{

 let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle:this.translate.instant('accetptplease') ,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
      
      alert.present();

    }
  }
  }
}
