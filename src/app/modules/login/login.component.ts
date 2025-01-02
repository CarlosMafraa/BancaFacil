import {Component, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {RegisterComponent} from '../register/register.component';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputText,
    Password,
    FormsModule,
    Button,
    RegisterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {  }

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
      });
  }

  public async login(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }

    const { email, senha } = this.formGroup.value;
    console.log(this.formGroup.value)

    try {
      await this.service.login(email, senha);
      this.router.navigate(['/home']).then();
      console.log('Login bem-sucedido!!!!!!!!!!!!');
    } catch (error) {
       console.log(error || 'Erro ao autenticar. Verifique suas credenciais.');
      console.error('Erro no login:', error);
    }
  }
}
