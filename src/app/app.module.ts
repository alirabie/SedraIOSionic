import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ViewController } from 'ionic-angular';
import { MyApp } from './app.component';
import { CookesPage } from '../pages/cookes/cookes';
import { GiftsPage } from '../pages/gifts/gifts';
import { FlowersPage } from '../pages/flowers/flowers';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlantsPage } from '../pages/plants/plants'
import { IntroScreenPage } from '../pages/intro-screen/intro-screen';
import { SignInPage } from '../pages/sign-in/sign-in'
import { SignUpPage } from '../pages/sign-up/sign-up'
import { GenratorProvider } from '../providers/genrator/genrator';
import {  HttpModule } from '@angular/http'
import { HttpClientModule , HttpClient  } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomePage } from '../pages/home/home'
import { ProductInfoPage } from '../pages/product-info/product-info'
import { FavoritesPage } from '../pages/favorites/favorites'
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart'
import { DiscountedProductsPage } from '../pages/discounted-products/discounted-products'
import { SettingsPage } from '../pages/settings/settings'
import { AboutUsPage } from '../pages/about-us/about-us'
import { AccountActivePage } from '../pages/account-active/account-active'
import { ProfilePage } from '../pages/profile/profile'
import { ContactUsPage } from '../pages/contact-us/contact-us'
import { Network } from '@ionic-native/network';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePickerModule } from 'ion-datepicker';


// import { AboutUsPageModule } from '../pages/about-us/about-us.module';
// import { SettingsPageModule } from '../pages/settings/settings.module';
// import { DiscountedProductsPageModule } from '../pages/discounted-products/discounted-products.module';
// import { AccountActivePageModule } from '../pages/account-active/account-active.module';
// import { ProfilePageModule } from '../pages/profile/profile.module';
// import { ContactUsPageModule } from '../pages/contact-us/contact-us.module';
// import { ShoppingCartPageModule } from '../pages/shopping-cart/shopping-cart.module';
// import { FavoritesPageModule } from '../pages/favorites/favorites.module';
// import { ProductInfoPageModule } from '../pages/product-info/product-info.module';
// import { HomePageModule } from '../pages/home/home.module';
// import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
// import { SignInPageModule } from '../pages/sign-in/sign-in.module';
// import { IntroScreenPageModule } from '../pages/intro-screen/intro-screen.module';
// import { PlantsPageModule } from '../pages/plants/plants.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http ,'./assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    CookesPage,
    GiftsPage,
    FlowersPage,
    PlantsPage,
    TabsPage,
    IntroScreenPage,
     SignInPage,
    SignUpPage,
    HomePage,
    ProductInfoPage,
    FavoritesPage ,
    ShoppingCartPage ,
    DiscountedProductsPage,
    SettingsPage,
    AboutUsPage,
    AccountActivePage,
    ProfilePage ,
    ContactUsPage
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DatePickerModule,

    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })        ,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CookesPage,
    GiftsPage,
    PlantsPage,
    FlowersPage,
    TabsPage,
    IntroScreenPage,
    SignInPage,
    SignUpPage,
    HomePage ,
    ProductInfoPage ,
    FavoritesPage ,
    ShoppingCartPage ,
    DiscountedProductsPage ,
    SettingsPage ,
    AboutUsPage ,
    AccountActivePage ,
    ProfilePage ,
    ContactUsPage
  ],
  providers: [
    DatePicker,
    StatusBar,
    SocialSharing,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GenratorProvider,
    Network
  ]
})
export class AppModule {}
