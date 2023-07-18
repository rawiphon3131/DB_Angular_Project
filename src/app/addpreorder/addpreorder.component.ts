import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpreorder',
  templateUrl: './addpreorder.component.html',
  styleUrls: ['./addpreorder.component.css'],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService,MessageService],
})
export class AddpreorderComponent implements OnInit{
  selectedProducts: any[] = [];
  totalSum: number = 0;
  bill_no:string='';
  bill_where:string='';
  bill_date:Date|undefined;
  userId: string | null = null;
  selectedCompanyId: any;
  cpnNa:any;
  constructor(private http: HttpClient,private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig,private messageService: MessageService,private router:Router) {
    this.userId = sessionStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.fetchProductotal();
  }

  openDialog() {
    const ref = this.dialogService.open(ProductPopupComponent, {
      header: 'Product Popup',
      width: '70%',
      data: { products: this.selectedProducts }
    });

    ref.onClose.subscribe((product: any) => {
      if (product) {
        this.selectedProducts.push(product);
      }
    });
  }

  calculateTotalSum(): number {
    this.totalSum = this.selectedProducts.reduce((sum, product) => {
      return sum + (product.prd_sell * product.inputValue);
    }, 0);
    return this.totalSum;
  }
  saveOrderPre(){
    const dataArray = [];
    for (const product of this.selectedProducts) {
      const { prd_id, prd_sell, inputValue,prdp_id } = product;
      const size_name = product.size_name;
      const data = {
        prd_id,
        prdp_id,
        prd_sell,
        product_values: inputValue,
        size_name,
        userId: this.userId,
        totalSum:this.totalSum
        ,bill_no:this.bill_no,
        selectedValue: this.selectedCompanyId,
        bill_date:this.bill_date,
      };
      dataArray.push(data);

    }
    console.log(dataArray);
    this.http.post('http://localhost/backend/add_order_pre.php', dataArray).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'บันทึกคำสั่งซื้อเสร็จสิ้นกำลังพาไปหน้าสถานะการสั่งซื้อ' });
        const timeout = 2000;
        setTimeout(() => {
          this.router.navigate(['stateOrder']);
        }, timeout);
      },(error)=>{
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'เกิดข้อผิดพลาด' });
      });

  }
  fetchProductotal() {
    this.http.get<any[]>('http://localhost/backend/select_cpn_show.php')
      .subscribe(response => {
        this.cpnNa = response;
      });
  }
}
