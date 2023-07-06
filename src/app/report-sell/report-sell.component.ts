import { Component } from '@angular/core';
import { ExportService } from '../export.service';
import { ColumName } from '../models/ExportService/TradingSummary.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-sell',
  templateUrl: './report-sell.component.html',
  styleUrls: ['./report-sell.component.css'],
})
export class ReportSellComponent {
  currentDate: string;
  dataReport:any[];

  constructor(private exportService: ExportService,private http:HttpClient) {
    const date = new Date();
    this.currentDate = this.formatDate(date);
    this.featDatareport()
    this.dataReport = [];
  }

  exportDataToExcel(): void {
    const fileName = `trading_summary_${this.currentDate}`;
    const data: ColumName[] = this.dataReport.map((Report, index) => ({
      order_id: Report.order_id,
  customer_name: Report.cus_name,
  date: Report.order_date,
  product_name: Report.prd_name,
  price: Report.order_sum,
  state: Report.state_name,
  officer: Report.user_name,
    }));
  
    this.exportService.exportToExcel(data, fileName);
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
  }
  featDatareport(){
    this.http.get<any[]>('http://localhost/backend/select_for_export_report.php')
      .subscribe(response => {
        this.dataReport = response;
      });
  }
}
