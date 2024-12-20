import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {RegisterService} from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconField,
    Password,
    Button,
    InputText
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
  }

  public register(): void {
    const email = this.form.get('email')?.value
    const senha = this.form.get('password')?.value
    console.log(email)
    console.log(senha)
    this.service.register(email, senha).then();
  }
}
