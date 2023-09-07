import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { userResponse } from '../types/user.types';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data:any) => {
        delete data.hash
        const returnObject = { 
          user: {
            ...data
          }
        }
        return returnObject;
      })
    );
  }
}