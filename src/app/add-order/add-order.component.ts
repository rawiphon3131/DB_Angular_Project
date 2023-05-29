import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
  showPopup: boolean = false;

  handleOrderSubmitted(order: any): void {
    // Perform the necessary actions with the submitted order
    console.log('Submitted Order:', order);

    // Close the pop-up
    this.showPopup = false;
  }

  handlePopupCancelled(): void {
    // Handle the cancellation of the pop-up
    console.log('Pop-up Cancelled');

    // Close the pop-up
    this.showPopup = false;
  }
}
