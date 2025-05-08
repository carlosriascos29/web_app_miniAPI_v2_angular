import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos el AuthService
  const authService = inject(AuthService);
  
  // Excluir las rutas de login y registro del interceptor
  if (req.url.includes('/login') || req.url.includes('/registro')) {
    return next(req);
  }

  const token = authService.token;
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};
