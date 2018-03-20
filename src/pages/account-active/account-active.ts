import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Config } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in'



@IonicPage()
@Component({
  selector: 'page-account-active',
  templateUrl: 'account-active.html',
})
export class AccountActivePage {
  public form: FormGroup;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public genrator: GenratorProvider, public loadingCtrl: LoadingController, private translate: TranslateService, private _FB: FormBuilder, public alertCtrl: AlertController,config : Config) {
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.form = _FB.group({
      code: ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log(this.navParams.get("email"));
    console.log(this.navParams.get("fname"));
    console.log(this.navParams.get("lname"));
    console.log(this.navParams.get("password"));
    console.log(this.navParams.get("countryid"));
    console.log(this.navParams.get("cityid"));
    console.log(this.navParams.get("district"));
    console.log(this.navParams.get("address"));
  }


  SaveChanges(val) {

    console.log(val.code);
    let signUpdata = {
      customer:
        {
          role_ids: [3],
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          phone: "",
          verificationcode: "",
          billing_address: {
            first_name: "",
            last_name:"",
            email: "",
            company: "Appsmatic Ltd",
            country_id: 0,
            state_province_id:0,
            city: "",
            address1: "",
            phone_number: "",
            zip_postal_code: "10021"
          }
        }
    }

    //Fill
    signUpdata.customer.email=this.navParams.get("email")+"";
    signUpdata.customer.password=this.navParams.get("password")+"";
    signUpdata.customer.first_name= this.navParams.get("fname")+"";
    signUpdata.customer.last_name=this.navParams.get("lname")+"";
    signUpdata.customer.phone=this.navParams.get("phone")+"";
    signUpdata.customer.verificationcode=val.code+"";
    signUpdata.customer.billing_address.first_name=this.navParams.get("fname")+"";
    signUpdata.customer.billing_address.last_name= this.navParams.get("lname")+"";
    signUpdata.customer.billing_address.email= this.navParams.get("email")+"";
    signUpdata.customer.billing_address.country_id= this.navParams.get("countryid");
    signUpdata.customer.billing_address.state_province_id=this.navParams.get("cityid");
    signUpdata.customer.billing_address.city=this.navParams.get("district")+"";
    signUpdata.customer.billing_address.address1=this.navParams.get("address")+"";
    signUpdata.customer.billing_address.phone_number=this.navParams.get("phone");




    console.log(signUpdata);




    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    this.genrator.signUp(signUpdata).then((result) => {

      loader.dismiss();
      console.log(result);
      this.data = result;
      if (this.data.customers != null) {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('ACTIVE.donecreated'),
          buttons: [
            {
              text:  this.translate.instant('BUTTONS.dissmiss'),
              handler: () => {
                //ٌResume Shopping
                this.navCtrl.popToRoot();
                console.log(localStorage.getItem("cartCount"))
              }
            
            }
           ]
        });
        alert.present();
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
        buttons: ['Disms']
      });
      alert.present();

    });

  }

}
