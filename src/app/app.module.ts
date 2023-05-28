import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PickinProductComponent } from './pickin-product/pickin-product.component';
import { TotalProductComponent } from './total-product/total-product.component';
import { ReportSellComponent } from './report-sell/report-sell.component'; // CLI imports router
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add_order', component: AddOrderComponent },
  { path: 'pickin_products', component: PickinProductComponent },
  { path: 'total_item', component: TotalProductComponent },
  { path: 'report_sell', component: ReportSellComponent },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
