import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListService } from '../list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  form: FormGroup;

  constructor(private listService: ListService,
              private router: Router) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      date: new FormControl(null),
      description: new FormControl(null),
      cost: new FormControl(null),
      retail: new FormControl(null),
      soldDate: new FormControl(''),
      soldPrice: new FormControl('')
    });
  }

  onSubmitItem(form: FormGroup) {

    this.form = new FormGroup({
      date: new FormControl(this.form.controls.date.value),
      description: new FormControl(this.form.controls.description.value),
      cost: new FormControl(this.form.controls.cost.value),
      retail: new FormControl(this.form.controls.retail.value),
      soldDate: new FormControl(this.form.controls.soldDate.value),
      soldPrice: new FormControl(this.form.controls.soldPrice.value)
    });

    console.log(this.form.value);

    this.listService.addItem(this.form.value);
    this.form.reset();
    this.router.navigate(['/item-list']);
  }

}

