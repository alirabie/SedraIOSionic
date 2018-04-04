import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Config , LoadingController  } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { SignInPage } from '../sign-in/sign-in'
import { SocialSharing } from '@ionic-native/social-sharing';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePickerModule } from 'ion-datepicker';


@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {

  public localDate: Date = new Date();
  public minDate: Date = new Date();
  public day: any;
  public selectedDate: any;
  buttonColor : string;



  public localeString = {
    monday: true,
    //Translate this later
    weekdays: [
    
    this.translate.instant('WEEKDAYS.mon'), 
    this.translate.instant('WEEKDAYS.tue'),
    this.translate.instant('WEEKDAYS.wed'), 
    this.translate.instant('WEEKDAYS.thr'), 
    this.translate.instant('WEEKDAYS.fri'),
    this.translate.instant('WEEKDAYS.sat'),
    this.translate.instant('WEEKDAYS.sun') ],

    months: [
      this.translate.instant('MONTHS.jan'),
      this.translate.instant('MONTHS.feb'), 
      this.translate.instant('MONTHS.mar'), 
      this.translate.instant('MONTHS.apr'), 
      this.translate.instant('MONTHS.may'), 
      this.translate.instant('MONTHS.jun'), 
      this.translate.instant('MONTHS.jul'), 
      this.translate.instant('MONTHS.aug'), 
      this.translate.instant('MONTHS.sep'), 
      this.translate.instant('MONTHS.oct'), 
      this.translate.instant('MONTHS.nov'), 
      this.translate.instant('MONTHS.dec')]
  };

  vendorSchduals = [];
  dayTimes =[];
  timeFrom ="";
  timeTo ="";
 
  schadulId ="";








  count = 1;
  id: String = "";
  name: string = "";
  productInfo = [];
  relatedProducts = [];
  min = "";
  max = "";

  buttonIcon: string = "heart";

  public countriesList = [];
  public citiesList = [];

  countryid: any;
  cityId: any;
  bulidingNo: any;
  note: any;
  phonenum: any;
  street: any;

  cntry: string = "";
  City: string = "";

  submitAttempt: boolean = false;
  public addressForm: FormGroup;
  public giftMessageForm :FormGroup;
  public DelivirdatabuttonClicked: boolean = false; //Whatever you want to initialise it as
  public giftMessagebuttonClicked: boolean = false; //Whatever you want to initialise it as



  public DeliverButtonClick() {
    this.DelivirdatabuttonClicked = !this.DelivirdatabuttonClicked;
  }



  public giftButtonClick() {
    this.giftMessagebuttonClicked = !this.giftMessagebuttonClicked;
  }







  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    config: Config,
    public SocialSharing: SocialSharing,
    private _FB: FormBuilder,
    public loadingCtrl : LoadingController) {



    this.id = this.navParams.get("productId");
    this.name = this.navParams.get("prouductName");
    this.getProductInf();
    this.getRelatedProducts();
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));


    this.getCountries();
    //Card Address Form
    this.addressForm = _FB.group({
      country: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      citye: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      street: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      bulidingNo: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      notes: ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });


    this.giftMessageForm =_FB.group({
      message: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      reciver: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      sender: ['',  Validators.compose([Validators.maxLength(20), Validators.required])],
      senderPhoneNum: ['',  Validators.compose([Validators.maxLength(20), Validators.required])],
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductInfoPage');
  }


  getProductInf() {
    this.genrator.getProudctInfo(this.id).subscribe((data) => {
      this.productInfo = data['products'];
      //Get Max and min Preparing product
      let obj = this.productInfo['0'];
      let attr = obj['attributes'];
      let max = attr['0'];
      let min = attr['1'];
      this.min = min.default_value;
      this.max = max.default_value;
      this.getVendorSchadules();
    });
  }

  toggleIcon(getIcon: string) {

    if (localStorage.getItem('customerid') === null) {

      this.navCtrl.push(SignInPage);

    } else {
      if (this.buttonIcon === 'heart') {
        this.buttonIcon = "star";
        this.genrator.addToWishlist(this.id, localStorage.getItem("customerid")).subscribe((data) => {
          if (data.Items != null) {
            let alert = this.alertCtrl.create({
              title: this.translate.instant('PAGE_TITLE.dilog'),
              subTitle: this.translate.instant('FAVADD'),
              buttons: [this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();

          }
        });
      }
    }
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

  setCntryId(id) {
    this.countryid = id;
  }

  setCityid(id) {
    this.cityId = id;
  }


  getRelatedProducts() {
    this.genrator.getRelatedProducts(this.id).subscribe((data) => {
      this.relatedProducts = data['products'];
    });
  }




  goRelatedProduct(id, name) {
    this.navCtrl.push(ProductInfoPage, {
      productId: id,
      prouductName: name
    });
  }

  share() {



    let st: string = encodeURIComponent(this.name.replace(' ', '-'))
    this.SocialSharing.share("http://sedragift.com/" + st).then(() => {
      console.log("shareSheetShare: Success");
    }).catch((err) => {
      console.error("shareSheetShare: failed");
    });
  }


  up() {
    this.count++;
  }

  dwon() {
    if (this.count <= 1) {
      return;
    } else {
      this.count--;
    }
  }


  addToCart() {


    if (localStorage.getItem("customerid") === null) {

      this.navCtrl.push(SignInPage);
    } else {

      if (!this.addressForm.valid) {


        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('deliverinfoerr'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
        this.DelivirdatabuttonClicked = true;

      } else if (this.selectedDate==""||this.schadulId=="") { 


        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('timeinfoerr'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
        this.DelivirdatabuttonClicked = true;

      }else{

        console.log(this.addressForm.value)
        let cartItem = {
          shopping_cart_item: {
            id: "null",
            customer_entered_price: "0",
            quantity: "0",
            created_on_utc: "2017-06-13T16:15:47-04:00",
            updated_on_utc: "2017-06-13T16:15:47-04:00",
            shopping_cart_type: "1",
            product_id: '0',
            customer_id: '0'
          }
        }
        cartItem.shopping_cart_item.quantity = this.count + "";
        cartItem.shopping_cart_item.product_id = this.id + "";
        cartItem.shopping_cart_item.customer_id = localStorage.getItem("customerid");

        let loader = this.loadingCtrl.create({
          content: this.translate.instant('LOADING'),
        });
        loader.present();

        this.genrator.addToShoppingCart(cartItem).then((result) => {

          loader.dismiss();
          if (result['shopping_carts'] != null) {
            console.log(result);
            let cartItems=result['shopping_carts'];
            let cartItem = cartItems['0'];
            //Add Presnt Card using cart Item ID
            this.addPresnetCard(cartItem.id+"");

          
          }

        }, (err) => {
          loader.dismiss();

          console.log(err);

        });
      }
    }
  }



  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId).subscribe((data) => {
      let items = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length + "");
    });
  }



  getVendorSchadules() {

    let obj = this.productInfo['0'];

    this.genrator.getVendorSchadule(obj.vendor_id).subscribe((data) => {

      this.vendorSchduals = data['deliveryschedules'];
      console.log(data['deliveryschedules']);

    });

  }








  dateselected(data) {
    let s: string = data;
    let selectedDat = new Date(s);
    this.timeFrom ="";
    this.timeTo="";
    this.schadulId="";

    this.day = selectedDat.getDay();
    console.log(this.day);
    this.selectedDate = new Date(selectedDat.getTime()-selectedDat.getTimezoneOffset()*60000).toISOString();
    console.log(this.selectedDate);
    this.getTimesByDay(this.day);
  }


  getTimesByDay(day) {
    this.dayTimes = [];
    for (let i = 0; i < this.vendorSchduals.length; i++) {
      let obj = this.vendorSchduals[i];
      if (obj.day == day) {
        let time = {
          id: "",
          from: "",
          to: ""
        }
        time.id = obj.id;
        time.from = obj.timefrom;
        time.to = obj.timeto;
        console.log(time)
        this.dayTimes.push(time)
      }

    }
    console.log(this.dayTimes)
  }

  onTimeScSelected(time) {

    this.schadulId=time.id;
    this.timeFrom=time.from;
    this.timeTo =time.to;

    console.log(this.schadulId);
    
  }


  addPresnetCard(cartItemid){

    if(!this.giftMessageForm.valid){
      let presntCard = {
        order_card : {
          cards: [
            {
              cardaddress: {
                 country_id : this.countryid+"",
                state_id : this.cityId+"",
                building_no : this.addressForm.value.bulidingNo+"",
                 note : this.addressForm.value.notes+"",
                 reciever_phone_no : this.addressForm.value.phone+ "",
                 street : this.addressForm.value.street+""
              },
              cardmessage : {
                 message : null,
                 reciever : null,
                 sender : null,
                 sender_phone_no : null
              },
               cardschedule : {
                 delivery_date : this.selectedDate+"",
                 schedule_id : this.schadulId+""
              },
               cart_item_id : cartItemid+"",
               order_id : null,
               customer_id : localStorage.getItem('customerid')+""
            }
          ],
           order_id : null
        }
       }
  
    
       //Fire Add present card sevice
       console.log(presntCard);
       let loader = this.loadingCtrl.create({
        content: this.translate.instant('LOADING'),
      });
      loader.present();
       this.genrator.addPresntCard(presntCard).then((presentcardres)=>{

        loader.dismiss();

        this.getShoppingCartCount(localStorage.getItem("customerid"));
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('ADEDD'),
          buttons: [
            {
              text: this.translate.instant('CONTINE'),
              handler: () => {
                //ٌResume Shopping
                this.navCtrl.popTo(TabsPage);

                console.log(localStorage.getItem("cartCount"))
              }
            },
            {
              text: this.translate.instant('END'),
              handler: () => {

                //Go to shopping cart
                this.navCtrl.push(ShoppingCartPage);
              }
            }
          ]
        });
        alert.present();


        console.log(presentcardres);

       },(err)=>{

        loader.dismiss();

        console.log(err);

       });

    }else{

        let presntCard = {
          order_card : {
            cards: [
              {
                cardaddress: {
                   country_id : this.countryid+"",
                  state_id : this.cityId+"",
                  building_no : this.addressForm.value.bulidingNo+"",
                   note : this.addressForm.value.notes+"",
                   reciever_phone_no : this.addressForm.value.phone+ "",
                   street : this.addressForm.value.street+""
                },
                cardmessage : {
                   message : this.giftMessageForm.value.message,
                   reciever : this.giftMessageForm.value.reciver,
                   sender : this.giftMessageForm.value.sender,
                   sender_phone_no : this.giftMessageForm.value.senderPhoneNum
                },
                 cardschedule : {
                   delivery_date : this.selectedDate+"",
                   schedule_id : this.schadulId+""
                },
                 cart_item_id : cartItemid+"",
                 order_id : null,
                 customer_id : localStorage.getItem('customerid')+""
              }
            ],
             order_id : null
          }
         }
    
      
        //Fire Add present card sevice
        console.log(presntCard);
        let loader = this.loadingCtrl.create({
          content: this.translate.instant('LOADING'),
        });
        loader.present();
        this.genrator.addPresntCard(presntCard).then((presentcardres)=>{
 
          loader.dismiss();
         this.getShoppingCartCount(localStorage.getItem("customerid"));
         let alert = this.alertCtrl.create({
           title: this.translate.instant('PAGE_TITLE.dilog'),
           subTitle: this.translate.instant('ADEDD'),
           buttons: [
             {
               text: this.translate.instant('CONTINE'),
               handler: () => {
                 //ٌResume Shopping
                 this.navCtrl.popTo(TabsPage);
 
                 console.log(localStorage.getItem("cartCount"))
               }
             },
             {
               text: this.translate.instant('END'),
               handler: () => {
 
                 //Go to shopping cart
                 this.navCtrl.push(ShoppingCartPage);
               }
             }
           ]
         });
         alert.present();
 
 
         console.log(presentcardres);
 
        },(err)=>{
          loader.dismiss();
 
         console.log(err);
 
        });
  

    }
  



     

  }

}
