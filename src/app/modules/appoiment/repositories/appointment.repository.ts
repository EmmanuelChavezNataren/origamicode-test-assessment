import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IRepository } from 'src/app/shared/contracts';
import { StorageItems } from 'src/app/shared/enums';
import { StorageHelper } from 'src/app/shared/helpers';
import { environment } from 'src/environments/environment';
import { AppointmentData } from '../common/models';

@Injectable()
export class AppointmentRepository extends IRepository {
  readonly #storage = inject(StorageHelper);
  readonly #localAppointmentDataUrl = `${environment.apiUrl}/assets/res/appointment-data.json`;
  readonly #appointmentDataUrl = `${environment.apiUrl}/v1/appointment`;

  constructor() {
    super();
  }

  getAppointmentsData(): Observable<AppointmentData> {
    return this.httpGet<AppointmentData>(this.#appointmentDataUrl);
  }

  async getStoredAppointments(): Promise<AppointmentData> {
    return await this.#storage.getObject<AppointmentData>(StorageItems.Appointment);
  }

  loadPreloadedAppointment(): Observable<AppointmentData> {
    return this.http.get<AppointmentData>(this.#localAppointmentDataUrl);
  }

  saveAppointmentData(appointmentData: AppointmentData): void {
    this.#storage.set(StorageItems.Appointment, JSON.stringify(appointmentData));
  }

}
