import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_OK } from '../constants/auth.constants';

@Injectable()
export class AuthSignUpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          person: data,
          message: AUTH_OK.SIGN_UP
        }
      }),
    );
  }
} 