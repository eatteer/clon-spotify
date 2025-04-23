import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token =
    'BQDKJlNM4m67QApLUJt2_grDgRgwylAstcqfqDIOq5CkRxiS8lXVLnsEYM3Vhpf-j4b4PWHKMSh1gply5Mb7p9IhrMXc45e8UmD6f1xJkyr5RPEelokDbKeoQU5gNMqRtuxA0GaAfbg';

  const requestWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(requestWithToken);
}
