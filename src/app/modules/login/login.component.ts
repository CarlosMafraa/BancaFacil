import { Component } from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {InputText} from 'primeng/inputtext';
import {InputIcon} from 'primeng/inputicon';
import {Password} from 'primeng/password';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IconField,
    InputText,
    InputIcon,
    Password,
    FormsModule,
    Button,
    RegisterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public password: any;

}
