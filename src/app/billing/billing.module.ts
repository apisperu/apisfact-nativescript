import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ListComponent } from './views/list/list.component';
import { BillingRoutingModule } from './billing-routing.module';
import { TicketComponent } from './views/ticket/ticket.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    BillingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
  ],
  declarations: [ListComponent, TicketComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BillingModule {}