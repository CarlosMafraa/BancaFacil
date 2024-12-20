import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private serviceAuth: AngularFireAuth
  ) {}

  public async register(email: string, password: string) {
    try {
      await this.serviceAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuário criado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  }
}
