import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-debt',
  templateUrl: './customer-debt.component.html',
  styleUrls: ['./customer-debt.component.css']
})
export class CustomerDebtComponent implements OnInit{
  cusDbdt:any;
  constructor(private http: HttpClient){

  }


  ngOnInit(): void {
    this.fetchCustomerDbdt();
  }
  fetchCustomerDbdt() {
    this.http.get<any[]>('http://localhost/backend/select_obs.php')
      .subscribe(response => {
        this.cusDbdt = response;
      });
  }
}
