import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {map, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AngularFireAuth = inject(AngularFireAuth);
  const router: Router = inject(Router);

  return auth.authState.pipe(
    map((user) => {
      console.log('Estado do usuário no authGuard:', user);
      if (user) {
        return true;
      } else {
        console.log('Usuário não autenticado! Redirecionando...');
        router.navigate(['/login']).then();
        return false;
      }
    })
  );
};
