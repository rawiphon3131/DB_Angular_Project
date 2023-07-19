import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { EditSizeComponent } from '../edit-size/edit-size.component';
@Component({
  selector: 'app-in-fosize',
  templateUrl: './in-fosize.component.html',
  styleUrls: ['./in-fosize.component.css'],
  providers:[ConfirmationService,MessageService,DynamicDialogRef,DynamicDialogConfig,DialogService]
})
export class InFosizeComponent implements OnInit {
  sizeLoad: any;
  visible: boolean = false;
  size_name_new!: string;
  orderNumberFilter!: string;
  constructor(private http: HttpClient,private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig,private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.loadSize();
  }
  filterOrders(): any[] {
    if (this.orderNumberFilter) {
      return this.sizeLoad.filter((size: { size_name: string; }) =>
      size.size_name.toLowerCase().includes(this.orderNumberFilter.toLowerCase())
      );
    } else {
      return this.sizeLoad;
    }
  }
  editSize(size_id:number){
    console.log(size_id);
    const data = { size_id: size_id};
    this.http.post('http://localhost/backend/select_edit_size.php', data).subscribe(
      (response) => {
        console.log(response);
        const sizeDetail = Array.isArray(response) ? response : [response];
        const ref = this.dialogService.open(EditSizeComponent, {
          header: 'แก้ไขไซต์',
          width: 'auto',
          height:'auto',
          data: {sizeDetail }
        });
      });

  }
  showDialog() {
    this.visible = true;
  }
  saveSize() {
    const data = {size_name_new:this.size_name_new};
    const url = 'http://localhost/backend/save_size.php';
    this.http.post(url, data).subscribe(
    (response: any) => {
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'แก้ไขเสร็จสิ้น' });
        const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
    });
    
  }
  delSize(size_id:number){
    console.log(size_id);
    const data = {size_id};
    const url = 'http://localhost/backend/delSize.php';
    this.http.post(url, data).subscribe(
      (response: any) => {
        console.log(response);
        if(response == 'COMPLEAT'){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ลบเสร็จสิ้น' });
          const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
        }
        if(response == 'ERROR'){
          this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'ไซส์นี้มีการใช้งานอยู่' });
        }
         
      });
  }
  loadSize() {
    this.http.get<any[]>('http://localhost/backend/select_size.php')
      .subscribe(response => {
        this.sizeLoad = response;
      });
  }
}
