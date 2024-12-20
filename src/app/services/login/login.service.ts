import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private serviceAuth: AngularFireAuth
  ) {}

  public async login(email, password) {
    try {
      await this.serviceAuth.signInWithEmailAndPassword(email, password);
      console.log('Usuário logado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  }
}
