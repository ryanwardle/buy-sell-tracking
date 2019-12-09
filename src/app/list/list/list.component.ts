import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  form: FormGroup;
  items = [];
  calculatedAmount: string;
  calculatedTotal = 0;

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
    if ( soldPrice.toString() === '') {
      this.calculatedAmount = `This item has not yet sold.`;
      return 'accent';
    }
    const amount = Math.abs(soldPrice - price);
    if (price <= soldPrice) {
      this.calculatedTotal += amount;
      this.calculatedAmount = `This transaction earned you $${amount}`;
      return 'primary';
    } else {
      this.calculatedTotal -= amount;
      this.calculatedAmount = `This transaction was a total loss of $${amount}`;
      return price < soldPrice ? 'primary' : 'warn';
    }
  }

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

