import { HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { tap, finalize, delay } from 'rxjs/operators';
import { LoadingService } from '../loading.service';

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);

  const excludeFromLoading = ['/powers', '/teams'];
  const showLoading = (
    ['DELETE', 'PUT', 'POST'].includes(req.method) ||
    (req.method === 'GET' && !excludeFromLoading.some(path => req.url.includes(path)))
  );

  if (showLoading) {
    loadingService.setLoading(true);
  }

  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'completed with status', event.status);
      }
    }),
    finalize(() => {
      if (showLoading) {
        of(null).pipe(delay(600)).subscribe(() => loadingService.setLoading(false));
      }
    })
  );
}
