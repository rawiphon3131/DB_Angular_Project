import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css'],
  providers: [ConfirmationService, MessageService, DynamicDialogRef, DynamicDialogConfig, DialogService]
})
export class CompanyCreateComponent implements OnInit {
  addMarketp: boolean = false;
  cpn_numtel!: string;
  cpn_address!: string;
  name_market: string = '';
  visible:boolean = false;
  cpnNa:any;
  addMarket() {
    this.addMarketp = true;
  }
  constructor(private http: HttpClient, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig) 
  {

  }
  ngOnInit(): void {
    this.fetchProductotal();
  }
  editCpn(cpn_id:number){
    console.log(cpn_id);
    const data = { cpn_id: cpn_id};
    this.http.post('http://localhost/backend/select_cpn.php', data).subscribe(
      (response) => {
        const cpnDetail = Array.isArray(response) ? response : [response];
        const ref = this.dialogService.open(EditCompanyComponent, {
          header: 'รายระเอียดรายการสั่งซื้อ',
          width: '70%',
          data: {cpnDetail }
        });
        console.log(response);
      
      });
  }
  deleteCpn(cpn_id:number){
    console.log(cpn_id);
    const data ={cpn_id};
    const url = 'http://localhost/backend/delete_cpn.php';
    this.http.post(url, data).subscribe(
      (response: any) => {
        console.log(response);
        this.messageService.add({ severity: 'info', summary: 'ลบ', detail: 'ลบเสร็จสิ้น' });
        const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
      });
  }
  AddCpn(event: Event) {
    if (this.name_market == '' || this.cpn_numtel == '' || this.cpn_address == '') {
      console.log('ERROR');
    } else {

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'ต้องการบันทึกใช่หรือไม่?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const url = 'http://localhost/backend/add_cpn_new.php';
          const data = { name_market: this.name_market, cpn_numtel: this.cpn_numtel, cpn_address: this.cpn_address };
          console.log(this.name_market, this.cpn_numtel, this.cpn_address);

          this.http.post(url, data).subscribe(
            (response: any) => {
              console.log(response);
              this.messageService.add({ severity: 'info', summary: 'บันทึก', detail: 'บันทึกเสร็จสิ้น' });
              const timeout = 2000;
              setTimeout(() => {
                location.reload();
              }, timeout);
            }, (error) => {

              console.log(error);
              this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณาตรวจสอบข้อมูล' });
            });

        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'ยกเลิก', detail: 'ยกเลิกเสร็จสิ้น' });
        }
      });





    }
  }
  fetchProductotal() {
    this.http.get<any[]>('http://localhost/backend/select_cpn_show.php')
      .subscribe(response => {
        this.cpnNa = response;
      });
  }
}
