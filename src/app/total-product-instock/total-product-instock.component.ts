import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-total-product-instock',
  templateUrl: './total-product-instock.component.html',
  styleUrls: ['./total-product-instock.component.css']
})
export class TotalProductINstockComponent implements OnInit {
  stock:any;
  orderNumberFilter!: string;
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.loadStock();
  }
  loadStock(){
    this.http.get<any[]>('http://localhost/backend/total_all_prd.php')
      .subscribe(response => {
        this.stock = response;
      });
  }
  filterOrders(): any[] {
    if (this.orderNumberFilter) {
      return this.stock.filter((prd: { prd_name: string; }) =>
      prd.prd_name.toLowerCase().includes(this.orderNumberFilter.toLowerCase())
      );
    } else {
      return this.stock;
    }
  }
  }

