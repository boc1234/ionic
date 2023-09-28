import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'employeelogin',
    pathMatch: 'full'
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'updatematerial',
    loadChildren: () => import('./updatematerial/updatematerial.module').then( m => m.UpdatematerialPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'editscan',
    loadChildren: () => import('./editscan/editscan.module').then( m => m.EditscanPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'updatestatus',
    loadChildren: () => import('./updatestatus/updatestatus.module').then( m => m.UpdatestatusPageModule)
  },
  {
    path: 'addmaterial',
    loadChildren: () => import('./addmaterial/addmaterial.module').then( m => m.AddmaterialPageModule)
  },
  {
    path: 'chooseadd',
    loadChildren: () => import('./chooseadd/chooseadd.module').then( m => m.ChooseaddPageModule)
  },
  {
    path: 'load',
    loadChildren: () => import('./load/load.module').then( m => m.LoadPageModule)
  },
  {
    path: 'changestatus',
    loadChildren: () => import('./changestatus/changestatus.module').then( m => m.ChangestatusPageModule)
  },
  {
    path: 'assetlist',
    loadChildren: () => import('./assetlist/assetlist.module').then( m => m.AssetlistPageModule)
  },
  {
    path: 'assetgeneral',
    loadChildren: () => import('./assetgeneral/assetgeneral.module').then( m => m.AssetgeneralPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'mobilehome',
    loadChildren: () => import('./mobilehome/mobilehome.module').then( m => m.MobilehomePageModule)
  },
  {
    path: 'searchasset',
    loadChildren: () => import('./searchasset/searchasset.module').then( m => m.SearchassetPageModule)
  },
  {
    path: 'employeelogin',
    loadChildren: () => import('./employeelogin/employeelogin.module').then( m => m.EmployeeloginPageModule)
  },
  {
    path: 'updatelist',
    loadChildren: () => import('./updatelist/updatelist.module').then( m => m.UpdatelistPageModule)
  },
  {
    path: 'menuedit',
    loadChildren: () => import('./menuedit/menuedit.module').then( m => m.MenueditPageModule)
  },
  {
    path: 'historyupdate',
    loadChildren: () => import('./historyupdate/historyupdate.module').then( m => m.HistoryupdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
