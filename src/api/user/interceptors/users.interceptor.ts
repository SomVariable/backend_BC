import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  usersResponse } from '../types/user.types';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: usersResponse) => {
        const {users} = data

        const updatedUsers = users?.map(user => {
          const {
            accountStatus,  email, 
            id,  
            role, 
            UserTranslation
          } = user

          return {
            accountStatus, UserTranslation, email,id, role
          }
        }) 
        return {...data, users: updatedUsers}
        
      }),
    );
  }
}