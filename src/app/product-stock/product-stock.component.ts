import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddNewstockPdComponent } from '../add-newstock-pd/add-newstock-pd.component';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css'],
  providers:[ConfirmationService,MessageService,DynamicDialogRef,DynamicDialogConfig,DialogService]
})
export class ProductStockComponent implements OnInit{
  stock:any;
  sizeLoad:any;
  type_prd:any;
  visible:boolean = false;
  id_product!:string;
  selectedOptionSize!:string;
  selectedOption!:string;
  selectedTyped!:string;
  typed:any;
  prd_values!:string;
  prd_sell_in!:string;
  prd_sell_out!:string;
  orderNumberFilter!: string;
  constructor(private http: HttpClient,private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig,private messageService: MessageService) {

  }
ngOnInit(): void {
  this.loadStock();
  this.fetchProductotal2();
  this.loadSize();
  this.loadType();
}
filterOrders(): any[] {
  if (this.orderNumberFilter) {
    return this.stock.filter((product: { prd_name: string; }) =>
    product.prd_name.toLowerCase().includes(this.orderNumberFilter.toLowerCase())
    );
  } else {
    return this.stock;
  }
}
showDialog(){
  this.visible = true;
}
loadStock(){
  this.http.get<any[]>('http://localhost/backend/total_poduct.php')
  .subscribe(response => {
    this.stock = response;
  });
}
loadSize(){
  this.http.get<any[]>('http://localhost/backend/select_size.php')
  .subscribe(response => {
    this.sizeLoad = response;
  });
}
fetchProductotal2() {
  this.http.get<any[]>('http://localhost/backend/select_option.php')
    .subscribe(response => {
      this.type_prd = response;
    });
}
loadType() {
  this.http.get<any[]>('http://localhost/backend/select_type.php')
    .subscribe(response => {
      this.typed = response;
    });
}
}
