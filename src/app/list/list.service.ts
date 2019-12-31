import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ListService {

  items: Item[] = [];
  totalSpent = 0;

  constructor(private http: HttpClient) {}

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.http.post('http://localhost:4200/add-item', item);
    // Use unshift to display in order, push would put them in reverse order
    this.items.unshift(item);
    return this.items;
  }

  deleteItem(itemId: number) {
    this.items = this.items.filter(item => {
      return item.id !== itemId;
    });
    return this.items;
  }
}
