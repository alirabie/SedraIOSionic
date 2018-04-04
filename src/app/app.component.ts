import { Component ,ViewChild  } from '@angular/core';
import { Platform , Nav ,MenuController ,NavController ,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroScreenPage } from '../pages/intro-screen/intro-screen'
import { TranslateService } from '@ngx-translate/core';
import { FavoritesPage } from '../pages/favorites/favorites'
import { SignInPage } from '../pages/sign-in/sign-in'
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart'
import { DiscountedProductsPage } from '../pages/discounted-products/discounted-products'
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings'
import { AboutUsPage } from '../pages/about-us/about-us'
import { ProfilePage } from '../pages/profile/profile'
import { ContactUsPage } from '../pages/contact-us/contact-us'
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any = IntroScreenPage;
  @ViewChild('content') nav: NavController;


  loggedOut=false;
  loggedIn=false;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen , 
    private translateService: TranslateService,
    public menuCtrl: MenuController,public events: Events , public alertCtrl : AlertController ) {


      if (localStorage.getItem('customerid') === null){
        this.loggedOut=true;
        this.loggedIn=false;
      }else{
        this.loggedOut=false;
        this.loggedIn=true;
      }

      events.subscribe('user:login', () => {
        this.loginEvent();
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      translateService.setDefaultLang('ar');
      //translateService.use('ar');  
      
     // statusBar.backgroundColorByHexString('#ffffff');
      statusBar.backgroundColorByHexString('#b1925a');
   
      splashScreen.hide();
    });
    
  }





     //Side menue 

  //Favorites
  goFavoritesPage(){

    //Check if user loged in or not 
    if (localStorage.getItem('customerid') === null){
      this.nav.push( SignInPage );
      this.menuCtrl.toggle();
    }else{
      this.nav.push( FavoritesPage );
      this.menuCtrl.toggle();
    }
    
  }


  //Logout
  logout(){
    localStorage.removeItem('customerid');
    localStorage.removeItem('customerdata');
    localStorage.setItem('cartCount',"0");
    this.nav.setRoot(IntroScreenPage);
    this.menuCtrl.toggle();
    this.loggedOut=true;
    this.loggedIn=false;
  }

  loginEvent(){
    this.loggedOut=false;
    this.loggedIn=true;
  }

  login(){
    this.nav.push(SignInPage);
    this.menuCtrl.toggle();
  }

  

  //Shopping Cart
  goShoppingCartPage() {
    if (localStorage.getItem('customerid') === null) {
      this.nav.push(SignInPage);
      this.menuCtrl.toggle();
    } else if (localStorage.getItem('cartCount')=='0') {

      let alert = this.alertCtrl.create({
        title: this.translateService.instant('PAGE_TITLE.dilog'),
        subTitle: this.translateService.instant('cartempty'),
        buttons: [this.translateService.instant('BUTTONS.dissmiss')]
      });
      alert.present();

      this.menuCtrl.toggle();
    }else{
      this.nav.push(ShoppingCartPage);
      this.menuCtrl.toggle();
    }
  }


  //Discounted Products
  goDiscounted(){
    this.nav.push(DiscountedProductsPage);
    this.menuCtrl.toggle();
  }

  //go home page
  gohome(){
    this.nav.push(TabsPage).then(() => {
      // first we find the index of the current view controller:
      let viewctrl : ViewController;
      const index = viewctrl.index;
      // then we remove it from the navigation stack
      this.nav.remove(index);
    });
    this.menuCtrl.toggle();
  }

  //go settings
  goSettings(){
    this.nav.push(SettingsPage);
    this.menuCtrl.toggle();
  }


  //AboutUs
  goAboutUs(){
    this.nav.push(AboutUsPage);
    this.menuCtrl.toggle();
  }


  //Go profile
  goProfile(){
    this.nav.push(ProfilePage);
    this.menuCtrl.toggle();
  }


  //Go Contact Us
  goContactUs(){
    if (localStorage.getItem('customerid') === null){
      this.nav.push(SignInPage);
      this.menuCtrl.toggle();
    }else{
      this.nav.push(ContactUsPage);
      this.menuCtrl.toggle();
    }
   
  }


  //Go signUp
  signUp(){
    this.nav.push(SignUpPage);
    this.menuCtrl.toggle();
  }
  
}
