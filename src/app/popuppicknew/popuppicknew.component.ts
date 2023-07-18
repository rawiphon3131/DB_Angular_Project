import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popuppicknew',
  templateUrl: './popuppicknew.component.html',
  styleUrls: ['./popuppicknew.component.css']
})
export class PopuppicknewComponent implements OnInit {
  displayDialog: boolean = false;
  where: string = '';
  value: string = '';
  date!: number;
  prdId: string = '';
  price!: string;
  cpnNa: any[];
  userId: string | null = null;
  selectedOption: string = '';
  price_sell!:string;
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private http: HttpClient) {
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
      price: this.price,
      date: this.date,
      value: this.value,
      where: this.selectedOption,
      userId:this.userId,
      price_sell:this.price_sell,
    };
    const url = 'http://localhost/backend/pickin_pd_new.php';
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
