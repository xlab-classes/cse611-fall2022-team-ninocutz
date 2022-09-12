import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerHomeComponent } from './customer-home/customer-home.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
