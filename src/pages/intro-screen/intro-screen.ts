import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { SignInPage } from '../sign-in/sign-in'
import { SignUpPage } from '../sign-up/sign-up'
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';



@IonicPage()
@Component({
  selector: 'page-intro-screen',
  templateUrl: 'intro-screen.html',
})
export class IntroScreenPage {

 
  

  constructor(public navCtrl: NavController, public navParams: NavParams ,public translate: TranslateService , public network : Network ,public  alertCtrl : AlertController) {
   
   translate.use("ar");


   

   this.checNetworkConnection();
   this.checkLoginStatus();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroScreenPage');
  }

  gust(){
    this.navCtrl.push(TabsPage);
  }


  login(){
    this.navCtrl.push(SignInPage)
  }


  signUp(){
    this.navCtrl.push(SignUpPage)

  }

  onChange(e) {
    this.translate.use(e);
}


checkLoginStatus(){
  if (localStorage.getItem('customerid')===null) {

  }else{
    console.log("gooooo"+localStorage.getItem('customerid'));
    this.translate.use("ar");
    this.navCtrl.push(TabsPage);
  }
}


checNetworkConnection(){
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