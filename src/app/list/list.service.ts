import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ListService {

  items = [];
  totalSpent = 0;

  getItems() {
    return this.items;
  }

  addItem(item) {
    // Use unshift to display in order, push would put them in reverse order
    this.items.unshift(item);
    return this.items;
  }
}
