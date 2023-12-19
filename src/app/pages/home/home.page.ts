import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DateHelper } from 'src/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  quoteForm: UntypedFormGroup;
  dateValue = new Date(Date.now()).toISOString();
  format = 'dd/MM/yyyy';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dateHelper: DateHelper
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.quoteForm = this.formBuilder.group({
      quotesDate: [this.dateValue || ''],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onChange(event: any) {
    this.dateValue = event;
    const newDate = this.dateHelper.formatDate(this.dateValue, this.format);
  }

  sendData() { }

}
