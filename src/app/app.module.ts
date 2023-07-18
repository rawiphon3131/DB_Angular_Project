import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Select2Module } from 'ng-select2-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { PaginatorModule } from 'primeng/paginator';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';


import { AuthGuard } from './auth.guard';



import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PickinProductComponent } from './pickin-product/pickin-product.component';
import { TotalProductComponent } from './total-product/total-product.component';
import { ReportSellComponent } from './report-sell/report-sell.component';
import { CustomerDebtComponent } from './customer-debt/customer-debt.component';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { PopupPickinComponent } from './popup-pickin/popup-pickin.component';
import { PopuppicknewComponent } from './popuppicknew/popuppicknew.component';
import { AddpreorderComponent } from './addpreorder/addpreorder.component';
import { StatusPreorderComponent } from './status-preorder/status-preorder.component';
import { PickinOrderPreComponent } from './pickin-order-pre/pickin-order-pre.component';
import { PopupOrderPreComponent } from './popup-order-pre/popup-order-pre.component';
import { DetailOrderPreComponent } from './detail-order-pre/detail-order-pre.component';
import { AddprdtotableComponent } from './addprdtotable/addprdtotable.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { AddNewstockPdComponent } from './add-newstock-pd/add-newstock-pd.component';
import { InFosizeComponent } from './in-fosize/in-fosize.component';
import { HistoryOfpickinComponent } from './history-ofpickin/history-ofpickin.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AddNewsellComponent } from './add-newsell/add-newsell.component';





const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'add_order', component: AddOrderComponent, canActivate: [AuthGuard] },
  { path: 'pickin_products', component: PickinProductComponent, canActivate: [AuthGuard] },
  { path: 'total_item', component: TotalProductComponent, canActivate: [AuthGuard] },
  { path: 'report_sell', component: ReportSellComponent, canActivate: [AuthGuard] },
  { path: 'dbt', component: CustomerDebtComponent, canActivate: [AuthGuard] },
  { path: 'addpo', component: AddpreorderComponent, canActivate: [AuthGuard] },
  { path: 'stateOrder', component: StatusPreorderComponent, canActivate: [AuthGuard] },
  { path: 'pickinPre', component: PickinOrderPreComponent, canActivate: [AuthGuard] },
  { path: 'cpnc', component: CompanyCreateComponent, canActivate: [AuthGuard] },
  { path: 'pdst', component: ProductStockComponent, canActivate: [AuthGuard] },
  { path: 'size', component: InFosizeComponent, canActivate: [AuthGuard] },
  { path: 'hpc', component: HistoryOfpickinComponent, canActivate: [AuthGuard] },
  { path: 'ctmif', component: CustomerInfoComponent, canActivate: [AuthGuard] },
  { path: 'addns', component: AddNewsellComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({

  declarations: [
    
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddOrderComponent,
    NavBarComponent,
    PickinProductComponent,
    TotalProductComponent,
    ReportSellComponent,
    CustomerDebtComponent,
    ProductPopupComponent,
    ProductDialogComponent,
    DetailsDialogComponent,
    PopupPickinComponent,
    PopuppicknewComponent,
    AddpreorderComponent,
    StatusPreorderComponent,
    PickinOrderPreComponent,
    PopupOrderPreComponent,
    DetailOrderPreComponent,
    AddprdtotableComponent,
    CompanyCreateComponent,
    EditCompanyComponent,
    ProductStockComponent,
    AddNewstockPdComponent,
    InFosizeComponent,
    HistoryOfpickinComponent,
    CustomerInfoComponent,
    AddNewsellComponent,
    
  ],
  imports: [
    
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    Select2Module,
    CalendarModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ConfirmPopupModule,
    ToastModule,
    DynamicDialogModule,
    TableModule,
    SpeedDialModule,
    PaginatorModule,
    TreeTableModule,
    InputTextareaModule,
    MenubarModule,
    CardModule,
    FieldsetModule,
    PanelModule,
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

