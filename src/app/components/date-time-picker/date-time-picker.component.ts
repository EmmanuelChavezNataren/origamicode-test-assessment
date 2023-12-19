import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DateTimePickerComponent implements OnInit, AfterViewChecked {

  @ViewChild('dateTime', { read: ElementRef }) dateTime!: ElementRef;

  @Input() type = 'date';
  @Input() min: string;
  @Input() max: string;
  @Input() dateFormat: any;
  @Input() value: string;

  @Output() datePickerValue: EventEmitter<any> = new EventEmitter<any>();

  #currentDate = new Date(Date.now());
  constructor() { }

  ngOnInit() {
    this.initDatesConfig();
  }

  ngAfterViewChecked(): void {
    if (this.dateTime) {
      const nativeEl = this.dateTime.nativeElement as HTMLIonDatetimeElement;
      const shadowRoot = nativeEl.shadowRoot;
      this.setStyleCalendarActionButtons(shadowRoot);
      this.setStyleCalendarMonthYear(shadowRoot);
      this.setStyleCalendarNextPrev(shadowRoot);
      this.setStyleCalendarDaysOfWeekDiv(shadowRoot);
      this.setStyleCalendarMonthGrid(shadowRoot);
    }
  }

  change(value: any) {
    this.datePickerValue.emit(value);
  }

  private initDatesConfig() {
    this.min = this.#currentDate.toISOString();
    this.max = new Date(
      this.#currentDate.getFullYear() + 2,
      this.#currentDate.getMonth(),
      this.#currentDate.getDate()
    ).toISOString();
  }



  //! Styles for the ion-datetime component with many improvements by Ionic, so you have to manipulate the styles in this way to be able to fully customize it.
  private setStyleCalendarActionButtons(shadowRoot: ShadowRoot | null) {
    const calendarActionButtonsDiv = shadowRoot?.querySelector('.calendar-action-buttons');
    calendarActionButtonsDiv?.setAttribute(
      'style',
      `
      padding-top: 16px;
      padding-right: 12px;
      padding-bottom: 8px;
      `
    );
  }

  private setStyleCalendarMonthYear(shadowRoot: ShadowRoot | null) {
    const calendarMonthYearDiv = shadowRoot?.querySelector('.calendar-month-year');
    const itemEl = calendarMonthYearDiv?.querySelector('ion-item');
    const labelEl = itemEl?.querySelector('ion-label');
    labelEl?.setAttribute(
      'style',
      `
      align-items: center;
      display: flex;
      flex: 1 0 0;
      font-size: 16px;
      font-weight: 500;
      gap: 6px;
      letter-spacing: 0.15px;
      line-height: 150%;
      margin: 0;
      width: auto;
      `
    );
  }

  private setStyleCalendarNextPrev(shadowRoot: ShadowRoot | null) {
    const calendarNextPrevDiv = shadowRoot?.querySelector('.calendar-next-prev');
    const buttonsEl = calendarNextPrevDiv?.querySelector('ion-buttons');
    const buttonEl = buttonsEl?.querySelectorAll('ion-button');

    buttonEl?.forEach(function (ionButton) {
      ionButton.setAttribute(
        'style',
        `
        --padding-top: 8px;
        --padding-end: 8px;
        --padding-bottom: 8px;
        --padding-start: 8px;
        width: 32px;
        height: 32px;
        `
      );
    });
  }

  private setStyleCalendarDaysOfWeekDiv(shadowRoot: ShadowRoot | null) {
    const calendarDaysOfWeekDiv = shadowRoot?.querySelector('.calendar-days-of-week');
    calendarDaysOfWeekDiv?.setAttribute(
      'style',
      `
      font-size: 12px;
      gap: 2px;
      letter-spacing: 0.4px;
      line-height: 166%;
      padding-inline: 28px;
      padding-bottom: 8px;
      `
    );
  }

  private setStyleCalendarMonthGrid(shadowRoot: ShadowRoot | null) {
    const calendarMonthGridsDiv = shadowRoot?.querySelectorAll('.calendar-month-grid');
    calendarMonthGridsDiv?.forEach(function (calendarMonthGridDiv) {
      calendarMonthGridDiv?.setAttribute(
        'style',
        `
      padding-top: 12px;
      padding-bottom: 12px;
      padding-inline: 28px;
      gap: 2px;
      `
      );
    });
  }
  //! End Styles for the ion-datetime component.

}
