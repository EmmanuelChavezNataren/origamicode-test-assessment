import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationItems } from 'src/app/shared/enums/navigation.enum';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideMenuComponent implements OnInit {
  activePage = 'Home';
  appPages = [
    { title: 'Home', url: NavigationItems.home, icon: 'home' },
    { title: 'Profile', url: NavigationItems.profile, icon: 'person' }
  ]

  constructor() { }

  ngOnInit() { }

}
