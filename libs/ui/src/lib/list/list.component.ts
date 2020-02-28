import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hub-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() data;
  @Input() selected;
  @Output() selectItem = new EventEmitter();
}
