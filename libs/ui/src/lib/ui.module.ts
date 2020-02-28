import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from '@hub/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [NotFoundComponent, ListComponent, FormComponent],
  exports: [NotFoundComponent, ListComponent, FormComponent]
})
export class UiModule {}
