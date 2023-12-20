import { Injectable, inject } from '@angular/core';
import { UtilsHelper } from 'src/app/shared/helpers';
import { ObjectKeys } from 'src/app/shared/models';
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
      { prop: 'id', name: '#Cita' },
      { prop: 'email', name: 'Correo electrónico' },
      { prop: 'phoneNumber', name: 'Télefono' },
      { prop: 'date', name: 'Fecha', displayFormat: 'dd MMM yyyy' },
    ] as ObjectKeys
  };

  getAppointmentsData(): void {
    this.#utilsHelper.presentLoading().then(() => {
      this.state.getAppointmentsData();
    });
  }
}
