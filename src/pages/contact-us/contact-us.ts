import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, LoadingController , AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {


  submitAttempt: boolean = false;
  public form: FormGroup;

  email: any;
  fname: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    config: Config,
    public alertCtrl : AlertController,
    public genrator: GenratorProvider,
    public loader: LoadingController, private _FB: FormBuilder) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.form = _FB.group({
      subject: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      message: ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }




  SaveChanges(val) {
    console.log(val);

    let contactusdata = {
      Subject : "",
      Enquiry: "",
      FullName: "",
      Email: ""
    }

    contactusdata.Subject=val.subject+"";
    contactusdata.Enquiry=val.message+"";

    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    this.genrator.contactUs(contactusdata).then((result)=>{

      loader.dismiss();

      let data : any =result;
      if(data.message === 'ok' ){

        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('donsend')+"",
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
        this.navCtrl.pop();

      }else{

        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: data.ErrorMessage+"",
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      
      };

    },(err)=>{

      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err+"",
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();

      loader.dismiss();

    });
    



  }




}
