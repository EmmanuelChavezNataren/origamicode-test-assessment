import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppointmentFacade } from './facades';
import { AppointmentProvider } from './providers';
import { AppointmentRepository } from './repositories';
import { AppointmentEffects } from './store/appointment.effects';

import * as fromReducer from './store/appointment.reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    EffectsModule.forFeature([AppointmentEffects]),
  ],
  providers: [
    AppointmentRepository,
    AppointmentProvider,
    AppointmentFacade
  ]
})
export class AppointmentCoreModule { }
