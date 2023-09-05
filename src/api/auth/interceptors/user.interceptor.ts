import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_OK } from '../constants/auth.constants';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (
          typeof data === "object"
          && "id" in data
          && "email" in data
          && "role" in data
          && "accountStatus") {
          const { id, email, role, accountStatus } = data
          const returnData = {
            person: { id, email, role, accountStatus },
            message: AUTH_OK.SIGN_UP
          }
          return returnData;
        }
        return data
      }),
    );
  }
}