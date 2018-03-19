import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , config : Config , public translate : TranslateService) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
