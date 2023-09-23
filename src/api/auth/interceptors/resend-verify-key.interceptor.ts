import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_OK } from '../constants/auth.constants';

@Injectable()
export class AuthResendVerifyKeyTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(() => {
        const returnData = {
          message: AUTH_OK.SEND_VERIFICATION_KEY,
        };
        return returnData;
      }),
    );
  }
}
