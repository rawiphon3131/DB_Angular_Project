import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickin-product',
  templateUrl: './pickin-product.component.html',
  styleUrls: ['./pickin-product.component.css']
})
export class PickinProductComponent implements OnInit{
  showAddOrderPopup: boolean = false;
  showAddnamePDPopup:boolean = false;
  // Your table data and other variables
  products: any[] = [];

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
    this.fetchProducts();
  }
  fetchProducts() {
    this.http.get<any[]>('http://localhost/backend/showdata_pickin.php')
      .subscribe(response => {
        this.products = response;
      });
  }
  openAddOrderPopup() {
    this.showAddOrderPopup = true;
  }
 
  showDetails(prdId: string) {
    console.log('Selected Product ID:', prdId);
    // You can perform further actions based on the selected product ID
  }
  openAddNamePd() {
    this.showAddnamePDPopup = true;
  }
}
