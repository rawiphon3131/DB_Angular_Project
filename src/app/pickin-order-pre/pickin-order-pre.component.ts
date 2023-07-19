import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PopupOrderPreComponent } from '../popup-order-pre/popup-order-pre.component';
import { AddprdtotableComponent } from '../addprdtotable/addprdtotable.component';

@Component({
  selector: 'app-pickin-order-pre',
  templateUrl: './pickin-order-pre.component.html',
  styleUrls: ['./pickin-order-pre.component.css'],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService,MessageService],
})
export class PickinOrderPreComponent implements OnInit {
  userId: string | null = null;
  selectedProducts: any[] = [];
  selectProdus: any[] = [];
  constructor(private http: HttpClient,private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig,private messageService: MessageService,private router:Router,public ref: DynamicDialogRef) {
    this.userId = sessionStorage.getItem('user_id');
  }
ngOnInit(): void {
  
}
openDialog(){
  const ref = this.dialogService.open(PopupOrderPreComponent, {
    header: 'รายการใบสั่งซื้อ',
    width: '70%',
  });
  ref.onClose.subscribe((order: any) => {
    if (order) {
      this.selectedProducts.push(order);
    }
  });
}
addpdForpick(ordp_id:number,cpn_name:string){
  console.log(ordp_id,cpn_name);
  const data = { ordp_id: ordp_id,cpn_name:cpn_name};
    this.http.post('http://localhost/backend/add_prepd.php', data).subscribe(
      (response) => {
        const orderDetails = Array.isArray(response) ? response : [response];
        const ref = this.dialogService.open(AddprdtotableComponent, {
          header: 'รายระเอียดรายการสั่งซื้อ',
          width: '70%',
          data: {orderDetails }
        });
        ref.onClose.subscribe((orderDetail: any) => {
          if (orderDetail) {
            this.selectProdus.push(orderDetail);
          }
        });
        console.log(response);
      
      });
        
}
savePic(){
  const data = {
    selectedProducts: this.selectedProducts,
    selectProdus: this.selectProdus
    // Add any other properties you want to send
  };
  const url = 'http://localhost/backend/pick_in.php';
  console.log(data);
  this.http.post(url, data).subscribe(
    (response: any) => {
      console.log(response);
      this.messageService.add({ severity: 'info', summary: 'บันทึก', detail: 'บันทึกเสร็จสิ้น' });
              const timeout = 2000;
              setTimeout(() => {
                this.router.navigate(['hpc']);
              }, timeout);
    });
  // const dataArray = [];
  //   for (const orderr of this.selectProdus) {
  //     const { prd_id, prd_sell, inputValue,prdp_id,cpn_name } = orderr;

  //     const data = {
  //       prd_id,
  //       prdp_id,
  //       prd_sell,
  //       cpn_name,
  //       product_values: inputValue,
  //       userId: this.userId,
  //     };
  //     dataArray.push(data);

  //   }
  //   console.log(dataArray);
}
deleteOrder(order: any) {
  // Implement your delete logic here
  // For example, you can remove the order from the selectProdus array
  const index = this.selectProdus.indexOf(order);
  if (index !== -1) {
      this.selectProdus.splice(index, 1);
  }
}
}
