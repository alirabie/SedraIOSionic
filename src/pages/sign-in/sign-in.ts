import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ViewController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TabsPage } from '../tabs/tabs'
import { AlertController, Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SignUpPage } from '../sign-up/sign-up';
import { IntroScreenPage } from '../intro-screen/intro-screen';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  loginData = { Email: '', Password: '' };
  data: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateService,
    config: Config ,public events: Events ,public viewCtrl : ViewController) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }


  doLogin() {

    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();

    this.genrator.login(this.loginData).then((result) => {

      loader.dismiss();
      this.data = result;
      if (this.data.customers != null) {

        this.navCtrl.push(TabsPage).then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });




        this.events.publish('user:login');
        localStorage.setItem('customerid', this.data.customers[0].id);
        //Update Shopping cart Badge
        this.getShoppingCartCount(localStorage.getItem('customerid'));

        

      } else {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.data.errors.Account,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      }

    }, (err) => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();

    });
  }



  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId).subscribe((data) => {
      let items  = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length + "");
    });
  }


  signUp(){
    this.navCtrl.push(SignUpPage);
  }







}
