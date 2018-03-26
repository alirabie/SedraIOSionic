import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config , LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'



@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    config :Config,
    public genrator : GenratorProvider,
    public loader : LoadingController) {

      config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

}
