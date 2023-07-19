import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css'],
  providers:[ConfirmationService,MessageService,DynamicDialogRef,DynamicDialogConfig,DialogService]
})
export class ProductStockComponent implements OnInit{
  stock:any;
  name_product:string ='';
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
editProduct(prd_id:number){
  console.log(prd_id);
  const data = { prd_id: prd_id};
    this.http.post('http://localhost/backend/edit_prd.php', data).subscribe(
      (response) => {
        console.log(response);
        const prdDet = Array.isArray(response) ? response : [response];
        const ref = this.dialogService.open(EditProductComponent, {
          header: 'แก้ไขรายละเอียดสินค้า',
          width: '70%',
          height:'auto',
          data: {prdDet }
        });
      });

}
delPrd(prd_id:number){
  console.log(prd_id);
  const data = {prd_id};
  const url = 'http://localhost/backend/del_prd.php';
  this.http.post(url,data).subscribe(
    response => {
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'ลบสินค้าเสร็จสิ้น', detail: 'กำลังรีเฟส' });
      const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
    }
  );
}
showDialog(){
  this.visible = true;
}
saveProduct_new(){
  const data = {
    id_product:this.id_product,
    name_product:this.name_product,
    size:this.selectedOptionSize,
    type:this.selectedOption,
    type_prd:this.selectedTyped,
    values:this.prd_values,
    price_in:this.prd_sell_in,
    price_sell:this.prd_sell_out,
  };
  const url = 'http://localhost/backend/add_new_pd.php';
  this.http.post(url,data).subscribe(
    response =>{
      console.log(response);
      if(response == 'COMPLEAT'){
        this.messageService.add({ severity: 'success', summary: 'เพิ่มสินค้าเสร็จสิ้น', detail: 'กำลังรีเฟส' });
        const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
      }
      if(response == 'YANG MAI DAI NA'){
        this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'มีข้อมูลนี้อยู่แล้ว' });
      }
    }
  );
  console.log(data);
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
