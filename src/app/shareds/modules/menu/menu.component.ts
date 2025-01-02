import {Component} from '@angular/core';
import {MenuItemComponent} from './menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public itens: any = itensMenus;

}

const itensMenus: any[] = [
  {
    icon: 'dashboard',
    name: 'Dashboard'
  },
  {
    icon: 'cast_for_education',
    name: 'Professores'
  },
]
