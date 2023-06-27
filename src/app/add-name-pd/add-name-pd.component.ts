import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Product {
  name: string;
  size: string;
  type_prd_name: string;
  type_name:string;
  where:string;
  value_new:string;
  price_in:string;
  price_sell:string;
  userId:any;
}

@Component({
  selector: 'app-add-name-pd',
  templateUrl: './add-name-pd.component.html',
  styleUrls: ['./add-name-pd.component.css']
})

export class AddNamePdComponent implements OnInit {
  name_new_pd!: string;
  size_name_new!: string;
  where_pick_pd!:string;
  value_new!:string;
  selectedOption!: string;
  type_name!: string;
  price_in!:string;
  price_sell!:string;

  products: Product[] = [];
  type_prd:any[];
  typeoption:any[];

  userId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.type_prd=[];
    this.typeoption=[];
    this.userId = sessionStorage.getItem('user_id');
  }

  ngOnInit() {
    this.fetchProductotal();
    this.fetchType();


  }
  add_new_products() {
    if (this.name_new_pd && this.size_name_new) {
      const product: Product = {
        name: this.name_new_pd,
        size: this.size_name_new,
        type_prd_name: this.selectedOption,
        type_name:this.type_name,
        where: this.where_pick_pd,
        value_new: this.value_new,
        price_in:this.price_in,
        price_sell:this.price_sell,
        userId: this.userId
      };

      // Store the product in the products array
      this.products.push(product);

      // Reset the input fields
      this.name_new_pd = '';
      this.size_name_new = '';
      this.selectedOption = '';
      this.where_pick_pd= '';
      this.value_new ='';
      this.price_in='';
      this.price_sell='';
      
    }
  }
  send_data() {
    if (this.products.length > 0) {
      this.http.post('http://localhost/backend/add_new_pd.php', this.products ,{ responseType: 'text' })
        .subscribe(response => {
          console.log(response);
          // Handle the response from the PHP backend as needed
          alert('Success! Response: ');
        });
    } else {
      console.log('No products to send');
    }
  }

  fetchProductotal(){
    this.http.get<any[]>('http://localhost/backend/select_option.php')
    .subscribe(response => {
      this.type_prd = response;
    });
  }
  fetchType(){
    this.http.get<any[]>('http://localhost/backend/select_type.php')
    .subscribe(response => {
      this.typeoption = response;
    });
  }
}
