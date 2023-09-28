import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {environment}from 'src/environments/environment';
import axios from 'axios'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
 
  post(serviceName : string, data:any){
    const headers = {"Content-Type": "application/x-www-form-urlencoded",};
    const options = {headers:headers,withCredintials:false};
    
    const url = environment.apiUrl + serviceName;
    return this.http.post(url,data,options)
    
  }
  post2(serviceName : string, data:any){
    const headers = new HttpHeaders();
    const options = {headers:headers,withCredintials:false};

    const url = 'https://localhost:44375/' + serviceName;
    return this.http.post(url,JSON.stringify(data),options)
    
  }
  
  
  get(serviceName : string){
    const headers = new HttpHeaders();
    
    const options = {headers:headers,withCredintials:false,};

    const url = environment.apiUrl+serviceName ;
    //const url = serviceName ;
    return this.http.get(url,options)
  }

  getSTECONWebAPI2(serviceName : string, postData : string , ip:any){
    var date = new Date();
    date.setHours(date.getHours()+1)
   var datatest:string = JSON.stringify({
      "AppNo": "W-0035",
      "UserId": "0",
      "IPAddress": ip,
      "DoEncrypt": false,
      "ExpireDateTime": date.toLocaleString()
  })
    var encrypt:string = btoa(datatest)
    var params={
           code: encrypt,
           token:JSON.stringify(postData) 
    }
    const headers = new HttpHeaders();
    
    const options = {headers:headers,withCredintials:false,};

    const url = "https://sthq76.stecon.co.th/STECONWebAPI/api/STECON/"+serviceName ;
    //const url = serviceName ;
    return this.http.get(url+"?code="+params.code +"&token="+params.token,options)
  }

  
  getSTECONWebAPI( serviceName : any, postData : string , ip:any){
   
    var date = new Date();
    date.setHours(date.getHours()+1)
   var datatest:string = JSON.stringify({
      "AppNo": "W-0035",
      "UserId": "0",
      "IPAddress": ip,
      "DoEncrypt": false,
      "ExpireDateTime": date.toLocaleString()
  })
    var encrypt:string = btoa(datatest)
    
    const headers = new HttpHeaders();
    const options = {headers:headers,withCredintials:false};
    axios.get("https://sthq76.stecon.co.th/STECONWebAPI/api/STECON/"+serviceName,{
    
      params:{      
           code:encrypt,
           token:postData       
      },
  })
  
  .then(function (response) {
   console.log(response.data);
  
    
  })
  .catch(function (error) {
  console.log(error)
  }).then(function (res){
   
  })
    // const data = postData ;
    return this.http.get(postData,options)
  }

  
  test123(serviceName : string, data : string ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '', // The good guy.
    });
  
    const options = {headers:headers};

    const url = 'https://localhost:44375/' + serviceName;
    return this.http.post(url,JSON.stringify(data),options)
    
  }


  aa( ){
    const headers = new HttpHeaders();
    
    const options = {headers:headers,withCredintials:false,};

    const url = "http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,query" ;
    //const url = serviceName ;
    return this.http.get(url,options)
  }
}
