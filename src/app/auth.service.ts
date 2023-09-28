import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import axios from 'axios'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private httpService : HttpService,
    ) { }


  // Login1(postData:any, ip :any):Observable<any>{
  //   this.httpService.aa().subscribe(res=>{
      
  //   })
  //   return this.httpService.get2(postData,ip)
  // }

  login(postData : any): Observable<any>{
    return this.httpService.post('api/login',postData);
   
  }
  // sss(postData : any): Observable<any>{
  //   return this.httpService.get2('api/v2/STECON/GetEmployee')
  // }
  Select(postData : any): Observable<any>{

    return this.httpService.post('api/material10',postData);  
  }
  Select2(postData : any): Observable<any>{
    return this.httpService.post('api/material12',postData);  
  }
  Select3(postData : any): Observable<any>{
    return this.httpService.post('api/material13',postData);  
  }
  Select666(postData : any): Observable<any>{
    return this.httpService.post('api/material666',postData);  
  }
  getEmployeesID(postData : any): Observable<any>{
    return this.httpService.post('api/employees/id',postData);  
  }

  getEmployeesDepart(postData : any): Observable<any>{
    return this.httpService.post('api/employees',postData);
      
  }
  getName(postData : any): Observable<any>{
    return this.httpService.post('api/employees/name',postData);
      
  }
  getRoom(postData : any): Observable<any>{
    return this.httpService.post('api/location/room',postData);
     
  }
  UpdateEmployees(postData : any): Observable<any>{
    return this.httpService.post('api/update/employees',postData); 
  }
  newUpdateMaterial(postData : any): Observable<any>{
    return this.httpService.post('api/newupdate',postData); 
  }
  newUpdateStatus(postData : any): Observable<any>{
    return this.httpService.post('api/newstatus',postData); 
  }
  newHistory(postData : any): Observable<any>{
    return this.httpService.post('api/newhistory',postData); 
  }
  newEmployees(postData : any): Observable<any>{
    return this.httpService.post('api/newemployees',postData); 
  }
  UpdateMaterial(postData : any): Observable<any>{
    return this.httpService.post('api/update',postData); 
  }
  // UpdateStatus(postData : any): Observable<any>{
  //   return this.httpService.post('api/status/update',postData); 
  // }
  Insert(postData : any): Observable<any>{
    return this.httpService.post('api/insert/material',postData); 
  }
  Delete(postData : any): Observable<any>{
    return this.httpService.post('api/delete',postData); 
  }
  getAllLocation(postData : any): Observable<any>{
    return this.httpService.post('api/all/location',postData); 
  }
  getLocation(postData : any): Observable<any>{
    return this.httpService.post('api/location',postData); 
  }
  allCategoryName(postData : any): Observable<any>{
    return this.httpService.post('api/categoryname',postData); 
  }
  allDescription(postData : any): Observable<any>{
    return this.httpService.post('api/description',postData); 
  }
  getLocation2(postData : any): Observable<any>{
    return this.httpService.post('api/location/floor',postData); 
  }
  getMaterial(postData : any): Observable<any>{
    return this.httpService.post('api/material',postData); 
  }
  getHistory(postData : any): Observable<any>{
    return this.httpService.post('api/history',postData); 
  }
  getStatus(postData : any): Observable<any>{
    return this.httpService.post('api/status',postData); 
  }
  searchAll(postData : any): Observable<any>{
    return this.httpService.post('api/search/all',postData); 
  }
  searchCategory(postData : any): Observable<any>{
    return this.httpService.post('api/search/category',postData); 
  }
  searchStatus(postData : any): Observable<any>{
    return this.httpService.post('api/search/status',postData); 
  }
  
  countMaterial(postData : any): Observable<any>{
    return this.httpService.post('api/count/material',postData); 
  }
  countMaterialStatus1(postData : any): Observable<any>{
    return this.httpService.post('api/count/material/status/1',postData); 
  }
  countMaterialStatus2(postData : any): Observable<any>{
    return this.httpService.post('api/count/material/status/2',postData); 
  }
  countMaterialStatus3(postData : any): Observable<any>{
    return this.httpService.post('api/count/material/status/3',postData); 
  }
  countStatus(postData : any): Observable<any>{
    return this.httpService.post('api/count/status',postData); 
  }
  countAllCategory(postData : any): Observable<any>{
    return this.httpService.post('api/count/category',postData); 
  }
  allCategory(postData : any): Observable<any>{
    return this.httpService.post('api/category',postData); 
  }
  allMaterialCategory(postData : any): Observable<any>{
    return this.httpService.post('api/count/material/category',postData); 
  }
 lastHistory(postData : any): Observable<any>{
   return this.httpService.post('api/lasthistory',postData)
 }
 countDateHistory(postData : any):Observable<any>{
   return this.httpService.post('api/count/datehistory',postData)
 }
 countAllDateHistory(postData : any):Observable<any>{
  return this.httpService.post('api/count/all/datehistory',postData)
}
addHistory(postData : any):Observable<any>{
  return this.httpService.post('api/add/history',postData)
}
addMaterial(postData : any):Observable<any>{
  return this.httpService.post('api/add/material',postData)
}
allMaterialTop10(postData : any): Observable<any>{
  return this.httpService.post('api/material/top10',postData); 
}
chooseAll(postData : any): Observable<any>{
  return this.httpService.post('api/choose/all',postData); 
}
editAll(postData : any):Observable<any>{
  return this.httpService.post('api/update/all',postData);
}
showHistory(postData: any):Observable<any>{
  return this.httpService.post('api/show/history',postData);
}
searchAllStatus(postData: any):Observable<any>{
  return this.httpService.post('api/search/all/status',postData);
}
allMaterialPage(postData: any):Observable<any>{
  return this.httpService.post('api/material/page',postData)
}
historyPage(postData: any):Observable<any>{
  return this.httpService.post('api/history/page',postData)
}


