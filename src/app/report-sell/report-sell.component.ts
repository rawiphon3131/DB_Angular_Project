import { Component } from '@angular/core';
import { ExportService } from '../export.service';
import { ColumName } from '../models/ExportService/TradingSummary.model';

@Component({
  selector: 'app-report-sell',
  templateUrl: './report-sell.component.html',
  styleUrls: ['./report-sell.component.css'],
})
export class ReportSellComponent {
  currentDate: string;

  constructor(private exportService: ExportService) {
    const date = new Date();
    this.currentDate = this.formatDate(date);
  }

  exportDataToExcel(): void {
    const fileName = `trading_summary_${this.currentDate}`;
    const data: ColumName[] = [
      {
        No: '1',
        Name: '2',
        Quantity: '3',
        Price: ' 4',
        Total_Price: '5',
        Total_Cost: '6',
        Net_Profit: '7',
      },
    ];

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
}
