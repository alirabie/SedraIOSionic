import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountActivePage } from '../account-active/account-active';
import { AlertController, Config } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage  {

  
  public countriesList = [];
  public citiesList = [];
  public districtsList = [];

  email: any;
  fname: any;
  lname: any;
  password: any;
  rpassword: any;
  phonenum: any;
  addr: any;

  cntry: string = "";
  City: string = "";
  district: string = "";
  countryid: any;
  cityId: any;
  _i: number;
  submitAttempt: boolean = false;
  public form : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public genrator: GenratorProvider, public loadingCtrl: LoadingController, private translate: TranslateService , private _FB: FormBuilder ,public alertCtrl : AlertController , config : Config) {
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.getCountries();


    this.form = _FB.group({
      firstName: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      lastname : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      email : ['', Validators.compose([Validators.maxLength(20), Validators.required , Validators.email])],
      password : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      rpassword : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      phone : ['', Validators.compose([Validators.maxLength(14), Validators.required , Validators.minLength(9)])],
      country : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      citye : ['', Validators.compose([Validators.maxLength(20), Validators.required])] ,
      districtt : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      addr : ['', Validators.compose([Validators.maxLength(20), Validators.required])]
      });

  }

  getCountries() {
    return this.genrator.getCountries().subscribe((data) => {
      this.countriesList = data['countries'];
    });

  }


  getCities(id) {
    return this.genrator.getCities(id).subscribe((data) => {
      this.citiesList = data['states'];
    });
  }

  getDistricts() {
    return this.genrator.getDistructs(this.cntry, this.City).subscribe((data) => {
      this.districtsList = data['districts'];
    });
  }


  setCntryId(id) {
    this.countryid = id;
  }

  setCityid(id) {
    this.cityId = id;
  }


  SaveChanges(val){
    console.log(val);
    console.log(this.countryid);

    if(val.password!==val.rpassword){

      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('SIgNUP.notmatch'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();


    }else{

    //Virify phone and go to activation page
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
      this.genrator.VerifyPhon(val.phone).subscribe((data)=>{
        console.log(data);
        if(data.VerificationCode !== ""){
          loader.dismiss();
          this.navCtrl.push(AccountActivePage, {
            email: val.email,
            fname : val.firstName,
            lname : val.lastname,
            password : val.password,
            phone : val.phone,
            countryid : this.countryid,
            cityid : this.cityId,
            district : val.districtt,
            address : val.addr
          });
        }else{
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: data.ErrorMessage,
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();
          
        }
      });
    }
  }


 



  

}
