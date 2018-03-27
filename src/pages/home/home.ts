import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , AlertController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { ProductInfoPage } from '../product-info/product-info';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { SignInPage } from '../sign-in/sign-in';





@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public productsList = [];
  public countriesList = [];
  public citiesList = [];
  public districtsList = [];
  public viendorsList = [];
  public categoriesList = [];
  cntry: string = "";
  City: string = "";
  district: string = "";
  countryid: any;
  cityId: any;
  vendor: string = "";
  categoryId: string = "";
  cat: string = "";
  myInput: String = "";
  badgeValue;

  public buttonClicked: boolean = false; //Whatever you want to initialise it as

  public onButtonClick() {

      this.buttonClicked = !this.buttonClicked;
  }

  constructor(public navCtrl: NavController, public genrator: GenratorProvider, public loadingCtrl: LoadingController, public navParams: NavParams, private translate: TranslateService ,public alrtCtrl : AlertController ) {
    this.getProducts();
    this.getCountries();
    this.getCategories();



  }


  ionViewDidEnter() {

    this.setCartCount();


  }



  getProducts() {
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getAllProducts().subscribe((data) => {
      this.productsList = data['products'];
      this.setCartCount();
      loader.dismiss();
    },(err)=>{
      let alert = this.alrtCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      loader.dismiss();
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


  setCategoryId(id) {
    this.categoryId = id;
  }


  getVendors() {
    return this.genrator.getVindors(this.countryid, this.cityId).subscribe((data) => {
      this.viendorsList = data['vendors'];
    });
  }


  getCategories() {
    return this.genrator.getCategories().subscribe((data) => {
      this.categoriesList = data['categories'];
    });
  }


  filter() {
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.filterProducts(this.cntry, this.City, this.district, this.categoryId, this.vendor, this.myInput).subscribe((data) => {
      this.productsList = data['products'];
    


      loader.dismiss();
    }, (err) => {
      loader.dismiss();

    });
  }


  goProductInfo(id, name) {
    this.navCtrl.push(ProductInfoPage, {
      productId: id,
      prouductName: name
    });

  }

  setCartCount() {
    if (localStorage.getItem("cartCount") == "0") {
      this.badgeValue = null;
    } else {
      this.badgeValue = localStorage.getItem("cartCount");
    }
  }





  goShoppingCartPage() {
    if (localStorage.getItem("customerid") === null) {
      this.navCtrl.push(SignInPage);
    } else {
      this.navCtrl.push(ShoppingCartPage);
    }
  }



}
