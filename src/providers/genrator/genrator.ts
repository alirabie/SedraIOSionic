import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http ,Response,Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/map'
/*
  Generated class for the GenratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GenratorProvider {

  private url : string ="http://sedragift.com/";

  constructor(public http: Http) {
    console.log('Hello GenratorProvider Provider');
  }



  getAllProducts(){
  return this.http.get(this.url+"api/products?fields=id,name,price,images").map((res : Response)=>res.json());
  }
  
  getProductsById(id){
    return this.http.get(this.url+"api/products?category_id="+id+"&fields=id,name,price,images").map((res : Response)=>res.json());
  }


  getCountries(){

    return this.http.get(this.url+"api/countries?ids=52,69").map((res : Response)=>res.json());

  }


  getCities(id){
    return this.http.get(this.url+"api/states/"+id).map((res : Response)=>res.json());
  }



  getDistructs(country,state){
    return this.http.get(this.url+"api/districts/country/"+country+"/state/"+state).map((res : Response)=>res.json());
  }


  getVindors(countid,stateid){
    return this.http.get(this.url+"api/vendors/country/"+countid+"/state/"+stateid).map((res : Response)=>res.json());
  }



  getCategories(){
    return this.http.get(this.url+"api/categories?fields=id,name").map((res : Response)=>res.json());
  }


  filterProducts(country,state,district,category,vendor,serchKey){
    return this.http.get(this.url+"/api/products?country="+country+"&state="+state+"&district="+district+"&category_id="+category+"&vendor_name="+vendor+"&searchKeyword="+serchKey).map((res : Response)=>res.json());

  }




  getProudctInfo(id){
    return this.http.get(this.url+"api/products/"+id).map((res : Response)=>res.json());
  }



  signUp(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url+'api/customers/', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }



  VerifyPhon(phoneNum){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url+"api/customers/PhoneVerification?phoneno="+phoneNum,{headers : headers}).map((res : Response)=>res.json());
  }




  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url+'api/customers/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }


  addToWishlist(productId,custId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url+"api/wishlist/add?productId="+productId+"&shoppingCartTypeId=2&quantity=1&customerId="+custId,{headers : headers}).map((res : Response)=>res.json());
  }


  removeFromWishlist(productId,custId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url+"api/wishlist/delete/?itemId="+productId+"&shoppingCartTypeId=2&quantity=1&customerId="+custId,{headers : headers}).map((res : Response)=>res.json());
  }


  getRelatedProducts(id){
    return this.http.get(this.url+"api/products/related/"+id).map((res : Response)=>res.json());
  }


  getCustomerWishlist(id){
    return this.http.get(this.url+"api/wishlist/"+id).map((res : Response)=>res.json());
  }


  addToShoppingCart(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url+'api/shopping_cart_items', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }


  getShoppingCartItems(customerId){
    return this.http.get(this.url+"api/shopping_cart_items/"+customerId).map((res : Response)=>res.json());
  }
 

  deleteFromShoppingCart(id){
    return this.http.delete(this.url+"api/shopping_cart_items/"+id).map((res : Response)=>res.json());
  }


  getAlldisounted(){
    return this.http.get(this.url+"api/products/discounted/").map((res : Response)=>res.json());
  }

  getdiscountedById(id){
    return this.http.get(this.url+"api/products/discounted/"+id).map((res : Response)=>res.json());
  }

  getCustomerInfo(id){
    return this.http.get(this.url+"api/customers/"+id).map((res : Response)=>res.json());
  }


  contactUs(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url+'api/contactus', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

}
