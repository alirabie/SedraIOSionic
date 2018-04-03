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
  state: string = "";
  district: string = "";
  countryid: any;
  cityId: any;
  _i: number;
  submitAttempt: boolean = false;
  public form : FormGroup;
  data: any;

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
    return this.genrator.getDistructs(this.cntry, this.state).subscribe((data) => {
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
    let custdata = JSON.parse(localStorage.getItem('customerdata'));

     this.email=custdata.billing_address.email;
     this.fname=custdata.billing_address.first_name;
     this.lname=custdata.billing_address.last_name;
     this.phonenum=custdata.billing_address.phone_number;
     this.cntry=custdata.billing_address.country;
     this.countryid=custdata.billing_address.country_id;
     this.state=custdata.billing_address.province;
     this.cityId=custdata.billing_address.state_province_id;
     this.district=custdata.billing_address.city;
     this.addr=custdata.billing_address.address1;

     this.getCities(this.countryid);
     this.getDistricts();
  
 

 
  }



  SaveChanges(val){

    let updatedData = {
      customer:
            {
              role_ids:[3],
              email: val.email+"",
              password: val.password,
              first_name: val.firstName,
              last_name:val.lastname,
              phone:val.phone,
              verificationcode:"",
              billing_address: {
              first_name: val.firstName,
              last_name: val.lastname,
              email: val.email,
              company: "Appsmatic Ltd",
              country_id: this.countryid+"",
              state_province_id: this.cityId+"",
              province: val.citye,
              city: val.districtt,
              address1: val.addr,
              phone_number: val.phone,
              zip_postal_code: "10021"
            }
            }
    }




    console.log(updatedData);

    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();

    this.genrator.updateProfile(updatedData,localStorage.getItem('customerid')).then((data)=>{
      console.log(data);
      loader.dismiss();
      if(data['customers']!=null){
        this.data=data;
        localStorage.setItem('customerdata',JSON.stringify(this.data.customers[0]));
        this.navCtrl.popToRoot();
      }

    },(err)=>{
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
    });

  }

}
