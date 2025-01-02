import {HttpInterceptorFn} from '@angular/common/http';
import {Auth} from '@angular/fire/auth';
import {inject} from '@angular/core';
import {from, switchMap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth:Auth = inject(Auth);

  return from(auth.currentUser?.getIdToken() ?? Promise.resolve(null)).pipe(
    switchMap((token) => {
      const clonedReq = token
        ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
        : req;
      return next(clonedReq);
    })
  );
};
