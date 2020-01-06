import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { Subject } from 'rxjs';
// import { environment } from '../../environments/environment';

// const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class ListService {

  items: Item[] = [];
  totalSpent = 0;
  private listChanged = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  getItems() {
    this.http.get('http://localhost:4000/').subscribe((items: Item[]) => {
      this.items = items;
      // this.listChanged.next([...items]);
      console.log(this.items);
    });
    return this.items;
    // return this.http.get('http://localhost:4000/');
  }

  addItem(item: Item) {
    this.http.post('http://localhost:4000/add-item', item).subscribe(res => {
      console.log(res);
    });
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

  // getListUpdateListener() {
  //   return this.listChanged.asObservable();
  // }
}
