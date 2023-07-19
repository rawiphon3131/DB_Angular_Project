import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { EditCusinfoComponent } from '../edit-cusinfo/edit-cusinfo.component';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
  providers: [ConfirmationService, MessageService,DynamicDialogRef,DynamicDialogConfig,DialogService]
})
export class CustomerInfoComponent implements OnInit {
  visible2: boolean = false;
  name_cus_new: string = '';
  credit_new: string = '';
  address_cus_new: string = '';
  phone_cus_new: string = '';
  cusList: any;
  orderNumberFilter!: string;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private http: HttpClient, private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig) {

  }
  filterOrders(): any[] {
    if (this.orderNumberFilter) {
      return this.cusList.filter((cus: { cus_name: string; }) =>
        cus.cus_name.toLowerCase().includes(this.orderNumberFilter.toLowerCase())
      );
    } else {
      return this.cusList;
    }
  }
  ngOnInit(): void {
    this.loadCus();

  }
  editCusdetail(cus_id: number) {
    console.log(cus_id);
    const data = { cus_id: cus_id};
    this.http.post('http://localhost/backend/select_cus_foredit.php', data).subscribe(
      (response) => {
        console.log(response);
        const cusDetail = Array.isArray(response) ? response : [response];
        const ref = this.dialogService.open(EditCusinfoComponent, {
          header: 'แก้ไขรายละเอียดลูกค้า',
          width: '70%',
          data: {cusDetail }
      });
  })
}
  showDialog2() {
    this.visible2 = true;
  }
  send_data_succ(event: Event) {
    if (this.name_cus_new === '' || this.address_cus_new === '' || this.phone_cus_new == '' || this.credit_new == '') {
      this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    } else {


      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'คุณต้องการเพิ่มชื่อลูกค้าหรือไม่',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const data = { name_cus_new: this.name_cus_new, address_cus_new: this.address_cus_new, phone_cus_new: this.phone_cus_new, credit_new: this.credit_new };
          this.http.post('http://localhost/backend/add_new_cus.php', data).subscribe(
            (response: any) => {
              console.log(response);
            });
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'เพิ่มรายชื่อลูกค้าเสร็จสมบูรณ์' });
          const timeout = 2000;
          setTimeout(() => {
            location.reload();
          }, timeout);

        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancle', detail: 'ยกเลิกการเพิ่มชื่อลูกค้า' });
        }
      });

    }
  }

  loadCus() {
    this.http.get<any[]>('http://localhost/backend/select_customer.php')
      .subscribe(response => {
        this.cusList = response;
      });
  }
}
