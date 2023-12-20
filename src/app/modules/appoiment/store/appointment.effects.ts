import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SnackbarHelper, UtilsHelper } from 'src/app/shared/helpers';
import { environment } from 'src/environments/environment';
import { AppointmentRepository } from '../repositories';
import * as fromActions from './appointment.actions';


@Injectable()
export class AppointmentEffects {

  getAllAppointmentData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.AppointmentActionTypes.GET_APPOIMENTS_DATA),
    switchMap(() => {
      if (environment.useLocalStorage) {
        return from(this.appointmentRepo.getStoredAppointments()).pipe(
          switchMap((storedData) => {
            if (storedData && storedData.length) {
              this.utilsHelper.dismissLoading();
              return of(fromActions.getAppointmentsDataSuccess({ appointment: storedData }));
            }
            return this.appointmentRepo.loadPreloadedAppointment().pipe(
              map((preloadAppointmentsData) => {
                this.utilsHelper.dismissLoading();
                this.appointmentRepo.saveAppointmentData(preloadAppointmentsData);
                return fromActions.getAppointmentsDataSuccess({ appointment: preloadAppointmentsData });
              }),
              catchError(({ error }: any) => {
                this.utilsHelper.dismissLoading();
                this.snackbar.failure({ message: error });
                return of(fromActions.failure({ errors: error }));
              }));
          })
        );
      }
      return this.appointmentRepo.getAppointmentsData().pipe(
        map((appointment) => {
          this.utilsHelper.dismissLoading();
          return fromActions.getAppointmentsDataSuccess({ appointment });
        }),
        catchError(({ error }: any) => {
          this.utilsHelper.dismissLoading();
          this.snackbar.failure({ message: error });
          return of(fromActions.failure({ errors: error }));
        }))
    })
  ));

  constructor(
    private actions$: Actions,
    private appointmentRepo: AppointmentRepository,
    private snackbar: SnackbarHelper,
    private utilsHelper: UtilsHelper,
  ) {
  }
}
