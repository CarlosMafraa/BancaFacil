import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import * as bcrypt from 'bcryptjs';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  public async login(email: string, senha: string): Promise<void> {
    try {
      const querySnapshot = await firstValueFrom(
        this.firestore.collection('usuarios', (ref) => ref.where('email', '==', email)).get()
      );

      if (querySnapshot.empty) {
        throw new Error('Usuário não encontrado.');
      }

      const userData = querySnapshot.docs[0].data() as any;

      const senhaValida = bcrypt.compare(senha, userData.senha);
      if (!senhaValida) {
        throw new Error('Senha incorreta.');
      }

      console.log('Login bem-sucedidoO!', userData);
    } catch (error) {
      console.log('Erro no login:', error);
      throw new Error('Erro ao autenticar. Verifique suas credenciais.');
    }
  }

}
