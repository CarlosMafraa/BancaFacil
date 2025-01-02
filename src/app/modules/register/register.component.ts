import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {RegisterService} from '../../services/register/register.service';
import {FloatLabel} from "primeng/floatlabel";
import {RadioButton} from 'primeng/radiobutton';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Password,
    Button,
    InputText,
    FloatLabel,
    RadioButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        perfil: ['',Validators.required],
        instituicao: ['',Validators.required]
      });
  }


  public async register(): Promise<void> {
    if (this.formGroup.valid) {
      const { nome, sobrenome, email, senha, perfil, instituicao } = this.formGroup.value;
      try {
        await this.service.register(nome, sobrenome, email, senha, perfil, instituicao);
        console.log('Usuário registrado com sucesso!');
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
      }
    } else {
      console.error('Formulário inválido.');
    }
  }

}
