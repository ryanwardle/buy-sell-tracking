import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ListService {

  items = [];

  addItem(item) {
    this.items.push(item);
    console.log(this.items);
    return this.items;
  }
}
