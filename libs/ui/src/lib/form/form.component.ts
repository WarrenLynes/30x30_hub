import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Repo } from '@hub/core-data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'hub-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {

  form: FormGroup;

  @Input() selected: Repo;
  @Output() cancel = new EventEmitter();
  @Output() saveForm = new EventEmitter();
  @Output() deleteSelected = new EventEmitter();

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selected) {
      this.buildForm();
    }
  }


  onSubmit() {
    if(this.form.valid) {
      this.saveForm.emit({...this.selected, ...this.form.value});
    }
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.selected.name)
    });
  }
}
