import { Component ,ViewChild  } from '@angular/core';
import { Platform , Nav ,MenuController ,NavController  } from 'ionic-angular';
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



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;

  rootPage:any = IntroScreenPage;
  loggedOut=false;
  loggedIn=false;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen , 
    private translateService: TranslateService,
    public menuCtrl: MenuController) {


      if (localStorage.getItem('customerid') === null){
        this.loggedOut=true;
        this.loggedIn=false;
      }else{
        this.loggedOut=false;
        this.loggedIn=true;
      }



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      translateService.setDefaultLang('en');
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
    localStorage.setItem('customerid',null);
    localStorage.setItem('cartCount',"");
    this.nav.popToRoot();
    this.menuCtrl.toggle();
    this.loggedOut=true;
    this.loggedIn=false;
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
    } else {
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
    this.nav.push(TabsPage);
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
    this.nav.push(ContactUsPage);
    this.menuCtrl.toggle();
  }


  //Go signUp
  signUp(){
    this.nav.push(SignUpPage);
    this.menuCtrl.toggle();
  }
  
}
