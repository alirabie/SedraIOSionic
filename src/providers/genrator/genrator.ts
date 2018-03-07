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









}
