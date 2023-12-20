import { createAction, props } from '@ngrx/store';
import { AppointmentData } from '../common/models';

export const enum AppointmentActionTypes {
  GET_APPOIMENTS_DATA = '[Appointment] Get all Appointments Data',
  GET_APPOIMENTS_DATA_SUCCES = '[Appointment] Get all Appointments Data Success',

  /** Global Types**/
  FAILURE = '[Appointment] Failure'
}

export const getAppointmentsData = createAction(AppointmentActionTypes.GET_APPOIMENTS_DATA);

export const getAppointmentsDataSuccess = createAction(
  AppointmentActionTypes.GET_APPOIMENTS_DATA_SUCCES,
  props<{ appointment: AppointmentData }>()
);

/** Global Actions**/
export const failure = createAction(
  AppointmentActionTypes.FAILURE,
  props<{ errors: string | any }>()
);
