import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  checkdata = false
  clickpage=''
  countpage =0
  countasset=''
  us =''
  row_data_location = []
  dateStorage =''
  currentPopover = null;
  employeeno =''
  locationexpire=null
  arrL =[]
  arrL1 = []
  searchA_Number=''
  public dataLocation={
    location:[]
  }
  public dataLogin={
    username:'',
    password:''
  }
  public postData={
    getF:'',
    A_No:'',
    getStatus:'',
    search_a:[],
    getH:''
  }
  public getDataHistory={
    getA :[],
    getDate : [],
    getEmp : [],
    getStatus: [],
    getLocation :[]
  }
  public postDataHistory={
 
    eleHistoryID:[]
  }
  public postDataSearch={
    A_No:''
  }
  public dataHistoryRepair={

    date:''

    
  }
  public data={
    A_No:'',
    A:[],
    An:[],
    IT:[],
    locationName:'',
    locationFloor:'',
    ele:[],
    ele2:[],
    eleStatus:[],
    Ano:'',
    Aname : '',
    ITNo :'',
    Department:'',
    Empname : '',
    EmpID: '',
    empID:'',
    Locationname:'',
    getL: '',
    getF:'',
    getLocation: '',
    getFloor:'',
    ID: '',
    Name:'',
    Dep:'',
    eleDepartment:[],
    eleID:[],
    getID:'',
    getE:'',
    location: '',
    history:'',
    eleHistoryID: [],
    searchID:[],
    search:[],
    room:'',
    locationID:'',
    status: '',
    locationid: '',
    newLocation:'',
    getStatus:'',
    edit:'',
    emp_ID:'',
    roomold:'',
    lastdate:'',
    status_history: [],
    search_all:'',
    serial_number:'',
    category:'',
    Description:'',
    Manufacturer:''
  }
  public dataHome={
    A_No:'',
    A:[],
    An:[],
    IT:[],
    locationName:'',
    Ano:'',
    Aname : '',
    ITNo :'',
    Department:'',
    Empname : '',
    EmpID: '',
    Locationname:'',
    ID: '',
    Name:'',
    Dep:'',
    eleHistoryID: [],
    searchID:[],
    search:[],
    room:'',
    locationID:'',
    status: '',
    newLocation:'',
    getStatus:'',
    edit:'',
    emp_ID:'',
    lastdate:'',
    status_history: [],
    search_all:'',
    description:'',
    serial_number:'',
    manufacturer:''
    
  }
  public dataScan ={
    A_No:'',
    ele:[],
    ele2:[],
    eleStatus:[],
    Aname : '',
    ITNo :'',
    Department:'',
    Empname : '',
    EmpID: '',
    empID:'',
    Locationname:'',
    getF:'',
    getID:'',
    getLocation: '',
    room:'',
    locationID:'',
    status: '',
    locationid: '',
    newLocation:'',
    getStatus:'',
    edit:'',
    emp_ID:'',
    fix:'',
  }
  public dataChangeStatus={
    A_No:'',ele:[],
    ele2:[],
    eleStatus:[],
    Aname:'',
    ITNo:'',
    Department:'',
    Empname:'',
    EmpID:'',
    empID:'',
    Locationname:'',
    getF:'',
    getID:'',
    getLocation:'',
    room:'',
    locationID:'',
    status:'',
    locationid:'',
    newLocation:'',
    getStatus:'',
    edit:'',
    emp_ID:'',
    fix:'',
  }

  public dataAdd ={
    A_No:'',
    ele:[],
    ele2:[],
    eleStatus:[],
    eleCategory:[],
    eleCategoryID:[],
    eleDescription:[],
    ITNo:'',
    Department:'',
    emp_ID:'',
    Empname:'',
    room:'',
    status:'',
    description:'',
    serial_number:'',
    manufacturer:'',
    getF:'',
    category:'',
    detail:''
  }

  public dataAddMaterial={
    A_No:'',
    ITNo:'',
    emp_ID:'',
    room:'',
    manufacturer:'',
    getL:'',
    getF:'',
    getCategory:'',
    getDescription:'',
    ele:[],
    ele2:[],
    eleCategory:[],
    eleDescription:[],
    description:'',
    category:''
  }

 public dataAssetList={
  eleLocation:[],
  eleCategory:[],
  eleStatus:[],
  table_A_No:[],
  table_ITNo:[],
  table_status:[],
  table_status_type:[],
  table_last_update:[],
  table_location:[],
  table_serial_number:[],
  A_No:'',
  ITNo:'',
  category:'',
  manufacturer:'',
  description:'',
  status:'',
  update_by:'',
  created_by:'',
  created_date:'',
  serial_number:'',
  update_date:'',
  history_date:[],
  history_A_No:[],
  history_empID:[],
  history_location:[],
  history_status:[],
  history_detail:[],
  history_h_update_by:[],
  eleHistoryID:[],
  detail:''
 }
 public profile={
   fname : '',
   lname : '',
   image :'',
   username:'',
   empno : '',
   department :'',
   expire : null

 }
 public emp={
   LoginName : ''
 }
 public filterHistory={
   
 }
obj:any


  constructor() { }
}
