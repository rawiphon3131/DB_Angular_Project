import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';


@Component({
  templateUrl: './popup-pickin.component.html',
  styleUrls: ['./popup-pickin.component.css']
})
export class PopupPickinComponent implements OnInit {
  displayDialog: boolean = false;
  where: string = '';
  value: string = '';
  date!: number;
  prdId: string ='';
  cpnNa:any[];
  selectedOption:string='';
  userId: string | null = null;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,private http:HttpClient) {
this.cpnNa = [];
this.userId = sessionStorage.getItem('user_id');
  }

  ngOnInit() {
    this.prdId = this.config.data.prd_id;
    this.fetchProductotal();
  }

  saveData() {
    // Save the data and pass it back to the parent component
    const data = {
      prd_id: this.prdId,
      userId:this.userId,
      date: this.date,
      value: this.value,
      where: this.selectedOption,
 
    };
    const url = 'http://localhost/backend/pickin_pd_old.php';
    this.http.post(url, data).subscribe(
      (response: any) => {
        console.log(response);
      });
console.log(data);
  }

  closeDialog() {
    this.ref.close();
  }
  fetchProductotal() {
    this.http.get<any[]>('http://localhost/backend/select_cpn.php')
      .subscribe(response => {
        this.cpnNa = response;
      });
  }
}
