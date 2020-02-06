import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from '../item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  form: FormGroup;
  minDate: Date;
  private mode = 'create';

  constructor(private listService: ListService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(0)]),
      retail: new FormControl(null, Validators.required),
      soldDate: new FormControl(''),
      soldPrice: new FormControl('')
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.mode = 'edit';
        const itemId = paramMap.get('itemId');
        this.listService.getItem(itemId).subscribe((item: Item) => {
          this.form.setValue({
            date: item.date,
            description: item.description,
            cost: item.cost,
            retail: item.retail,
            soldDate: item.soldDate,
            soldPrice: item.soldPrice
          });
          console.log(item);
        });
      }
    });

  }

// NEED TO REPLACE ORIGINAL ITEM IN DOM, CURRENTLY DISPLAYING 2
// NEED TO WRITE 'PUT' ROUTE

  onSubmitItem() {

    if (this.form.invalid) {return; }

    this.form = new FormGroup({
      date: new FormControl(this.form.controls.date.value),
      description: new FormControl(this.form.controls.description.value),
      cost: new FormControl(this.form.controls.cost.value),
      retail: new FormControl(this.form.controls.retail.value),
      soldDate: new FormControl(this.form.controls.soldDate.value),
      soldPrice: new FormControl(this.form.controls.soldPrice.value)
    });

    if (this.mode === 'create') {
      // creates ID for new item
      const id = Math.round(Math.random() * 1000000000);
      this.form.value.id = id.toString();
      this.listService.addItem(this.form.value);
    } else {
      // Gets old ID if item is edited
      const id = this.route.snapshot.url[1].path;
      this.form.value.id = id.toString();
      this.listService.editItem(this.form.value);
    }

    this.form.reset();
    this.router.navigate(['/item-list']);
  }

  onSetSoldDate(event: Event) {
    const date = (event.target as HTMLInputElement).value.split('/');
    this.minDate = new Date(+date[2], +date[0] - 1, +date[1]);
  }

}
