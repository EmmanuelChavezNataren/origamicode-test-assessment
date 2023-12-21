import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MainHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() hasLogoTitle: boolean = false;

  constructor() { }

  ngOnInit() { }

}
