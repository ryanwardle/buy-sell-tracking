import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  form: FormGroup;
  items = [];
  calculatedAmount: string;
  calculatedTotal = 0;
  totalSpent = 0;
  averageEarned = 0;
  transactions = 0;

  constructor(private listService: ListService) {

  }

  ngOnInit() {
    this.items = this.listService.getItems();
    console.log(this.items);

    // this.form = new FormGroup({
    //   date: new FormControl(null),
    //   description: new FormControl(null),
    //   cost: new FormControl(null),
    //   retail: new FormControl(null),
    //   soldDate: new FormControl(null),
    //   soldPrice: new FormControl(null)
    // });
  }

  getColor(price: number, soldPrice: number) {

    // Checks if item has been sold (has a sold price)
    if ( soldPrice.toString() === '') {
      this.calculatedAmount = `This item has not yet sold.`;
      return 'accent';
    }

// This information is seperate from getting the color, and is causing the error, should
// I put this into its own function and call it here?
// TODO:
// run code with this and the related html code and see if I still get the error
// think of a different way to keep track of the totals
    this.totalSpent += +price;
    const amount = soldPrice - price;
    console.log('Why does this run twice?');
    console.log(this.totalSpent);
    this.calculatedTotal += amount;
    this.transactions = this.items.length;
    this.averageEarned = +(this.calculatedTotal / this.transactions).toFixed(2);

    // Checks if item was sold for a loss or a gain
    if (amount >= 0) {
      this.calculatedAmount = `This transaction earned you $${amount}`;
      return 'primary';

    } else {
      this.calculatedAmount = `This transaction was a total loss of $${Math.abs(amount)}`;
      return 'warn';
    }
  }

  checkTotalLossOrGain() {
    return this.calculatedTotal >= 0 ? 'primary' : 'warn';
  }

  // setInfoParagraph(price, soldPrice) {
  //   this.totalSpent += price;
  //
  //   const amount = soldPrice - price;
  //   this.calculatedTotal += amount;
  //   this.transactions = this.items.length;
  //   this.averageEarned = this.calculatedTotal / this.transactions;
  // }

  // onSaveItem(form: FormGroup) {
  //   this.form = new FormGroup({
  //     date: new FormControl(this.form.controls.date.value),
  //     description: new FormControl(this.form.controls.description.value),
  //     cost: new FormControl(this.form.controls.cost.value),
  //     retail: new FormControl(this.form.controls.retail.value),
  //     soldDate: new FormControl(this.form.controls.soldDate.value),
  //     soldPrice: new FormControl(this.form.controls.soldPrice.value)
  //   });

  //   console.log(this.form.value);

  //   this.listService.addItem(this.form.value);
  //   this.form.reset();
  // }

}
