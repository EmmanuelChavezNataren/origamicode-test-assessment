import { Injectable } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import esLocale  from 'date-fns/locale/es';
@Injectable({ providedIn: 'root' })
export class DateHelper {

  readonly #format: string = 'dd MMM yyyy';
  readonly #timeZoneUTC = 'UTC';

  constructor() { }

  format2IsoDate(value: string, dateFormat = this.#format, timeZone = this.#timeZoneUTC) {
    return format(utcToZonedTime(parseISO(value), timeZone, {locale: esLocale}), dateFormat);
  }


}
