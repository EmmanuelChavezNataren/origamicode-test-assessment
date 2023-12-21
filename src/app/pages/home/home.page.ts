import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppointmentData, AppointmentProvider, SectionOps } from 'src/app/modules/appoiment';
import { DateHelper } from 'src/app/shared/helpers';
import { ObjectKeySorts, ObjectKeys } from 'src/app/shared/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  #subs: Subscription = new Subscription();

  sectionSelected: SectionOps = 'all';
  sectionList = [
    { value: 'all', name: 'Todas', isActive: 1 },
    { value: 'top5', name: 'Top 5', isActive: 1 },
    { value: 'empty', name: 'Sección Vacía', isActive: 0 }
  ];
  quoteForm: UntypedFormGroup;
  dateValue = new Date(Date.now()).toISOString();
  format = 'dd/MM/yyyy';

  /* Variables for DataTable */
  appointmentData: AppointmentData = [];
  allAppointmentData: AppointmentData = [];
  columns: ObjectKeys = [];
  sortsById: ObjectKeySorts = [];
  sortsByDate: ObjectKeySorts = [];
  /* End Variables for DataTable */

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dateHelper: DateHelper,
    private appointmentProv: AppointmentProvider
  ) { }

  ngOnInit() {
    this.initForm();
    this.initDataTableInfo();
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  initForm() {
    this.quoteForm = this.formBuilder.group({
      quotesDate: [this.dateValue || ''],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  initDataTableInfo() {
    this.columns = this.appointmentProv.tableColumns;
    this.sortsById = this.appointmentProv.tableSortsById;
    this.sortsByDate = this.appointmentProv.tableSortsByDate;
    this.subscribeData();
    this.appointmentProv.getAppointmentsData();
  }


  subscribeData(): void {
    this.#subs.add(
      this.appointmentProv.state.data$.subscribe(value => {
        this.appointmentData = value;
        this.allAppointmentData = [...value];
      })
    );
  }

  onChange(event: any) {
    this.dateValue = event;
    const newDate = this.dateHelper.format2IsoDate(this.dateValue, this.format);
  }

  sendData() { }

  segmentChanged({ detail: { value } }: any) {
    this.sectionSelected = value;
    this.handleSortData(this.sectionSelected);
  }

  private handleSortData(sectionSelected: SectionOps) {
    if (sectionSelected === 'all') {
      this.appointmentData = [...this.allAppointmentData].sort((a, b) => a.id - b.id);
      return;
    }
    if (sectionSelected === 'top5') {
      const appoimentsData = [...this.allAppointmentData].map(valueData => {
        return {
          ...valueData,
          date: new Date(valueData.date)
        };
      });

      const sortDesc = appoimentsData.sort((a, b) => Number(a.date) - Number(b.date));
      this.appointmentData = sortDesc.map(sortData => {
        return {
          ...sortData,
          date: sortData.date.toISOString()
        }
      });
      return;
    }
  }

}
