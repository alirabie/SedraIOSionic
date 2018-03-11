import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { SignInPage } from '../sign-in/sign-in'
import { SignUpPage } from '../sign-up/sign-up'
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-intro-screen',
  templateUrl: 'intro-screen.html',
})
export class IntroScreenPage {

 
  

  constructor(public navCtrl: NavController, public navParams: NavParams ,public translate: TranslateService) {
   
   translate.use("ar");
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

  if (localStorage.getItem('customerid') === "") {

  }else{
    this.translate.use("ar");
    this.navCtrl.push(TabsPage);
  }
}


}