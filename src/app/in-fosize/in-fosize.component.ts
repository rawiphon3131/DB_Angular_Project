import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-in-fosize',
  templateUrl: './in-fosize.component.html',
  styleUrls: ['./in-fosize.component.css']
})
export class InFosizeComponent implements OnInit {
  sizeLoad: any;
  visible: boolean = false;
  size_name_new!: string;
  orderNumberFilter!: string;
  constructor(private http: HttpClient) { }
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
  showDialog() {
    this.visible = true;
  }
  saveSize() {
    const data = {size_name_new:this.size_name_new};
    const url = 'http://localhost/backend/save_size.php';
    this.http.post(url, data).subscribe(
    (response: any) => {
      console.log(response);
    });
    
  }
  loadSize() {
    this.http.get<any[]>('http://localhost/backend/select_size.php')
      .subscribe(response => {
        this.sizeLoad = response;
      });
  }
}
