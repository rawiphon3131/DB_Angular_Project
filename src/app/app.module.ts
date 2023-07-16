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




const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'add_order', component: AddOrderComponent, canActivate: [AuthGuard] },
  { path: 'pickin_products', component: PickinProductComponent, canActivate: [AuthGuard] },
  { path: 'total_item', component: TotalProductComponent, canActivate: [AuthGuard] },
  { path: 'report_sell', component: ReportSellComponent, canActivate: [AuthGuard] },
  { path: 'dbt', component: CustomerDebtComponent, canActivate: [AuthGuard] },
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
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

