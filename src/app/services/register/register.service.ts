import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private serviceAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  public async register(
    nome: string,
    sobrenome: string,
    email: string,
    senha: string,
    perfil: string,
    instituicao: string
  ): Promise<void> {
    try {

      const signInMethods = await this.serviceAuth.fetchSignInMethodsForEmail(email);
      if (signInMethods.length > 0) {
        throw new Error('Este email já está registrado. Tente outro.');
      }

      const senhaCriptografada = bcrypt.hashSync(senha, 10);

      const userCredential = await this.serviceAuth.createUserWithEmailAndPassword(email, senha);
      const uid = userCredential.user?.uid;

      if (uid) {
        await this.firestore.collection('usuarios').doc(uid).set({
          nome,
          sobrenome,
          email,
          perfil,
          instituicao,
          senha: senhaCriptografada,
          criadoEm: new Date(),
          atualizado: new Date(),
        });
        console.log('Usuário salvo no Firestore com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }
}
