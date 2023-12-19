import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';
import { MainHeaderComponent } from 'src/app/components/headers/main-header/main-header.component';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    MainHeaderComponent,
    DateTimePickerComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
