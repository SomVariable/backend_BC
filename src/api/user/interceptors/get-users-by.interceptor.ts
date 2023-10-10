import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { USER_OK } from '../constants/user.constants';
  
  @Injectable()
  export class GetUsersByInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data: any) => {
          return {
            ...data
          };
        }),
      );
    }
  }
  