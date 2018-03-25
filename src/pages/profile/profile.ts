import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config , LoadingController , AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public countriesList = [];
  public citiesList = [];
  public districtsList = [];
  customers=[];

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    config :Config,
    public genrator : GenratorProvider,
    public loader : LoadingController,private _FB: FormBuilder ,public alertCtrl : AlertController) {

      config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
      this.getCountries();
      this.getCustomerInfo();
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


  //get Customer Info
  getCustomerInfo(){
    this.genrator.getCustomerInfo(localStorage.getItem('customerid')).subscribe((data)=>{

      this.customers=data['customers']
     let customer = this.customers['0'];
     this.email=customer.email;
     this.fname=customer.first_name;
     this.lname=customer.last_name;
 

    }),((err)=>{

      console.log(err);
    });
  }




}
