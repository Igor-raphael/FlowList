import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        alert(
          'Não foi possível conectar ao servidor. Verifique se o sistema está online.',
        );
      }

      if (error.status === 503) {
        alert(
          'Sistema temporariamente indisponível. Tente novamente mais tarde.',
        );
      }

      if (error.status === 500) {
        alert('Erro interno no servidor.');
      }

      return throwError(() => error);
    }),
  );
};
