import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
    SettingsPage
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    SettingsPage
  ],
  providers: [
    StatusBar,
    SocialSharing,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GenratorProvider
  ]
})
export class AppModule {}
