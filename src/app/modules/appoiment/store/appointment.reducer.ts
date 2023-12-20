import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/contracts';
import { AppointmentData } from '../common/models';
import * as fromActions from './appointment.actions';

export const featureKey = 'appointment';

export type State = IState<AppointmentData>;

const initialState: IState<AppointmentData> = {
  hasError: false,
  errorMessage: null,
  data: [],
  isLoading: false,
  succeeded: false
};

export const appointmentReducer: ActionReducer<State> = createReducer(
  initialState,
  on(fromActions.getAppointmentsData, (state): State => ({
    ...state,
    isLoading: true,
  })),
  on(fromActions.getAppointmentsDataSuccess, (state, { appointment }): State => ({
    ...state,
    isLoading: false,
    succeeded: true,
    hasError: false,
    errorMessage: null,
    data: [...appointment],
  })),
  on(fromActions.failure, (state, { errors }): State => ({
    ...state,
    isLoading: false,
    succeeded: false,
    hasError: true,
    errorMessage: errors,
  }))
);

export const reducer = (state: State | undefined, action: Action) => appointmentReducer(state, action);
