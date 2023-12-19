import { Injectable } from '@angular/core';
import { differenceInDays, format, parse, parseISO } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class DateHelper {

    readonly #format: string = 'dd MMM yyyy';

    constructor() { }

    formatDate(value: string, dateFormat = this.#format) {
      return format(parseISO(value), dateFormat);
    }


}
