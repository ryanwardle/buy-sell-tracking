import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ListService } from '../list.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  form: FormGroup;
  public items: Item[] = [];
  calculatedAmount: string;
  calculatedTotal = 0;
  totalSpent = 0;
  averageEarned = 0;
  transactions = 0;
  date: Date;
  dateString: string;
  soldDate: Date;
  soldString: string;

  constructor(private listService: ListService) {

  }

  ngOnInit() {
    this.listService.getItems().subscribe((res: Item[]) => {
      this.items = res;
        // Cycles through items
      this.items.map(item => {
        // get date and convert to string
              this.date = new Date(item.date);
              this.dateString =  `${this.date.getMonth() + 1}/${this.date.getDate()}/${this.date.getFullYear()}`;
        // get sold date and convert to string
              this.soldDate = new Date(item.soldDate);
              this.soldString = `${this.soldDate.getMonth() + 1}/${this.soldDate.getDate()}/${this.soldDate.getFullYear()}`;

              if (item.soldPrice) {
                // If item has sold price count it as a transaction
                this.transactions++;

                // Get the profit or loss and add it to the total
                const amount = item.soldPrice - item.cost;
                this.calculatedTotal += amount;
              } else {
                // If item has not sold, still subtract cost of item from loss/gain
                this.calculatedTotal -= item.cost;
              }

              // Add cost of item to total spent
              this.totalSpent += item.cost;
            });

        // Divide profit or loss of all sold items by number of completed transactions
      this.averageEarned = +(this.calculatedTotal / this.transactions).toFixed(2) || 0;

      if (this.averageEarned === -Infinity || isNaN(this.averageEarned)) {
              this.averageEarned = 0;
        }
    });
  }

  getColor(price: number, soldPrice: number) {

    // Checks if item has been sold (has a sold price)
    if ( soldPrice.toString() === '') {
      this.calculatedAmount = `This item has not yet sold.`;
      return 'accent';
    }
    const amount = soldPrice - price;

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

  onDeleteItem(item: Item) {
    // remove item and update list
    this.listService.deleteItem(item.id).subscribe(res => {
      this.items = res;
    });

    if (item.soldPrice) {
      // f item has sold remove transaction
      this.transactions--;
    }
    // remove amount gained or lost
    const amount = item.soldPrice - item.cost;
    this.calculatedTotal -= amount;

    // remove cost from total spent
    this.totalSpent -= +item.cost;

    // recalculate average
    this.averageEarned = +(this.calculatedTotal / this.transactions).toFixed(2) || 0;

    if (this.averageEarned === -Infinity || isNaN(this.averageEarned)) {
      this.averageEarned = 0;
    }
  }

}