// GetIPAdress():Observable<




GetMaterial(postData : any): Observable<any>{
  return this.httpService.get('GetMaterial?a='+postData); 
}
GetAllMaterialList():Observable<any>{
  return this.httpService.get('GetAllMaterialList')
}
GetAllMaterialStatus(postData : any):Observable<any>{
  return this.httpService.get('GetAllMaterialStatus?s='+postData)
}
GetHistory(postData : any): Observable<any>{
  return this.httpService.get('GetHistory?a='+postData)
}
GetShowHistory():Observable<any>{
  return this.httpService.get('GetShowHistory')
}
GetLastHistory():Observable<any>{
  return this.httpService.get('GetLastHistory')
}
GetAllCategory():Observable<any>{
  return this.httpService.get('GetAllCategory')
}
GetMaterialCategory(postData : any):Observable<any>{
  return this.httpService.get('GetMaterialCategory?c='+postData)
}
GetMaterialCategoryStatus(postData : any , postData2 : any):Observable<any>{
  return this.httpService.get('GetMaterialCategoryStatus?c='+postData+'&s='+postData2)
}
GetMaterialLocationStatus(postData : any , postData2 : any):Observable<any>{
  return this.httpService.get('GetMaterialLocationStatus?x='+postData+'&y='+postData2)
}
UpdateMaterialLocation(postData : any):Observable<any>{
  return this.httpService.post('UpdateMaterialLocation',postData)
}
UpdateStatus(postData : any):Observable<any>{
  return this.httpService.post('UpdateStatus',postData)
}
GetUpdateHistory(postData:any):Observable<any>{
  return this.httpService.get('GetUpdateHistory?c='+postData)
}
GetMaterialDateStatus():Observable<any>{
  return this.httpService.get('GetMaterialDateStatus')
}
GetMaterialByLocation(postData:any):Observable<any>{
  return this.httpService.get('GetMaterialByLocation?c='+postData)
}
ip():Observable<any>{
  return this.httpService.aa()
}
ip_address :any
// GetEmployee(postData : any ): Observable<any>{
//   this.ip().subscribe(res=>{
//     this.ipadd = res.query
//   })
 
//   return this.httpService.getSTECONWebAPI("GetEmployee",postData,this.ipadd)
// }
Login(postData : any ):Observable<any>{
  return this.httpService.getSTECONWebAPI2('Logon',postData,this.ip_address)
}
GetEmployee(postData : any):Observable<any>{
  return this.httpService.getSTECONWebAPI2('GetEmployee',postData,this.ip_address)
}
GetJobSite(postData : any):Observable<any>{
  return this.httpService.getSTECONWebAPI2('JobSiteAll',postData,this.ip_address)
}



GetCountAsset():Observable<any>{
  return this.httpService.get('GetCountAsset')
}
GetRepairITAssets(postData : any):Observable<any>{
  return this.httpService.get('GetRepairITAssets?x='+postData)
}
GetAssetNumber(postData : any):Observable<any>{
  return this.httpService.get('GetAssetNumber?x='+postData)
}
GetRepairHistory(postData : any):Observable<any>{
  return this.httpService.get('GetRepairHistory?x='+postData)
}
}
