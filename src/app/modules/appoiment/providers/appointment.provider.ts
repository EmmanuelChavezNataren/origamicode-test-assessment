import { Injectable, inject } from '@angular/core';
import { UtilsHelper } from 'src/app/shared/helpers';
import { ObjectKeySorts, ObjectKeys } from 'src/app/shared/models';
import { AppointmentFacade } from '../facades';

@Injectable()
export class AppointmentProvider {
  #facade = inject(AppointmentFacade);
  #utilsHelper = inject(UtilsHelper);

  get state(): AppointmentFacade {
    return this.#facade;
  }

  get tableColumns(): ObjectKeys {
    return [
      { prop: 'id', name: '#Cita', flexGrow: 1.5 },
      { prop: 'email', name: 'Correo electrónico', flexGrow: 3 },
      { prop: 'phoneNumber', name: 'Télefono', flexGrow: 2 },
      { prop: 'date', name: 'Fecha', displayFormat: 'dd MMM yyyy', flexGrow: 2 },
    ] as ObjectKeys
  };

  get tableSortsById(): ObjectKeySorts {
    return [
      { prop: 'id', dir: 'asc' },
    ] as ObjectKeySorts
  };

  get tableSortsByDate(): ObjectKeySorts {
    return [
      { prop: 'date', dir: 'asc' },
    ] as ObjectKeySorts
  };

  getAppointmentsData(): void {
    this.#utilsHelper.presentLoading().then(() => {
      this.state.getAppointmentsData();
    });
  }
}
