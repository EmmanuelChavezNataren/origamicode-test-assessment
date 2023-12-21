import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateHelper } from 'src/app/shared/helpers';
import { ObjectKeySorts, ObjectKeys } from 'src/app/shared/models';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgxDatatableModule,
    DatePipe
  ],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: ObjectKeys = [];
  @Input() sorts?: ObjectKeySorts;
  @Input() limit?: number;

  #dateHelper = inject(DateHelper);

  loadingIndicator: boolean = true;
  page = {
    // The number of elements in the page
    size: 0,
    // The total number of elements
    totalElements: 0,
    // The total number of pages
    totalPages: 0,
    // The current page number
    pageNumber: 0
  };
  rows: any[] = [];
  limitRowsDefault: number = 10;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data || changes.limit) {
      this.loadingIndicator = true;
      this.initDataTable();
    }
  }

  ngOnInit() {
    this.page.pageNumber = 0;
    this.page.size = this.limit ?? this.limitRowsDefault;
    this.initDataTable();
  }

  initDataTable() {
    if (this.data) {
      const start = this.page.pageNumber * this.page.size;
      const end = start + this.page.size;
      this.rows = this.data.slice(start, end);
      this.page.totalElements = this.data.length;
      this.loadingIndicator = false;
    }
  }

  handleFormatDate(date: string, format: string) {
    return this.#dateHelper.format2IsoDate(date, format);
  }

  onPageChange(offset: number): void {
    if (this.limit) {
      return;
    }
    this.page.pageNumber = offset;
    this.initDataTable();
  }

}
