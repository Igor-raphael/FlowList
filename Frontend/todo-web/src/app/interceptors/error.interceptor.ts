import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        toast.error(
          'Não foi possível conectar ao servidor. Verifique se o sistema está online.',
          '',
          {
            timeOut: 12000,
          },
        );
      }

      if (error.status === 503) {
        toast.warning(
          'Sistema temporariamente indisponível. Tente novamente mais tarde.',
          '',
          {
            timeOut: 12000,
          },
        );
      }

      if (error.status === 500) {
        toast.warning('Erro interno no servidor.', '', {
          timeOut: 12000,
        });
      }

      return throwError(() => error);
    }),
  );
};
