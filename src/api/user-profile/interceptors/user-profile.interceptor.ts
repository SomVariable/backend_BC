import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_PROFILE_OK } from '../constants/user-profile.constants';

@Injectable()
export class UserProfileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          message: USER_PROFILE_OK.OK,
          data: data,
        };
      }),
    );
  }
}
