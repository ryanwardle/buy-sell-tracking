import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  form: FormGroup;

  constructor(private listService: ListService) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      date: new FormControl(null),
      description: new FormControl(null),
      cost: new FormControl(null),
      retail: new FormControl(null),
      soldDate: new FormControl(null),
      soldPrice: new FormControl(null)
    });
  }

  onSubmitItem(form: FormGroup) {
    this.form = new FormGroup({
      date: new FormControl(this.form.controls.date.value),
      description: new FormControl(this.form.controls.description.value),
      cost: new FormControl(this.form.controls.cost.value),
      retail: new FormControl(this.form.controls.retail.value)
    });

    console.log(this.form.value);

    this.listService.addItem(this.form.value);
    this.form.reset();
  }

}

