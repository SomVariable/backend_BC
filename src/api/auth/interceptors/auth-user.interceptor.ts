import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { authUserReturnType } from '../types/auth.types';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: authUserReturnType) => {
        const {person, message} = data
        const {id, email, role, accountStatus} = person
        const returnData = {
          person: {id, email, role, accountStatus},
          message
        }

        return returnData;
      }),
    );
  }
}