import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public productsList =[];
  public countriesList=[];
  public citiesList=[];
  public districtsList=[];
  public viendorsList=[];
  public categoriesList=[];
  cntry : string ="";
  City : string ="";
  district :string ="" ;
  countryid : any;
  cityId : any;
  vendor : string ="" ;
  categoryId :string="";
  cat : string ="";
  myInput : String ="";

  
  constructor(public navCtrl: NavController, public genrator : GenratorProvider ,public loadingCtrl: LoadingController , public navParams: NavParams,private translate: TranslateService) {
    this.getProducts();
    this.getCountries();
    this.getCategories();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getProducts(){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getAllProducts().subscribe((data) => {
      this.productsList=data['products'];
      loader.dismiss();
    });
  }


  getCountries(){
    return this.genrator.getCountries().subscribe((data) => {
      this.countriesList=data['countries'];
  });

}

//kkkkkkk

getCities(id){
  return this.genrator.getCities(id).subscribe((data) => {
    this.citiesList=data['states'];
});
}

getDistricts(){
  return this.genrator.getDistructs(this.cntry,this.City).subscribe((data) => {
    this.districtsList=data['districts'];
});
}




setCntryId(id){
  this.countryid=id;
}

setCityid(id){
  this.cityId=id;
}


setCategoryId(id){
  this.categoryId=id;
}


getVendors(){
  return this.genrator.getVindors(this.countryid,this.cityId).subscribe((data) => {
    this.viendorsList=data['vendors'];
});
}


getCategories(){
  return this.genrator.getCategories().subscribe((data) => {
    this.categoriesList=data['categories'];
});
}


filter(){
  let loader = this.loadingCtrl.create({
    content: this.translate.instant('LOADING'),
  });
  loader.present();
  return this.genrator.filterProducts(this.cntry,this.City,this.district,this.categoryId,this.vendor,this.myInput).subscribe((data) => {
    this.productsList=data['products'];
    this.cntry="";
    this.City="";
    this.district="";
    this.vendor="";
    this.categoryId="";
    this.cat="";
    
    loader.dismiss();
  },(err)=>{
    loader.dismiss();

  });
}



}
