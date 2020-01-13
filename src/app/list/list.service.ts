import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item.model';
// import { Subject } from 'rxjs';
// import { environment } from '../../environments/environment';

// const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class ListService {

  items: Item[] = [];
  totalSpent = 0;
  // private listChanged = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  getItems() {
    // this.http.get('http://localhost:4000/').subscribe((items: Item[]) => {
    //   this.items = items;
    //   // this.listChanged.next([...items]);
    //   console.log(this.items);
    // });
    // return this.items;
    return this.http.get('http://localhost:4000/');
  }

  getItem(itemId: string) {
    return this.http.get('http://localhost:4000/' + itemId);
  }


// Should make call and return http request like other routes
  addItem(item: Item) {
    this.http.post('http://localhost:4000/add-item', item).subscribe(res => {
      console.log(res);
    });
    // Use unshift to display in order, push would put them in reverse order
    this.items.unshift(item);
    return this.items;
  }

  deleteItem(itemId: string) {
    const deleteHeaders = new HttpHeaders({
      itemId
    });
    return this.http.delete<Item[]>('http://localhost:4000/', {headers: deleteHeaders});
  }

  // getListUpdateListener() {
  //   return this.listChanged.asObservable();
  // }
}
