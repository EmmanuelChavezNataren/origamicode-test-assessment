import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, filter } from "rxjs";
import { IFacade } from "src/app/shared/contracts";
import { AppointmentData } from "../common/models";

import * as fromActions from '../store/appointment.actions';
import * as fromSelectors from '../store/appointment.selectors';

@Injectable()
export class AppointmentFacade implements IFacade<AppointmentData, boolean> {
  readonly #store = inject(Store);

  get isLoading$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectIsLoading);
  }
  get succeeded$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectSucceeded);
  }
  get hasError$(): Observable<boolean> {
    return this.#store.select(fromSelectors.selectHasError);
  }
  get error$(): Observable<string> {
    return this.#store.select(fromSelectors.selectErrorMessage);
  }
  get data$(): Observable<AppointmentData> {
    return this.#store.select(fromSelectors.selectAppointmentsData).pipe(filter(x => !!x));
  }

  getAppointmentsData(): void {
    return this.#store.dispatch(fromActions.getAppointmentsData());
  }
}
