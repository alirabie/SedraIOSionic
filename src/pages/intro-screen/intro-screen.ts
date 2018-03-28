import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { SignInPage } from '../sign-in/sign-in'
import { SignUpPage } from '../sign-up/sign-up'
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { IntroScreenPageModule } from '../intro-screen/intro-screen.module'



@IonicPage()
@Component({
  selector: 'page-intro-screen',
  templateUrl: 'intro-screen.html',
})
export class IntroScreenPage {




  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService, public network: Network, public alertCtrl: AlertController, private viewCtrl: ViewController) {

    translate.use("ar");





  }

  ionViewDidEnter() {


    this.checNetworkConnection();
    if (localStorage.getItem('customerid') === null) {

    } else {
      console.log("gooooo" + localStorage.getItem('customerid'));
      this.translate.use("ar");
      this.navCtrl.push(TabsPage).then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });


    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroScreenPage');
  }

  gust() {
    this.navCtrl.push(TabsPage);
  }


  login() {
    this.navCtrl.push(SignInPage)
  }


  signUp() {
    this.navCtrl.push(SignUpPage)

  }

  onChange(e) {
    this.translate.use(e);
  }





  checNetworkConnection() {
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      let alert = this.alertCtrl.create({
        title: this.translate.instant('connection'),
        subTitle: this.translate.instant('nonetwork'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
    });

  }


}