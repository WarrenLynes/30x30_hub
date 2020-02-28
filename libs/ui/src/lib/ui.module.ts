import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from '@hub/material';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [NotFoundComponent, ListComponent, FormComponent, DetailComponent],
  exports: [NotFoundComponent, ListComponent, FormComponent, DetailComponent]
})
export class UiModule {}
