import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, finalize, delay, catchError } from 'rxjs/operators';
import { LoadingService } from '../loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludeFromLoading = ['/powers', '/teams'];
    const showLoading = (
      ['DELETE', 'PUT', 'POST'].includes(req.method) ||
      (req.method === 'GET' && !excludeFromLoading.some(path => req.url.includes(path)))
    );


    if (showLoading) {
      this.loadingService.setLoading(true);
    }

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && showLoading) {
          }
        },
        (error: HttpErrorResponse) => {
          if (showLoading) {
            this.loadingService.setLoading(false);
          }
        }
      ),
      catchError((error) => {
        if (showLoading) {
          this.loadingService.setLoading(false);
        }
        return of(error); 
      }),
      finalize(() => {
        if (showLoading) {
          of(null).pipe(delay(600)).subscribe(() => this.loadingService.setLoading(false));
        }
      })
    );
  }
}